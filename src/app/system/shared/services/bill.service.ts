import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Bill } from '../models/bill.model';
import { BaseApi } from '../../../shared/core/base-api';

@Injectable()
export class BillService extends BaseApi {
  constructor(public http: HttpClient) { // здесь используем public
    super(http);
  }

  getBill(): Observable<Bill> {
    return  this.get(`bill`);
  }

  getCurrency() {
    return  this.http.get(`http://data.fixer.io/api/latest?access_key=4a109de1373aedeaa04092ead9b7b012&symbols=RUB,USD,EUR,BTC`);
  }
}
