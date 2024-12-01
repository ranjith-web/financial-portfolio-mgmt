import { createSelector, createFeatureSelector } from '@ngrx/store';
import { PortfolioState } from '../reducers/portfolio.reducer';

export const selectPortfolioState = createFeatureSelector<PortfolioState>('portfolio');

export const selectAssetAllocation = createSelector(
    selectPortfolioState,
    (state) => state.assetAllocation
);

export const selectMarketTrends = createSelector(
    selectPortfolioState,
    (state) => state.marketTrends
);
