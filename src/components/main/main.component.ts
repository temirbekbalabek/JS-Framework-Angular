import { Component, OnInit, EventEmitter } from '@angular/core';
import { R3DelegatedFnOrClassMetadata } from '@angular/compiler/src/render3/r3_factory';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
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
  numberFound = false;
  equalPressed = false;
  equalFound = false;
  backspaceAvailable = true;
  memory = 0;
  fn = '';
  sn = '';
  res = '';
  operation = '';
  constructor() { }
  ngOnInit(): void {
  } 
  clickedNumber(event) {
    const value = event.target.innerText;
    if(this.res === "") {
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
      this.fn = this.display;
      this.operation = op;
      this.display = '0';
    }
    else if(op === '=') {
      this.sn = this.display;
      this.binaryOperator();
      this.display = this.res;
      if(!this.equalPressed) {
        this.fn = this.sn;
        this.equalPressed = true;
      }
      this.backspaceAvailable = false;
    }
    else if(op === 'CE' || op === 'C') {
      this.clear()
    }
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
      this.unaryOperator();
    }
  }

  unaryOperator() {
    const op = this.operation
    const fn = parseFloat(this.fn);
    switch (op) {
      case 'x^2':
        this.res = (fn * fn).toString();
        
        break;
      case '√':
        this.res = (Math.sqrt(fn)).toString();
        break;
      case '%':
        this.res = (fn/100).toString();
        break;
      case '|1/x|':
        this.res = (1/fn).toString();
        break;
      default:
        break;
    }
    this.display = this.res;
    this.backspaceAvailable = false;
  }
  binaryOperator() {
    const op = this.operation;
    const fn = parseFloat(this.fn);
    const sn = parseFloat(this.sn);
    let res = 0;
    switch (op) {
      case '+':
        res = fn + sn;
        break;
      case '–':
        res = fn - sn;
        break;
      case 'x':
        res = fn * sn;
        break;
      case '➗':
        res = fn / sn;
        break;
      default:
        break;
    }
    this.res = res.toString();
  }
  clear() {
    this.fn = '';
    this.sn = '';
    this.operation = '';
    this.res = '';
    this.display = '0';
    this.equalPressed = false;
    this.backspaceAvailable = true;
  }
  clearEntry() {}
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
