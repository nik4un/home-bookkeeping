import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { fadeStateTrigger } from '../../shared/animation/fade.animation';

@Component({
  selector: 'hb-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],

})
export class RegistrationComponent implements OnInit {
  // создаем переменную для работы с формой,
  // передаем эту переменную в шаблон в тег form в качестве параметра для бандинга
  form: FormGroup;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      // создаем необходимые контролы
      'email': new FormControl('ussr@mail.ru',
        [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
      'password': new FormControl(null,
        [Validators.required, Validators.minLength(6)]),
      'name': new FormControl('NoName',
        [Validators.required]),
      'agree': new FormControl(false,
        [Validators.requiredTrue]),
    });
  }

  onSubmit() {
    const { email, password, name } = this.form.value;
    const user = new User(email, password, name);

    this.usersService
      .createNewUser(user)
      .subscribe((data) => {
        console.log('User data:', data);
        this.router.navigate(['/login'], {
          queryParams: { login: data['email'] }
      });
      });
  }

  forbiddenEmails(control: FormControl): Promise<any> {
    return  new Promise<any>((resolve) => {
      this.usersService.getUserByEmail(control.value)
        .subscribe((data: Array<User>) => {
          if (data[0]) {
            resolve({forbiddenEmail: true}); // объект для асинхронного валидатора
          } else {
            resolve(null); // проверяемый email в базе не зарегистрирован
          }
        });
    });
  }
}
