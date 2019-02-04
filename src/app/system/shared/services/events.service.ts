import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firebase-database';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../../shared/services/auth.service';
import { CategoryEvent } from '../models/event.model';

@Injectable()
export class EventsService {
  constructor(private authService: AuthService) { }

  getEvent(): Observable<CategoryEvent[]> {
    const target = firebase.database().ref(`users/${this.authService.getUserId()}/events`);
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

  addEvent(event: CategoryEvent): Observable<CategoryEvent> {
    const target = firebase.database().ref(`users/${this.authService.getUserId()}/events`);
    return from(target.push(event))
    // ответ приходит в виде: { { dataId: { key: value, ... } } }
    // забираем key, добавляем в category, которую и вернет данный observable
      .pipe(map(res => {
        event.id = res.key;
        return event;
      }));
  }

  getEventById(id: string): Observable<CategoryEvent[]> {
    const target = firebase.database().ref(`users/${this.authService.getUserId()}/events/${id}`);
    return from(
      target.once('value')
      // ответ приходит в виде: { { dataId: { key: value, ... } } }
      // преобразуем его в массив: [{id: dataId, key: value, ...}, ...], который и вернет данный observable
        .then((snapshot) => {
          const data = snapshot.val();
          const event = Object.assign({}, data);
          event.id = id;
          return event;
        })
    );
  }

}

