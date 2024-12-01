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
    on(loadAssetAllocationSuccess, (state, { assetAllocation }) => {
        debugger
        return {
            ...state,
            assetAllocation,
        }
    }),
    on(loadMarketTrendsSuccess, (state, { marketTrends }) => {
        debugger;
        return{
            ...state,
            marketTrends,
        }
    }),
    on(updateAssetAllocation, (state, { assetAllocation }) => {
        debugger;
        return {
            ...state,
            assetAllocation,
        }
    }),
    on(updateMarketTrends, (state, { marketTrends }) => {
        debugger;
        return {
            ...state,
            marketTrends,
        }
    })
);
