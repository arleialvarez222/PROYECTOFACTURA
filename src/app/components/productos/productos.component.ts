import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Client, ProductosUpdateRequestDTO, ProductosBase } from '../../services/api.producto.services';
import * as moment from 'moment';
import { PageEvent } from '@angular/material/paginator';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [Client, NgForm],
})
export class ProductosComponent implements OnInit {
  filtroProducts3 = '';
  display: boolean = false;
  product: ProductosBase = new ProductosBase();
  products: ProductosBase[] = [];
  productDialog: ProductosUpdateRequestDTO = new ProductosUpdateRequestDTO();
  displayModal: boolean = false;
  
  //variables del pipe pagination 
  page_size: any = 5;
  page_number: number = 1;
  pageSizeOptions = [5, 10, 20]

  constructor(public form: NgForm,
    private toastr: ToastrService,
    private _client: Client
  ) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this._client.productoAll().subscribe(
      (data: any) => {
        this.products = data;
      },
      (error) => {
        this.toastr.warning(
          'No se encontro los productos ',
          'ERROR',
          {
            positionClass: 'toast-bottom-right',
          }
        );
      }
    );
  }
  saveproduct(form: NgForm) {
    if (form.invalid) { 
      this.toastr.warning(
        'Todos los campos sson obligatorios',
        'ERROR',
        {
          positionClass: 'toast-bottom-right',
        }
      );
    } 
    else {
      /* this.product.fechaVencimiento = moment(
        this.product.fechaVencimiento
      ).toDate(); */
      this._client.producto(this.product).subscribe(
        (data) => {
          this.getAllProducts();
          this.toastr.success(
            'El producto se a guardado exitosamente',
            'GUARDADO',
            {
              positionClass: 'toast-bottom-right',
            }
          );
        },
        (error: any) => {
          this.toastr.warning(
            'El producto no se a guardado',
            'ERROR',
            {
              positionClass: 'toast-bottom-right',
            }
          );
        }
      );
    }
    
  }

  deleteProduct(item: ProductosBase) {
    
    this._client.producto4(item.id).subscribe(
      (data) => {
        this.getAllProducts();
       
        this.toastr.success(
          'El producto se a eliminado exitosamente',
          'ELIMINADO',
          {
            positionClass: 'toast-bottom-right',
          }
        );
      },
      (error: any) => {
        this.toastr.warning(
          'No se elimino el producto ',
          'ERROR',
          {
            positionClass: 'toast-bottom-right',
          }
        );
      }
    );
  } 

  abrirEditProduct(item: ProductosUpdateRequestDTO) {
    this.displayModal = true;
    this.productDialog.id               = item.id;
    this.productDialog.nombre           = item.nombre;
    this.productDialog.cantidad         = item.cantidad;
    this.productDialog.precioCompra     = item.precioCompra;
    this.productDialog.precioVenta      = item.precioVenta;
    this.productDialog.precioActual     = item.precioActual;
    this.productDialog.precioMinimo     = item.precioMinimo;
    this.productDialog.precioMaximo     = item.precioMaximo;
    this.productDialog.fechaVencimiento = item.fechaVencimiento;
    this.productDialog.categoriaId      = item.categoriaId;
  }

  guardarEdicProduct() {
    this._client.producto2(this.productDialog.id, this.productDialog).subscribe(
      (data) => {
        this.getAllProducts();
        this.toastr.success(
          'Producto actualizado',
          'ACTUALIZADO',
          {
            positionClass: 'toast-bottom-right',
          }
        );
      },
      (error: any) => {
        this.toastr.warning(
          'Producto sin actualizar',
          'ERROR',
          {
            positionClass: 'toast-bottom-right',
          }
        );
      }
    );
  } 
  
  showDialog() {
    this.display = true;
  }

  limpiarForm() {
    this.display = false;
    this.product.nombre = '';
    this.product.cantidad = 0;
    this.product.precioCompra = 0;
    this.product.precioVenta = 0;
    this.product.precioActual = 0;
    this.product.precioMinimo = 0;
    this.product.precioMaximo = 0;
    /* this.product.fechaVencimiento = ''; */
    this.product.categoriaId = 0;
    
  }
  //funcion del paginator
  handlePage(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }
 
}
