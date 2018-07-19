import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { CategoryEvent } from '../../shared/models/event.model';

@Component({
  selector: 'hb-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() categoryEvents: CategoryEvent[] = [];

  searchValue = '';
  searchPlaceholder = 'Дата';
  searchField = 'date';

  constructor() { }

  ngOnInit() {
    this.categoryEvents.forEach((item) => {
      item.name = this.categories.find((elem) => elem.id === item.category).name;
    });
  }

  changeCriteria(field: string) {
    const nameMap = {
      amount: 'Сумма',
      date: 'Дата',
      category: 'Категория',
      type: 'Тип'
    };
    this.searchPlaceholder = nameMap[field];
    this.searchField = field;
    this.searchValue = '';
  }

}
