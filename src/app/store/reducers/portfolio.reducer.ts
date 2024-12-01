import { createReducer, on } from '@ngrx/store';
import {
  loadAssetAllocationSuccess,
  loadMarketTrendsSuccess,
  updateAssetAllocation,
  updateMarketTrends,
} from '../actions/portfolio.actions';

export interface PortfolioState {
    assetAllocation: any[];
    marketTrends: any[];
}

export const initialState: PortfolioState = {
    assetAllocation: [],
    marketTrends: [],
};

export const portfolioReducer = createReducer(
    initialState,
    on(loadAssetAllocationSuccess, (state, { assetAllocation }) => ({
        ...state,
        assetAllocation,
    })),
    on(loadMarketTrendsSuccess, (state, { marketTrends }) => ({
        ...state,
        marketTrends,
    })),
    on(updateAssetAllocation, (state, { assetAllocation }) => ({
        ...state,
        assetAllocation,
    })),
    on(updateMarketTrends, (state, { marketTrends }) => ({
        ...state,
        marketTrends,
    }))
);
