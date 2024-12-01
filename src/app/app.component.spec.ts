import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent, // Standalone component
        RouterTestingModule, // Mocked router for testing
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    expect(component.title).toBe('Financial Portfolio');
  });

  it('should render the toolbar with the application title', () => {
    const toolbarElement = fixture.debugElement.query(By.css('mat-toolbar'));
    expect(toolbarElement).toBeTruthy();

    const titleElement = toolbarElement.nativeElement.textContent.trim();
    expect(titleElement).toContain('Financial Portfolio');
  });

  it('should render navigation buttons', () => {
    const buttonElements = fixture.debugElement.queryAll(By.css('button'));
    expect(buttonElements.length).toBeGreaterThan(0); // Ensure at least one button exists
  });
});
