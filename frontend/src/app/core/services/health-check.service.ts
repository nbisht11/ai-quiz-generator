import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timer, switchMap, catchError, of, Observable, shareReplay } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HealthCheckService {
  private readonly API_URL = `${environment.API_HOST}${environment.HEALTHCHECK_ENDPOINT}`;
  private readonly TWO_MINUTES = 3 * 60 * 1000;

  constructor(private http: HttpClient) {}

  public polledData$: Observable<any> = timer(0, this.TWO_MINUTES).pipe(
    switchMap(() => this.fetchData()),
    shareReplay(1) 
  );

  private fetchData(): Observable<any> {
    return this.http.get(this.API_URL, { responseType: 'text' }).pipe(
      catchError((error) => {
        return of(null); 
      })
    );
  }
}
