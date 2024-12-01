import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { mockData } from '../mock/mock-data';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
    private data = { ...mockData };

    constructor() {}

    // Fetch Asset Allocation
    getAssetAllocation(): Observable<any[]> {
        return of(this.data.assetAllocation).pipe(delay(500));
    }

    // Fetch Market Trends
    getMarketTrends(): Observable<any[]> {
        return of(this.data.marketTrends).pipe(delay(500));
    }

    // Update Asset Allocation
    updateAssetAllocation(updatedAllocation: any[]): Observable<any> {
        this.data.assetAllocation = updatedAllocation;
        return of({ success: true }).pipe(delay(500));
    }

    // Update Market Trends
    updateMarketTrends(updatedTrends: any[]): Observable<any> {
        this.data.marketTrends = updatedTrends;
        return of({ success: true }).pipe(delay(500));
    }
}
