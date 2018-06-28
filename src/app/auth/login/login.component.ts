import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../shared/services/user.service';
import { Message } from '../../shared/services/models/message.model';


@Component({
  selector: 'hb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup; // передаем эту переменную в шаблон в тег form в качестве параметра для бандинга
  message: Message;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      // создаем необходимые контролы, в нашем случае - это email, password (id в форме)
      // записываем через строку, чтобы при минификации не исказились имена
      // параметры: начальное значение и валидатор формы
      'email': new FormControl('null@mail.ru',
        [Validators.required, Validators.email]),
      'password': new FormControl(null,
        [Validators.required, Validators.minLength(6)])
        // minLength - минимальная длина вводимой информации
    });
    this.message = new Message( 'danger', '');
  }

  private showMessage( text: string, type: string = 'danger') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;

    this.userService.
      getUserByEmail(formData.email)
      .subscribe((data) => {
        if (data[0]) {
          if (data[0].password === formData.password) {
            //
          } else {
            this.showMessage(`Пароль не верный`);
          }
        } else {
          this.showMessage(`Такого пользователя не существует`);
        }
      });
  }

}
