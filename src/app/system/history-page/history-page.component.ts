import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs/index';
import { delay } from 'rxjs/operators';
import * as moment from 'moment';

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
  isFilterVisible = false;
  filteredEvents: CategoryEvent[] = [];

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
        this.initFilteredEvents();
        this.calculateChartData();
        this.isLoaded = true;
      });
  }

  private initFilteredEvents() {
    this.filteredEvents = this.categoryEvents.slice();
  }


  calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach((category) => {
      const categoryEvent = this.filteredEvents
        .filter((el) => el.category === category.id && el.type === 'outcome');
      this.chartData.push({
        name: category.name,
        value: categoryEvent.reduce((acc, item) => acc + item.amount, 0)
      });
    });
  }

  private toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir;
  }

  openFilter() {
    this.isFilterVisible = true;
  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
    this.initFilteredEvents();
    this.calculateChartData();
  }

  onFilterApply(evt) {
    this.toggleFilterVisibility(false);
    this.initFilteredEvents();

    const startPeriod = moment().startOf(evt.period);
    const endPeriod = moment().endOf(evt.period);

    this.filteredEvents = this.filteredEvents
      .filter((e) => evt.types.indexOf(e.type) !== -1)
      .filter((e) => evt.categories.indexOf(e.category.toString()) !== -1)
      .filter((e) => {
        const eventDate  = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return eventDate.isBetween(startPeriod, endPeriod);
      });
    this.calculateChartData();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
