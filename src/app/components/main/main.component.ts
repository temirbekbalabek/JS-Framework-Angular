import { Component, OnInit, EventEmitter } from '@angular/core';
import { R3DelegatedFnOrClassMetadata } from '@angular/compiler/src/render3/r3_factory';
import { MainService } from 'src/app/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(private mainService: MainService) { }
  symbols = [
    '%','√','x^2','|1/x|',
    'CE','C','⌫','➗',
    '7','8','9','x',
    '4','5','6','–',
    '1','2','3','+',
    '±','0','.','='
];
  mSymbols = ['MC', 'MR', 'M+', 'M-', 'MS']
  display = '0';
  miniDisplay = ' ';
  numberFound = false;
  equalPressed = false;
  equalFound = false;
  backspaceAvailable = true;
  showHistory = false;
  memory = 0;
  fn = '';
  sn = '';
  res = '';
  operation = '';
  histories = [];
  results = [];
  // ngOnInit(): void {
  // } 
  historyIconClicked() {
    if(this.showHistory) this.showHistory = false
    else this.showHistory = true;
  }
  clickedNumber(event) {
    const value = event.target.innerText;
    if(this.res === '') {
      if(this.display === '0') {
        this.display = value;
      }
      else {
        this.display += value;
      }
    }
    else {
      this.display = value;
      this.res = '';
    }
  }
  clickedOperation(event) {
    const op = event.target.innerText;
    if(op === '+' || op === '–' || op === 'x' || op === '➗') {
      if(this.operation) {
        let history = "";
        let answer = [];
        answer = this.mainService.binaryOperator(this.operation, this.fn, this.display)
        this.res = answer[0]
        history = answer[1]
        this.results.push(this.res);
        this.histories.push(history)
        this.fn = this.res;
        this.display = this.res;
        this.operation = op;
        this.equalPressed = false;
      }
      else {
      this.fn = this.display;
      this.operation = op;
      this.display = '0';
      }
      this.miniDisplay += `${this.fn} ${op} `;
    }
    else if(op === '=') {
      let history = "";
      let answer = []
      if(this.equalPressed) {
        answer = this.mainService.binaryOperator(this.operation, this.res, this.sn);
      }
      else {                                             
        this.sn = this.display;
        answer = this.mainService.binaryOperator(this.operation, this.fn, this.sn);
        this.equalPressed = true;
      }
      this.res = answer[0];
      history = answer[1];
      this.miniDisplay = history;
      this.display = this.res;
      this.results.push(this.res);
      this.histories.push(history);
      console.log(this.histories);
      this.backspaceAvailable = false;
    }
    else if(op === 'C') this.clear();
    else if(op === 'CE') this.clearEntry();
    else if(op === '⌫') {
      if(this.backspaceAvailable) {
        if(this.display.length === 1) {
          this.display = '0';
        }
        else {
          this.display = this.display.slice(0, -1);
        }
      }
    }
    else if(op === '±') {
      this.display =  (parseFloat(this.display)*(-1)).toString()
    }
    else if(op === '.') {
        if(this.display.indexOf('.') === -1) {
          this.display += '.';
        }
    }
    else {
      this.fn = this.display;
      this.operation = op;
      const answer = this.mainService.unaryOperator(this.operation, this.fn);
      this.res = answer[0];
      const history = answer[1];
      this.miniDisplay = history;
      this.histories.push(history);
      this.results.push(this.res);
      this.display = this.res;
      this.backspaceAvailable = false;
    }
  }
  clear() {
    this.fn = '';
    this.sn = '';
    this.operation = '';
    this.res = '';
    this.display = '0';
    this.miniDisplay = '';
    this.equalPressed = false;
    this.backspaceAvailable = true;
  }
  clearEntry() {
    if(this.res !== '') this.clear();
    this.display = '0';
  }
  removeHistory() {
    this.results = [];
    this.histories = []
  }
  clickedMemoryButton(event) {
    const d = parseFloat(this.display);
    switch (event.target.innerText) {
      case "MC":
        this.memory = 0;
        break;
      case "MS":
        this.memory = d;
        break;
      case "M+":
        this.memory += d;
        break;
      case "M-":
        this.memory -= d;
        break;
      case "MR":
        this.res = this.memory.toString()
        this.display = this.res;
        this.backspaceAvailable = false;
        break;
      default:
        break;
    }
  }
  changeNumbersColor(s: string) {
    const a = parseInt(s)

    if(a || a === 0) this.numberFound = true;
    else {
      if(s === "=") this.equalFound = true;
      else this.equalFound = false;
      this.numberFound = false;
    }
  }

}
