import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { delay, mergeMap } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';

import { EventsService } from '../../shared/services/events.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { CategoryEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'hb-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event: CategoryEvent;
  category: Category;
  isLoaded = false;
  sub1: Subscription;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoriesService,
    private eventService: EventsService,
    private meta: Meta,
    private title: Title
  ) {
    title.setTitle('История');
    meta.addTags([
      {name: 'keywords', content: 'история, операции'},
      {name: 'description', content: 'Страница истории операций'}
    ]);
  }

  ngOnInit() {
    this.sub1 = this.route.params
      .pipe(mergeMap((params: Params) => this.eventService.getEventById(params['id'])))
      .pipe(mergeMap((event: CategoryEvent) => {
        this.event = event;
        return this.categoryService.getCategoryById(event.category);
      }))
      .pipe(delay(150)) // искуственная задержка
      .subscribe((category: Category) => {
        this.category = category;
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
