import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';


@Injectable()
  
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  itemsPerPageLabel = 'Elementos por página'; 
  nextPageLabel     = 'Siguiente';
  previousPageLabel = 'Anterior';
  firstPageLabel    = 'Página 1';
  lastPageLabel     = 'Ultima página';

  getRangeLabel = (page: number, pageSize: number, length: number) =>{
    if (length === 0 || pageSize === 0) {
      return `0 / ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };
}

//en este archivo le damos personalizacion al paginator
//showFirstLastButtons  .. nos permite pasar de la primer pagina a la ultima y viceversa
// {provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl},  ubicando este codigo en los modulos (providers), proveemos una clase que hereda de la otra
