import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

// import { UsersService } from '../../shared/services/users.service';
import { AuthService } from '../../shared/services/auth.service';
import { Message } from '../../shared/models/message.model';

@Component({
  selector: 'hb-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],

})
export class RegistrationComponent implements OnInit {
  // создаем переменную для работы с формой,
  // передаем эту переменную в шаблон в тег form в качестве параметра для бандинга
  form: FormGroup;
  message: Message;

  errorRegMessage = {
    'auth/email-already-in-use': 'Данный email уже зерегистрирован',
    'auth/operation-not-allowed': 'Операция не разрешена',
    'auth/weak-password': 'Слабый пароль',
    'auth/invalid-email': 'Некорректный email',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private meta: Meta,
    private title: Title
  ) {
    title.setTitle('Регистрация в системе');
    meta.addTags([
                   { name: 'keywords', content: 'регистрация, система' },
                   { name: 'description', content: 'Страница для регистрации в системе' }
                 ]);
    }

  ngOnInit() {
    this.message = new Message( '', '');
    this.form = new FormGroup({
      // создаем необходимые контролы
      'email': new FormControl('ussr@mail.ru',
        [Validators.required, Validators.email]/*, this.forbiddenEmails.bind(this)*/),
      'password': new FormControl(null,
        [Validators.required, Validators.minLength(6)]),
      'name': new FormControl('NoName',
        [Validators.required]),
      'agree': new FormControl(false,
        [Validators.requiredTrue]),
    });
  }

  private showMessage( text: string, type: string = 'danger') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const {email, password, name} = this.form.value;
    // const user = new User(email, password, name);

    this.authService.registration(email, password, name).subscribe(
      () => {
      },
      (err) => {
        // auth/email-already-in-use
        // auth/invalid-email
        // auth/operation-not-allowed
        // auth/weak-password
        this.showMessage(this.errorRegMessage[err.code]);
      },
      () => {
        this.router.navigate(['/system', 'bill']);
      }
    );
  }

}
