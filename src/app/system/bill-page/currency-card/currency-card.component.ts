import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hb-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {

  @Input() currency: object;

  dollarRate: number;
  euroRate: number;
  bcRate: number;

  constructor() { }

  ngOnInit() {
    const { date, rates } = this.currency;
    this.euroRate = rates['RUB'];
    this.dollarRate = rates['RUB'] / rates['USD'];
    this.bcRate = rates['RUB'] / rates['USD'] / rates['BTC'];
  }

}
