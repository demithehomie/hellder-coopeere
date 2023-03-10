import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(value: any[], searchTerm: string): any[] {
        if (!value || !searchTerm) {
          return value;
        }
      
        return value.filter((item: any) => {
          // retornar true para manter o item no array
          return item.conteudo.toLowerCase().includes(searchTerm.toLowerCase());
        });
      }
      
}
