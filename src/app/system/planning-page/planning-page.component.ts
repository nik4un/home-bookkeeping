import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { delay } from 'rxjs/operators';

import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { Category } from '../shared/models/category.model';
import { Bill } from '../shared/models/bill.model';
import { CategoryEvent } from '../shared/models/event.model';

@Component({
  selector: 'hb-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  sub: Subscription;
  isLoaded = false;
  bill: Bill;
  categories: Category[] = [];
  categoryEvents: CategoryEvent[] = [];

  constructor(
    private billService: BillService,
    private categoryService: CategoriesService,
    private eventService: EventsService,
    private meta: Meta,
    private title: Title
  ) {
    title.setTitle('Планирование');
    meta.addTags([
      { name: 'keywords', content: 'планирование' },
      { name: 'description', content: 'Страница планирования' }
    ]);
  }

  ngOnInit() {
    this.sub = combineLatest(
      this.billService.getBill(),
      this.categoryService.getCategory(),
      this.eventService.getEvent()
    ).pipe(delay(150)) // искуственная задержка
      .subscribe((data: [Bill, Category[], CategoryEvent[]]) => {
        this.bill = data[0];
        this.categories = data[1];
        this.categoryEvents = data[2];
        this.isLoaded = true;
      });
  }

  getCostInCategory(category: Category): number {
    return this.categoryEvents
      .filter((el) => el.category === category.id && el.type === 'outcome')
      .reduce((acc, item) => {
        return acc + item.amount;
      }, 0);
  }

  private getCapacityPercent(category: Category): number {
    const percent = this.getCostInCategory(category) / category.capacity * 100;
    return percent > 100 ? 100 : percent;
  }

  getCapacityPercentString(category: Category): string {
    return this.getCapacityPercent(category) + '%';
  }

  getProgressBarColor(category: Category): string {
    const percent = this.getCapacityPercent(category);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning' ;
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
