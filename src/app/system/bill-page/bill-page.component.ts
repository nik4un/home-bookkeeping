import { Component, OnDestroy, OnInit } from '@angular/core';

import { BillService } from '../shared/services/bill.service';
import { combineLatest, Subscription } from 'rxjs';
import { Bill } from '../shared/models/bill.model';
import { delay } from 'rxjs/operators';
import { Meta, Title } from '@angular/platform-browser';

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

  constructor(
    private billService: BillService,
    private meta: Meta,
    private title: Title
  ) {
    title.setTitle('Счет');
    meta.addTags([
      {name: 'keywords', content: 'счет'},
      {name: 'description', content: 'Страница счета'}
    ]);
  }

  private getData() {
    return combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).pipe(delay(150)) // искуственная задержка
      .subscribe((data) => {
      this.bill = data[0];
      /*this.currency = {
        base: 'EUR',
        date: '2018-07-04',
        rates: {'RUB': 73.739646, 'USD': 1.165229, 'EUR': 1, 'BTC': 0.000176},
        success: true,
        timestamp: 1530545348,
      };*/
      this.currency = data[1];
      this.isLoaded = true;
    });
  }

  ngOnInit() {
    this.sub1 = this.getData();
  }

  onRefrash() {
    this.sub2 = this.getData();
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }
}
