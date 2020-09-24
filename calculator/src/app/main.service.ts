import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }
  unaryOperator(op: string, firstNumber: string) {
    let res = ''
    let history = '';
    const fn = parseFloat(firstNumber);
    switch (op) {
      case 'x^2':
        res = (fn * fn).toString();
        history = `(${fn})^2 = `
        break;
      case '√':
        res = (Math.sqrt(fn)).toString();
        history = `√(${fn}) = `
        break;
      case '%':
        res = (fn/100).toString();
        history = `(${fn})/100 = `
        break;
      case '|1/x|':
        res = (1/fn).toString();
        history = `1/(${fn}) = `
        break;
      default:
        break;
    }
    return [res, history];
    
  }
  binaryOperator(op: string, firstNumber: string, secondNumber: string) {
    const fn = parseFloat(firstNumber);
    const sn = parseFloat(secondNumber);
    let history = '';
    let res = 0;
    switch (op) {
      case '+':
        res = fn + sn;
        history = `${fn} + ${sn} = `
        break;
      case '–':
        res = fn - sn;
        history = `${fn} - ${sn} = `
        break;
      case 'x':
        res = fn * sn;
        history = `${fn} * ${sn} = `
        break;
      case '➗':
        res = fn / sn;
        history = `${fn} / ${sn} = `
        break;
      default:
        break;
    }
    return [res.toString(), history];
  }
}
