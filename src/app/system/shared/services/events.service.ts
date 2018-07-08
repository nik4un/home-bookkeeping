import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseApi } from '../../../shared/core/base-api';
import { CategoryEvent } from '../models/events.model';

@Injectable()
export class EventsService extends BaseApi {
  constructor(public http: HttpClient) {
    super (http);
  }

  // getCategory(): Observable<Category> {
  //   return  this.get(`categories`);
  // }

  addEvent(event: CategoryEvent): Observable<CategoryEvent> {
    return  this.post(`events`, event);
  }

  // updateCategory(category: Category): Observable<Category> {
  //   return  this.put(`categories/${category.id}`, category);
  // }

}
