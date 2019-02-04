import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firebase-database';
import { from, Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../../../shared/services/auth.service';

@Injectable()
export class CategoriesService {
  constructor(private authService: AuthService) { }

  getCategory(): Observable<Category[]> {
    const target = firebase.database().ref(`users/${this.authService.getUserId()}/categories`);
    return from(
      target.once('value')
      // ответ приходит в виде: { { dataId: { key: value, ... } } }
      // преобразуем его в массив: [{id: dataId, key: value, ...}, ...], который и вернет данный observable
        .then((snapshot) => {
          const data = snapshot.val();
          const arr = [];
          if (data) {
            Object.keys(data).map(key => {
              const item = data[key];
              item.id = key;
              arr.push(item);
            });
          }
          return arr;
        })
    );
  }

  getCategoryById(id): Observable<Category> {
    const target = firebase.database().ref(`users/${this.authService.getUserId()}/categories/${id}`);
    return from(
      target.once('value')
      // ответ приходит в виде: { { dataId: { key: value, ... } } }
      // преобразуем его в массив: [{id: dataId, key: value, ...}, ...], который и вернет данный observable
        .then((snapshot) => {
          const data = snapshot.val();
          const category = Object.assign({}, data);
          category.id = id;
          return category;
        })
    );
  }

  addCategory(category: Category): Observable<Category> {
    const target = firebase.database().ref(`users/${this.authService.getUserId()}/categories`);
    return from(target.push(category))
    // ответ приходит в виде: { { dataId: { key: value, ... } } }
    // забираем key, добавляем в category, которую и вернет данный observable
      .pipe(map(res => {
        category.id = res.key;
        return category;
      }));
  }
  updateCategory(category): Observable<void> {
    const newCategory: Category = {
      name: category.name,
      capacity: category.capacity
    };
    const target = firebase.database().ref(`users/${this.authService.getUserId()}/categories/${category.id}`);
    return from(target.update(newCategory));
  }
}
