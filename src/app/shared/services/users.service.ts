import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  getUserByEmail(email: string) {
    return  this.http.get(`http://localhost:3210/users?email=${email}`);
  }
}
