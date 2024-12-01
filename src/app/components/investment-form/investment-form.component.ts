import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { updateAssetAllocation, updateMarketTrends } from '../../store/actions/portfolio.actions';
import { selectAssetAllocation, selectMarketTrends } from '../../store/selectors/portfolio.selectors';
import { ReviewModalComponent } from '../review-modal/review-modal.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { Asset, MarketTrend, ReviewData } from '../../models/models';

@Component({
  selector: 'app-investment-form',
  standalone: true,
  templateUrl: './investment-form.component.html',
  styleUrl: './investment-form.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule
  ],
})
export class InvestmentFormComponent {
  investmentForm: FormGroup;
  reviewData: ReviewData | null = null;

  assetAllocation$: Observable<Asset[]>;
  marketTrends$: Observable<MarketTrend[]>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private dialog: MatDialog,
    public router: Router,
    private snackBar: MatSnackBar
  ) {
    this.investmentForm = this.fb.group({
      assetType: ['', Validators.required], // Asset type, e.g., "Stocks"
      quantity: [0, [Validators.required, Validators.min(1)]], // Number of units
      purchasePrice: [0, [Validators.required, Validators.min(0.01)]], // Price per unit
      purchaseDate: ['', Validators.required], // Date of purchase
    });

    // Subscribe to the store to get the current data
    this.assetAllocation$ = this.store.select(selectAssetAllocation);
    this.marketTrends$ = this.store.select(selectMarketTrends);
  }

  submitForm() {
    if (this.investmentForm.valid) {
      this.reviewData = this.investmentForm.value;
      this.openReviewDialog();
    }
  }

  openReviewDialog() {
    const dialogRef = this.dialog.open(ReviewModalComponent, {
      width: '400px',
      data: this.reviewData, // Passing form data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.confirmSubmission();
      } else {
        console.log('User canceled the submission');
      }
    });
  }

  confirmSubmission() {
    const newAssetValue = this.reviewData!.quantity * this.reviewData!.purchasePrice;
  
    // Extract month and year from the purchaseDate
    const purchaseDate = new Date(this.reviewData!.purchaseDate);
    const purchaseMonthYear = `${purchaseDate.toLocaleString('default', { month: 'short' })} ${purchaseDate.getFullYear()}`;
    const [month, year] = purchaseMonthYear.split(' ');
    
    // Update Asset Allocation
    this.store.select(selectAssetAllocation).pipe(take(1)).subscribe((currentAllocation) => {
      const updatedAssetAllocation = currentAllocation.map((asset) =>
        asset.name === this.reviewData!.assetType
          ? { ...asset, value: asset.value + newAssetValue } // Create a new object with the updated value
          : asset
      );

      // If asset doesn't exist, add it to the array
      if (!updatedAssetAllocation.find((asset) => asset.name === this.reviewData!.assetType)) {
        updatedAssetAllocation.push({ name: this.reviewData!.assetType, value: newAssetValue });
      }

      // Dispatch updated asset allocation
      this.store.dispatch(updateAssetAllocation({ assetAllocation: updatedAssetAllocation }));
    });

    // Update Market Trends
    this.store.select(selectMarketTrends).pipe(take(1)).subscribe((currentTrends) => {
      const updatedMarketTrends = currentTrends.map((trend) =>
        trend.name === year
          ? {
              ...trend,
              series: [...trend.series, { name: month, value: newAssetValue }], // Add new series entry immutably
            }
          : trend
      );

      // If year doesn't exist, add a new trend for it
      if (!updatedMarketTrends.find((trend) => trend.name === year)) {
        updatedMarketTrends.push({
          name: year,
          series: [{ name: month, value: newAssetValue }],
        });
      }

      // Dispatch updated market trends
      this.store.dispatch(updateMarketTrends({ marketTrends: updatedMarketTrends }));
    });

    this.investmentForm.reset();
    this.reviewData = null;
    this.showSuccessAlert();
    // Redirect to the Dashboard after confirmation
    this.router.navigate(['/dashboard']);
  }
  showSuccessAlert() {
    this.snackBar.open('Your latest investments are updated successfully!', 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
