import { createAction, props } from '@ngrx/store';

export const loadAssetAllocation = createAction('[Portfolio] Load Asset Allocation');
export const loadAssetAllocationSuccess = createAction(
    '[Portfolio] Load Asset Allocation Success',
    props<{ assetAllocation: any[] }>()
);

export const loadMarketTrends = createAction('[Portfolio] Load Market Trends');
export const loadMarketTrendsSuccess = createAction(
    '[Portfolio] Load Market Trends Success',
    props<{ marketTrends: any[] }>()
);

export const updateAssetAllocation = createAction(
    '[Portfolio] Update Asset Allocation',
    props<{ assetAllocation: any[] }>()
);

export const updateMarketTrends = createAction(
    '[Portfolio] Update Market Trends',
    props<{ marketTrends: any[] }>()
);
