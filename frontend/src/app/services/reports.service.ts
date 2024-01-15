import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  endpoint = 'http://localhost:5488/templates/HJH11D83ce';
  constructor(private httpClient: HttpClient) {}

  fetchReportData(): Observable<any> {
    return this.httpClient.get(this.endpoint);
  }
}
