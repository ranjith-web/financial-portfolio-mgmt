import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
      path: 'dashboard',
      loadComponent: () =>
        import('./components/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    },
    {
      path: 'forms',
      loadComponent: () =>
        import('./components/investment-form/investment-form.component').then((m) => m.InvestmentFormComponent),
    },
  ];