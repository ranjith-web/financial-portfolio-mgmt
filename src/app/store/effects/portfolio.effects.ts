import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../services/api.service';
import {
  loadAssetAllocation,
  loadAssetAllocationSuccess,
  loadMarketTrends,
  loadMarketTrendsSuccess,
} from '../actions/portfolio.actions';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class PortfolioEffects {
    constructor(private actions$: Actions, private api: ApiService) {}

    loadAssetAllocation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadAssetAllocation),
            mergeMap(() =>
                this.api.getAssetAllocation().pipe(
                    map((assetAllocation) => loadAssetAllocationSuccess({ assetAllocation }))
                )
            )
        )
    );

    loadMarketTrends$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadMarketTrends),
            mergeMap(() =>
                this.api.getMarketTrends().pipe(
                    map((marketTrends) => loadMarketTrendsSuccess({ marketTrends }))
                )
            )
        )
    );
}
