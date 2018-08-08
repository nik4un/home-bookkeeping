import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UsersService } from '../../shared/services/users.service';
import { Message } from '../../shared/models/message.model';
import { AuthService } from '../../shared/services/auth.service';
import { fadeStateTrigger } from '../../shared/animation/fade.animation';

@Component({
  selector: 'hb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {

  form: FormGroup; // передаем эту переменную в шаблон в тег form в качестве параметра для бандинга
  message: Message;
  private nameInit = 'null@mail.ru';

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router, // для реализации роутинга
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.message = new Message( '', '');
    this.route.queryParams
      .subscribe((params: Params) => {
        if (params['login']) {
          this.showMessage('Теперь вы можете войти в систему', 'success');
          this.nameInit = params['login'];
        } else if (params['accessDenied']) {
          this.showMessage('Для работы необходимо войти в систему под своим именем', 'warning');
        }
      });
    this.form = new FormGroup({
      // создаем необходимые контролы, в нашем случае - это email, password (id в форме)
      // записываем через строку, чтобы при минификации не исказились имена
      // параметры: начальное значение и валидатор формы
      'email': new FormControl(`${this.nameInit}`,
        [Validators.required, Validators.email]),
      'password': new FormControl(null,
        [Validators.required, Validators.minLength(6)])
        // minLength - минимальная длина вводимой информации
    });
  }

  private showMessage( text: string, type: string = 'danger') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;

    this.usersService.
      getUserByEmail(formData.email)
      .subscribe((data) => {
        if (data[0]) {
          if (data[0].password === formData.password) {
            this.message.text = '';
            // window.localStorage.setItem принимает две строки ключ и значение
            // JSON.stringify(obj) - оборачивает объект obj в строку
            const user = {
              'id': data[0].id,
              'name': data[0].name
            };
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            // редирект на главную страницу приложения модуля system
            this.router.navigate(['/system', 'bill']);
          } else {
            this.showMessage(`Пароль не верный`);
          }
        } else {
          this.showMessage(`Такого пользователя не существует`);
        }
      });
  }

}
