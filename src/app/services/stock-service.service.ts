import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockServiceService {

  constructor(private http: HttpClient) { }

  getTickerData(ticker: string): Observable<any> {
    const stockDataURL = `https://stockservice-mcwzng4wya-uk.a.run.app/getTA?ticker=${ticker}`;
    const stockData = this.http.get<any>(stockDataURL)
    return stockData
  }
}
