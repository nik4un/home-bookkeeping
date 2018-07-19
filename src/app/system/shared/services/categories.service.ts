import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseApi } from '../../../shared/core/base-api';
import { Category } from '../models/category.model';

@Injectable()
export class CategoriesService extends BaseApi {
  constructor(public http: HttpClient) {
    super (http);
  }

  getCategory(): Observable<Category> {
    return  this.get(`categories`);
  }

  addCategory(category: Category): Observable<Category> {
    return  this.post(`categories`, category);
  }

  updateCategory(category: Category): Observable<Category> {
    return  this.put(`categories/${category.id}`, category);
  }

  getCategoryById(id: number): Observable<Category> {
    return  this.get(`categories/${id}`);
  }

}
