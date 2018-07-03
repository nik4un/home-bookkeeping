import { Component, Input, OnInit } from '@angular/core';

import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'hb-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currency: object;

  dollar: number;
  euro: number

  constructor() { }

  ngOnInit() {
    console.log(this.currency);
    const { rates } = this.currency;
    this.dollar = this.bill.value / rates['RUB'] / rates['USD'];
    this.euro = this.bill.value / rates['RUB'] / rates['EUR'];
  }

}
