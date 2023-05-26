import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCpfFormat]'
})
export class CpfFormatDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const cpf = event.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    if (cpf.length > 0) {
      event.target.value = this.formatCpf(cpf);
    } else {
      event.target.value = '';
    }
  }

  private formatCpf(cpf: string): string {
    cpf = cpf.padStart(11, '0'); // Garante que o CPF tenha 11 dígitos

    const part1 = cpf.substr(0, 3);
    const part2 = cpf.substr(3, 3);
    const part3 = cpf.substr(6, 3);
    const part4 = cpf.substr(9);

    return `${part1}.${part2}.${part3}-${part4}`;
  }

}
