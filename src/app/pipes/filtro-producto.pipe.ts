import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroBusqueda'
})
export class FiltroProductoPipe implements PipeTransform {

  transform(value: any, args: string): any {

    const resultProductos = [];

    for (const item of value) {
      if (item.nombre.indexOf(args) > - 1) (
        resultProductos.push(item)
      );
    };
    return resultProductos;
  }

}
