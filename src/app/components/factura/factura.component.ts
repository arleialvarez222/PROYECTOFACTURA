import { Component, inject, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ROUTES, Routes } from '@angular/router';
import { FacturasBase } from 'src/app/services/api.producto.services';
import { Client } from '../../services/api.producto.services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
  providers: [Client],
})
export class FacturaComponent implements OnInit {
  factura1: FacturasBase = new FacturasBase();
  factura2: FacturasBase[] = [];

  //variables del pipe pagination
  page_size: any = 5;
  page_number: number = 1;
  pageSizeOptions = [5, 10, 20];

  constructor(private _client: Client, private toastr: ToastrService) {}

  ngOnInit() {
    this.getAllFactura();
  }

  getAllFactura() {
    this._client.facturaAll().subscribe(
      (data: any) => {
        this.factura2 = data;
      },
      (error) => {
        this.toastr.warning('No se encontraron datos', 'ERROR', {
          positionClass: 'toast-bottom-right',
        });
      }
    );
  }

  deleteFactura(item: FacturasBase) {
    this._client.factura4(item.id).subscribe((data: any) => {
      this.getAllFactura();
      this.toastr.success('Datos eliminados', 'ELIMINADO', {
        positionClass: 'toast-bottom-right',
      });
    },
    (error) => {
      this.toastr.warning('Error al eliminar', 'ERROR', {
        positionClass: 'toast-bottom-right',
      });
    }
    );
  }

  //funcion del paginator
  handlePage(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }
}
