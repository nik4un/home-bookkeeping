import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill.model';

@Injectable()
export class BillService {
  constructor(private http: HttpClient) {}

  getBill(): Observable<Bill> {
    return  this.http.get(`http://localhost:3210/bill`);
  }

  getCurrency() {
    return  this.http.post(`http://data.fixer.io/api/latest?access_key=4a109de1373aedeaa04092ead9b7b012&symbols=RUB,USD,EUR,BTC`);
  }
}
