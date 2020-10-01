import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  singleChoiceQuestions = [
    "Prince Harry is taller than Prince William",
    "The star sign Aquarius is represented by a tiger",
    "Meryl Streep has won two Academy Awards",
    "Marrakesh is the capital of Morocco",
    "Idina Menzel sings 'let it go' 20 times in 'Let It Go' from Frozen",
    "Waterloo has the greatest number of tube platforms in London",
    "M&M stands for Mars and Moordale",
    "Gin is typically included in a Long Island Iced Tea",
    "The unicorn is the national animal of Scotland",
    "There are two parts of the body that can't heal themselves",
  ]
  questionsWithAnswer = [];
  answers = [];

  
  @ViewChild('form', { static: true })
  form: NgForm;

  @ViewChild('fill', { static: true })
  fill: NgForm;

  login: string;
  password = '';
  hide = true;
  startQuiz = false;
  variant = '';
  questionText = '';

  emailCtrl = new FormControl('', [
    Validators.required, 
    Validators.email, 
    Validators.minLength(4)]);
  passwordCtrl = new FormControl('', [
    Validators.required, 
    Validators.minLength(4)]);
  loginForm = new FormGroup({
    email: this.emailCtrl,
    password: this.passwordCtrl
  });
  addVariant() {
    const v = this.fill.form.value.variant;
    if(v !== "") this.answers.push(this.fill.form.value.variant)
  }
  submit() {
    console.log("1 form");
  }
  submit2() {
    console.log(this.form);
  }
  startQuizClicked() {
    if(this.loginForm.valid) {
      this.startQuiz = true;
    }
  }
  onSubmitQuestion(){
    if(this.answers.length === 0) this.addVariant();
    this.questionsWithAnswer.push(
      {
        question: this.fill.form.value.question,
        answers: this.answers
      });
    this.answers = [];
    console.log(this.questionsWithAnswer);
    this.questionText = '';
    this.variant = '';
  }


}
