import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { mergeMap } from 'rxjs/operators';
import * as moment from 'moment';

import { Category } from '../../shared/models/category.model';
import { Message } from '../../../shared/models/message.model';
import { CategoryEvent } from '../../shared/models/event.model';
import { EventsService } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hb-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

  @Input()  categories: Category[] = [];

  selectedCategoryId = 1;
  selectedCategory: Category;
  eventTypes = [
    { type: 'income', label: 'Доход' },
    { type: 'outcome', label: 'Расход' },
  ];
  message: Message;
  sub1: Subscription;
  sub2: Subscription;

  constructor(private eventsService: EventsService,
              private billService: BillService) { }

  ngOnInit() {
    this.message = new Message('success', '');
  }

  onSubmit(form: NgForm) {
    const { eventType, amount, description } = form.value;
    const categoryEvent = new CategoryEvent(
      eventType, amount, this.selectedCategoryId,
      moment(new Date()).format('DD.MM.YYYY HH:mm:ss'), description);

    this.sub1 = this.billService.getBill()
      .subscribe((bill: Bill) => {
        let newBill = 0;
        if (eventType === 'outcome') {
          if (amount > bill.value) {
            // Ошибка: недостаточно средств
            this.message.text =
              `Недостаточно средств. Не хватает ${ amount - bill.value } руб.`;
            this.message.type = 'danger';
            window.setTimeout(() => this.message.text = '', 2000);
            return;
          }
          newBill = bill.value - amount;
        } else {
          newBill = bill.value + amount;
        }
        this.sub2 = this.billService.updateBill({ value: newBill, currency: bill.currency })
          .pipe(mergeMap(() => this.eventsService.addEvent(categoryEvent)))
          .subscribe(() => {
            form.reset();
            this.selectedCategoryId = 1;
            form.setValue({
              eventType: 'outcome',
              amount: 1,
              category: 1,
              description: ''
            });
            this.message.text = 'Событие успешно добавлено.';
            this.message.type = 'success';
            window.setTimeout(() => this.message.text = '', 2000);
          });
      });

  }

  onCategoryChange() {
    this.selectedCategory = this.categories
      .find((c) => c.id === +this.selectedCategoryId);
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
