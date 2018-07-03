import { Component, OnDestroy, OnInit } from '@angular/core';

import { BillService } from '../shared/services/bill.service';
import { combineLatest, Subscription } from 'rxjs';
import { Bill } from '../shared/models/bill.model';

@Component({
  selector: 'hb-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  sub2: Subscription;

  bill: Bill;
  currency: object;

  isLoaded = false;

  constructor(private billService: BillService) {}

  private getData() {
    return combineLatest(
      this.billService.getBill()
      // this.billService.getCurrency()
    ).subscribe((data) => {
      this.bill = data[0];
      this.currency = {
        base: 'EUR',
        date: '2018-07-03',
        rates: {'RUB': 73.739646, 'USD': 1.165229, 'EUR': 1, 'BTC': 0.000176},
        success: true,
        timestamp: 1530545348,
      }; // data[1];
      this.isLoaded = true;
      console.log(data);
    });
  }

  ngOnInit() {
    this.sub1 = this.getData();
  }

  onRefrash() {
    this.sub2 = this.getData();
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
