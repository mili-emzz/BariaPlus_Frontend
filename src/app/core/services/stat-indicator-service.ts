import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookiesStorage} from './cookies-storage';
import {map, Observable} from 'rxjs';
import {StatSeries, StatsResponse} from '../interfaces/api/stats-response';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatIndicatorService {
  constructor(private http: HttpClient) { }

  getIndicatorSeries(patientId: number, indicatorId: number):Observable<StatSeries> {
    console.log('id en service: ', indicatorId);
    return this.http.get<StatsResponse>(`/api/patient/${patientId}/stats?indicator=${indicatorId}`).pipe(
      map(res => ({
          name: res.indicatorName,
          points:res.data
        }) as StatSeries )
    );
  }
}
