import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'hb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup; // передаем эту переменную в шаблон в тег form в качестве параметра для бандинга

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      // создаем необходимые контролы, в нашем случае - это email, password (id в форме)
      // записываем через строку, чтобы при минификации не исказились имена
      // параметры: начальное значение и валидатор формы
      'email': new FormControl('null@ng.ru',
        [Validators.required, Validators.email]),
      'password': new FormControl(null,
        [Validators.required, Validators.minLength(6)])
        // minLength - минимальная длина вводимой информации
    });
  }

  onSubmit() {
    console.log(this.form);
  }

}
