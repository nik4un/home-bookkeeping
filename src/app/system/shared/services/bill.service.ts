import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/firebase-database';

import { Bill } from '../models/bill.model';
import { AuthService } from '../../../shared/services/auth.service';

@Injectable()
export class BillService {
  constructor(public http: HttpClient,
              private authService: AuthService) { // здесь используем public
  }

  getBill(): Observable<Bill> {
    const target = firebase.database().ref(`users/${this.authService.getUserId()}/bill`);
    return from(
      target.once('value')
        .then((snapshot) => {
          return snapshot.val();
        })
    );
  }

  updateBill(bill): Observable<Bill> {
    const target = firebase.database().ref(`users/${this.authService.getUserId()}/bill`);
    return from(target.update(bill));
  }

  getCurrency() {
    return  this.http.get(`http://data.fixer.io/api/latest?access_key=4a109de1373aedeaa04092ead9b7b012&symbols=RUB,USD,EUR,BTC`);
  }
}
