import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contrasena'
})
export class ContrasenaPipe implements PipeTransform {

  transform(value: any, mostrar: boolean = true): any {
    return ( mostrar ) ? '*'.repeat( value.length ): value;
  }

}
