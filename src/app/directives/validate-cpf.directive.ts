import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g,'');

  if(cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  let rest;

  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i);
  }

  rest = (sum * 10) % 11;

  if ((rest === 10) || (rest === 11)) rest = 0;

  if (rest !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i);
  }

  rest = (sum * 10) % 11;

  if ((rest === 10) || (rest === 11)) rest = 0;

  if (rest !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

@Directive({
  selector: '[validateCPF][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidateCpfDirective,
      multi: true
    }
  ]
})
export class ValidateCpfDirective implements Validator {

  validate(c: AbstractControl): { [key: string]: any } | null {
    if (c.value && !validarCPF(c.value)) {
      return { cpf: true };
    }
    return null;
  }

}
