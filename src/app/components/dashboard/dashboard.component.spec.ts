import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { selectAssetAllocation, selectMarketTrends } from '../../store/selectors/portfolio.selectors';
import { loadAssetAllocation, loadMarketTrends } from '../../store/actions/portfolio.actions';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    // Mock the Store
    const storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent,
        MatGridListModule,
        MatCardModule,
        MatToolbarModule,
        CurrencyFormatPipe,
        NgxChartsModule,
        StoreModule.forRoot({}), // Provide an empty store for testing
        NoopAnimationsModule,
      ],
      providers: [{ provide: Store, useValue: storeSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;

    // Mock store selectors
    store.select.and.callFake((selector: any) => {
      if (selector === selectAssetAllocation) {
        return of([{ name: 'Stocks', value: 50 }]); // Mock asset allocation data
      }
      if (selector === selectMarketTrends) {
        return of([{ name: '2024', series: [{ name: 'Jan', value: 10000 }] }]); // Mock market trends data
      }
      return of([]);
    });

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadAssetAllocation if assetAllocation is empty', () => {
    store.select.and.returnValue(of([])); // Mock empty asset allocation
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(loadAssetAllocation());
  });

  it('should dispatch loadMarketTrends if marketTrends is empty', () => {
    store.select.and.returnValue(of([])); // Mock empty market trends
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(loadMarketTrends());
  });

  it('should set view dimensions on initialization', () => {
    const expectedView = component.calculateView();
    expect(component.view).toEqual(expectedView);
  });

  it('should adjust view dimensions on window resize', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(300); // Mock the window width
    window.dispatchEvent(new Event('resize')); // Trigger resize event
    fixture.detectChanges();

    const newView = component.calculateView(); // Calculate expected view
    expect(component.view).toEqual(newView);
  });

  it('should display asset allocation data', (done) => {
    component.assetAllocation$.subscribe((data) => {
      expect(data).toEqual([{ name: 'Stocks', value: 50 }]); // Check mocked data
      done();
    });
  });

  it('should display market trends data', (done) => {
    component.marketTrends$.subscribe((data) => {
      expect(data).toEqual([{ name: '2024', series: [{ name: 'Jan', value: 10000 }] }]); // Check mocked data
      done();
    });
  });
});
