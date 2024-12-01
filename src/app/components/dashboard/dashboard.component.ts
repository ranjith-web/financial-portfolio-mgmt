import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { InvestmentFormComponent } from '../investment-form/investment-form.component';
import { selectAssetAllocation, selectMarketTrends } from '../../store/selectors/portfolio.selectors';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptor } from '../../services/http.interceptor';
import { loadAssetAllocation, loadMarketTrends } from '../../store/actions/portfolio.actions';
import { Asset, MarketTrend } from '../../models/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatToolbarModule,
    CurrencyFormatPipe,
    NgxChartsModule,
    InvestmentFormComponent,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  assetAllocation$!: Observable<Asset[]>;
  marketTrends$!: Observable<MarketTrend[]>;
  view: [number, number];


  constructor(private store: Store) {
    this.view = this.calculateView(); // Initial view dimensions
  }

  ngOnInit(): void {
    // Only dispatch actions if data is not loaded
    this.store.select(selectAssetAllocation).subscribe((currentAllocation) => {
      if (currentAllocation.length === 0) {
        this.store.dispatch(loadAssetAllocation());  // Dispatch to load data if empty
      }
    });

    this.store.select(selectMarketTrends).subscribe((currentTrends) => {
      if (currentTrends.length === 0) {
        this.store.dispatch(loadMarketTrends());  // Dispatch to load data if empty
      }
    });
    // Select data from the store
    this.assetAllocation$ = this.store.select(selectAssetAllocation);
    this.marketTrends$ = this.store.select(selectMarketTrends);
  }

  // Listen for window resize to adjust chart dimensions
  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    this.view = this.calculateView(); // Adjust chart width dynamically
  }

  calculateView(): [number, number] {
    // const width = Math.min(window.innerWidth * 0.45, 600); // Max chart width of 600px
    // const height = 400; // Fixed chart height
    // return [width, height];
    const width = window.innerWidth <= 600
    ? window.innerWidth * 0.85  // 85% of screen width for small screens
    : Math.min(window.innerWidth * 0.45, 600); // Max 600px for larger screens

    const height = window.innerWidth <= 600
      ? 300 // Adjust chart height for smaller screens
      : 400; // Default height for larger screens

    return [width, height];
  }
}
