import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

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
  private nameInit = '';

  errorLoginMessage = {
    'auth/user-not-found': 'Такого пользователя не существует',
    'auth/wrong-password': 'Неверный пароль'
  };

  constructor(
    private authService: AuthService,
    private router: Router, // для реализации роутинга
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) {
    title.setTitle('Вход в систему');
    meta.addTags([
      { name: 'keywords', content: 'логин, вход, система' },
      { name: 'description', content: 'Страница для входа в систему' }
    ]);
  }

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
    const email = formData.email;
    const password = formData.password;

    this.authService.login(email, password).subscribe(
      (data) => {
        this.message.text = '';
        const user = Object.assign({}, data);
        window.localStorage.setItem('user', JSON.stringify(user));
          // console.log(data);
      },
      (err) => {
        // code: "auth/user-not-found"
        // code: "auth/wrong-password"
        this.showMessage(this.errorLoginMessage[err.code]);
      },
      () => {
        this.router.navigate(['/system', 'bill']);
      }
    );
  }

}
