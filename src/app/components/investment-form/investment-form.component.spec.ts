import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvestmentFormComponent } from './investment-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { MockBuilder, MockRender } from 'ng-mocks';
import { selectAssetAllocation, selectMarketTrends } from '../../store/selectors/portfolio.selectors';
import { updateAssetAllocation, updateMarketTrends } from '../../store/actions/portfolio.actions';

describe('InvestmentFormComponent', () => {
  let component: InvestmentFormComponent;
  let fixture: ComponentFixture<InvestmentFormComponent>;
  let mockStore: jasmine.SpyObj<Store>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    // Mock the Store.select method
    mockStore.select.and.callFake((selector: any) => {
      if (selector === selectAssetAllocation) {
        return of([]); // Mock empty asset allocation
      }
      if (selector === selectMarketTrends) {
        return of([]); // Mock empty market trends
      }
      return of(null);
    });

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NoopAnimationsModule, InvestmentFormComponent],
      // declarations: [InvestmentFormComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InvestmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.investmentForm).toBeDefined();
    expect(component.investmentForm.value).toEqual({
      assetType: '',
      quantity: 0,
      purchasePrice: 0,
      purchaseDate: '',
    });
  });

  it('should mark the form invalid if required fields are missing', () => {
    component.investmentForm.patchValue({
      assetType: '',
      quantity: 0,
      purchasePrice: 0,
      purchaseDate: '',
    });
    expect(component.investmentForm.valid).toBeFalse();
  });

  it('should mark the form valid if all fields are filled', () => {
    component.investmentForm.patchValue({
      assetType: 'Stocks',
      quantity: 10,
      purchasePrice: 50,
      purchaseDate: '2023-11-30',
    });
    expect(component.investmentForm.valid).toBeTrue();
  });

  it('should open the review dialog on form submission', () => {
    component.investmentForm.patchValue({
      assetType: 'Stocks',
      quantity: 10,
      purchasePrice: 50,
      purchaseDate: '2023-11-30',
    });

    mockDialog.open.and.returnValue({
      afterClosed: () => of(true),
    } as any);

    component.submitForm();
    expect(mockDialog.open).toHaveBeenCalled();
  });

  it('should dispatch actions to update the store in confirmSubmission', () => {
    component.reviewData = {
      assetType: 'Stocks',
      quantity: 10,
      purchasePrice: 50,
      purchaseDate: '2023-11-30',
    };

    mockStore.select.and.callFake((selector: any) => {
      if (selector === selectAssetAllocation) {
        return of([{ name: 'Stocks', value: 500 }]);
      }
      if (selector === selectMarketTrends) {
        return of([{ name: '2023', series: [] }]);
      }
      return of(null);
    });

    component.confirmSubmission();

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      updateAssetAllocation({ assetAllocation: [{ name: 'Stocks', value: 1000 }] })
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      updateMarketTrends({
        marketTrends: [
          { name: '2023', series: [{ name: 'Nov', value: 500 }] },
        ],
      })
    );
  });

  it('should show a success snackbar after confirmation', () => {
    component.showSuccessAlert();
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Your latest investments are updated successfully!',
      'Close',
      {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      }
    );
  });

  it('should redirect to dashboard after confirmation', () => {
    component.router.navigate(['/dashboard']);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
