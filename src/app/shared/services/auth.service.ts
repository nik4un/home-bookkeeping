import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-database';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userId = '';
  private userName = '';

  constructor() { }

  login(email, password): Observable<any> {
    return from(
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(({user}) => {
          this.userId = user.uid;
          return firebase.database().ref(`users/${user.uid}/user-name`).once('value');
        })
        .then((snapshot) => {
          this.userName = snapshot.val();
          return {
            id: this.userId,
            name: this.userName
          };
        })
    );
  }

  registration(email, password, name): Observable<any> {
    return from(
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(({ user }) => {
          this.userId = user.uid;
          return firebase.database().ref(`users/${this.userId}`).set({'user-name': name, 'bill': { value: 0, currency: 'RUB' }});
        })
        .then(() => firebase.database().ref(`users/${this.userId}/user-name`).once('value'))
        .then((snapshot) => {
          this.userName = snapshot.val();
          return {
            id: this.userId,
            name: this.userName
          };
        })
        // .catch((err) => {
        //   console.log(err);
        //   return err;
        // })
    );
  }

  getUserId(): string {
    return this.userId;
  }

  // getUserName(): string {
  //   return this.userName;
  // }

  logout() {
    this.userId = '';
    this.userName = '';
  }
}
