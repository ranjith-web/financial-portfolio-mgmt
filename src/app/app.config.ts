import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { portfolioReducer } from './store/reducers/portfolio.reducer';
import { PortfolioEffects } from './store/effects/portfolio.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync('noop'),
    provideStore({ portfolio: portfolioReducer }),
    provideEffects([
      PortfolioEffects
    ]),
  ]
};
