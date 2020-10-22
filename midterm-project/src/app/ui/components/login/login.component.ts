import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, NgForm } from '@angular/forms';
import { MyService } from 'src/app/my-service.service';
import { IUser } from 'src/app/data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  
  constructor(public service: MyService, public router: Router) { 
    console.log(this.nameCtrl)
  }

  ngOnInit(): void {
    if(localStorage.getItem('token'))
    this.router.navigate(['posts'])
    this.service
        .subscribeForUsers()
        // .pipe(map((todos) => todos.filter((todo) => !todo.completed)))
        .subscribe((users) => {
          console.log('myservice')
          this.users = users;
        });
  }
  users: IUser[];
  nameCtrl = new FormControl('', [Validators.required]);
  usernameCtrl = new FormControl('', [Validators.required]);
  loginUsernameCtrl = new FormControl('', [Validators.required]);
  loginPasswordCtrl = new FormControl('', [Validators.required]);
  emailCtrl = new FormControl('', [
    Validators.required, 
    Validators.email, 
    Validators.minLength(4)]);
  passwordCtrl = new FormControl('', [
    Validators.required, 
    Validators.minLength(4)]);
  streetCtrl = new FormControl('', [Validators.required]);
  suiteCtrl = new FormControl('', [Validators.required]);
  cityCtrl = new FormControl('', [Validators.required]);
  zipcodeCtrl = new FormControl('', [Validators.required]);
  latCtrl = new FormControl('', [Validators.required]);
  lngCtrl = new FormControl('', [Validators.required]);
  phoneCtrl = new FormControl('', [Validators.required]);
  websiteCtrl = new FormControl('', [Validators.required]);
  companyNameCtrl = new FormControl('', [Validators.required]);
  catchPhraseCtrl = new FormControl('', [Validators.required]);
  bsCtrl = new FormControl('', [Validators.required]);
  loginElements = [this.usernameCtrl, this.passwordCtrl];
  loginElementsCopy = ['username', 'password'];
  registrationElements = [
    this.nameCtrl, this.usernameCtrl,
    this.emailCtrl, this.passwordCtrl,
    this.streetCtrl, this.suiteCtrl,
    this.cityCtrl, this.zipcodeCtrl,
    this.latCtrl, this.lngCtrl,
    this.phoneCtrl, this.websiteCtrl,
    this.companyNameCtrl, this.catchPhraseCtrl,
    this.bsCtrl,
  ];
  registrationElementsCopy = [
    'name', 'username',
    'email', 'password',
    'street', 'suite',
    'city', 'zipcode',
    'lat', 'lng',
    'phone', 'website',
    'companyName', 'catchPhrase',
    'bs',
  ];
  
  firstForm = new FormGroup({
    email: this.emailCtrl,
    password: this.passwordCtrl,
    name: this.nameCtrl,
    username: this.usernameCtrl,
    street: this.streetCtrl,
    suite: this.suiteCtrl,
    city: this.cityCtrl,
    zipcode: this.zipcodeCtrl,
    lat: this.latCtrl,
    lng: this.lngCtrl,
    phone: this.phoneCtrl,
    website: this.websiteCtrl,
    companyName: this.companyNameCtrl,
    catchPhrase: this.catchPhraseCtrl,
    bs: this.bsCtrl
  });

  secondForm = new FormGroup({
    username: this.loginUsernameCtrl,
    password: this.loginPasswordCtrl,
  });
  registrationNeeded = false;

  getErrorMessage(er: FormControl) {
    if (er.hasError('required')) {
      return 'You must enter a value';
    }

    return er.hasError('email') ? 'Not a valid email' : '';
  }
  fName(e: string) {
    return this.firstForm.get(e);
  }
  sName(e: string) {
    return this.secondForm.get(e);
  }
  sendData() {
    // console.log(this.form);
  }
  registrateBtnClicked() {
    this.registrationNeeded = true;
  }
  back() {
    this.registrationNeeded = !this.registrationNeeded;
  }
  login(secondFormValue: any) {
    console.log(secondFormValue);

    this.service.signIn(secondFormValue)
      .subscribe(
          (data: any) => 
          {
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('username', this.secondForm.value.username);
            localStorage.setItem('password', this.secondForm.value.password);
            console.log('token', data.accessToken);
            this.router.navigate(['posts'])
          },
          error => console.log(error)
      );
  }
  registrate() {
    console.log('first form', this.firstForm.value);
    this.service.registrate(this.firstForm.value)
      .subscribe(
          (data) => 
          {
            console.log('registrate', data);
            this.login(
              {
                value: {username: this.firstForm.value.username, password: this.firstForm.value.password}
              });
            this.router.navigate(['posts'])

          },
          error => console.log(error)
      );
  }
}
