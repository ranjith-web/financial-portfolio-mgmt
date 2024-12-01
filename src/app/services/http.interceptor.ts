import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { mockData } from '../mock/mock-data';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    private data = { ...mockData };

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, body } = req;

        // Handle specific API endpoints
        if (url.endsWith('/api/asset-allocation') && method === 'GET') {
            return of(new HttpResponse({ status: 200, body: this.data.assetAllocation })).pipe(delay(500));
        }

        if (url.endsWith('/api/market-trends') && method === 'GET') {
            return of(new HttpResponse({ status: 200, body: this.data.marketTrends })).pipe(delay(500));
        }

        if (url.endsWith('/api/asset-allocation') && method === 'PUT') {
            this.data.assetAllocation = body;
            return of(new HttpResponse({ status: 200, body: { success: true } })).pipe(delay(500));
        }

        if (url.endsWith('/api/market-trends') && method === 'PUT') {
            this.data.marketTrends = body;
            return of(new HttpResponse({ status: 200, body: { success: true } })).pipe(delay(500));
        }

        return next.handle(req); // Pass other requests through
    }
}
