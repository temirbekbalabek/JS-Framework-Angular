import { Component, ViewChild } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'questionnaire';
  
  @ViewChild('form', { static: true })
  form: NgForm;

  login: string;
  password: string;
  loginCtrl = new FormControl('', [
    Validators.required, 
    Validators.email, 
    Validators.minLength(4)]);
  passwordCtrl = new FormControl('');
  questionCtrl = new FormControl('');

  loginForm = new FormGroup({
    login: this.loginCtrl,
    password: this.passwordCtrl,
    question: this.questionCtrl
  });

  submit() {
    console.log("1 form");
  }
  submit2() {
    console.log(this.form);
  }
}
