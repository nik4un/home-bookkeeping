import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs/index';
import { delay } from 'rxjs/operators';

import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { CategoryEvent } from '../shared/models/event.model';
import { Category } from '../shared/models/category.model';

@Component({
  selector: 'hb-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  sub: Subscription;
  isLoaded = false;
  categories: Category[] = [];
  categoryEvents: CategoryEvent[] = [];
  chartData = [];

  constructor(private categoryService: CategoriesService,
              private eventService: EventsService) { }

  ngOnInit() {
    this.sub = combineLatest(
      this.categoryService.getCategory(),
      this.eventService.getEvent()
    ).pipe(delay(150)) // искуственная задержка
      .subscribe((data: [Category[], CategoryEvent[]]) => {
        this.categories = data[0];
        this.categoryEvents = data[1];
        this.isLoaded = true;
        this.calculateChartData();
      });
  }
  calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach((category) => {
      const categoryEvent = this.categoryEvents
        .filter((el) => el.category === category.id && el.type === 'outcome');
      this.chartData.push({
        name: category.name,
        value: categoryEvent.reduce((acc, item) => acc + item.amount, 0)
      });
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
