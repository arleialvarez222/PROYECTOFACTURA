import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  ProductosBase,
  Client,
  FacturasProductosRequestDTO,
  FacturasBase,
  FacturasProductosBase,
  ClientesBase,
  EmpleadosBase,
} from '../../../services/api.producto.services';
import { NgForm } from '@angular/forms';
import { _ } from 'underscore';

@Component({
  selector: 'app-newfactura',
  templateUrl: './newfactura.component.html',
  styleUrls: ['./newfactura.component.css'],
  providers: [Client, NgForm],
})
export class NewfacturaComponent implements OnInit {
  facturaProducModal: boolean = false;
  facturaBase: FacturasBase = new FacturasBase();
  newProduct: ProductosBase = new ProductosBase();
  productSelected: ProductosBase = new ProductosBase();
  newProduct1: ProductosBase[] = [];
  clientSelected: ClientesBase = new ClientesBase();
  clienteBase: ClientesBase[] = [];
  empleadoSelected: EmpleadosBase = new EmpleadosBase();
  empleadoBase: EmpleadosBase[] = [];
  facturasProd: FacturasProductosRequestDTO = new FacturasProductosRequestDTO();
  detalleFactura: FacturasProductosRequestDTO[] = [];
  facturasProdModal: FacturasProductosRequestDTO = new FacturasProductosRequestDTO();

  textProductQuery: string = '';
  results: ProductosBase[] = [];
  results1: ClientesBase[] = [];
  iva: number;
  totalN: number;

  search(inputquery: any) {
    this.results = this.newProduct1.filter((x) =>
      x.nombre?.toUpperCase().includes(inputquery?.query?.toUpperCase())
    );
  }

  search1(inputquery: any) {
    this.results1 = this.clienteBase.filter((x) =>
      x.nombre?.toUpperCase().includes(inputquery?.query?.toUpperCase())
    );
  }
  constructor(
    private _client: Client,
    private toastr: ToastrService,
    public form: NgForm
  ) {
    this.facturaBase.total = 0;
  }

  ngOnInit(): void {
    this.getAllProductos();
    this.getAllClientes();
    this.getAllEmpleado();
  }

  getAllProductos() {
    this._client.productoAll().subscribe((data: any) => {
      this.newProduct1 = data;
    });
  }
  getAllClientes() {
    this._client.clienteAll().subscribe((data: any) => {
      this.clienteBase = data;
    });
  }

  getAllEmpleado() {
    this._client.empleadoAll().subscribe((data: any) => {
      this.empleadoBase = data;
    });
  }

  addToProductList(form: NgForm) {
    if(form.invalid){
      this.toastr.warning('Todos los campos son obligatorios', 'ALERTA', {
        positionClass: 'toast-top-left',
      });
    }
    else{
      let searchResult = this.detalleFactura.filter(
        (c) => c.productosId === this.facturasProd.productosId
      );

      if (searchResult.length > 0) {
        this.toastr.warning('El producto ya existe', 'ALERTA', {
          positionClass: 'toast-bottom-left',
        });
        return;
      }
      this.detalleFactura.push(this.facturasProd.clone());
      this.setFacturaTotal();
    }
  }
  setFacturaTotal() {
    this.facturaBase.total = 0;
    this.detalleFactura.forEach((x) => {
    this.facturaBase.total += x.cantidad * x.precio;
    this.iva = this.facturaBase.total * 0.19
    this.totalN = this.facturaBase.total - this.iva;
    });
  }

  buscarProduct(event) {
    this.facturasProd.nombreProducto = this.newProduct1.find(
      (e) => e.id === parseInt(event.target.value)
    )?.nombre;
    /* console.log(event.target.value);  */
  }

  deleteDetalleFactura(item: FacturasProductosBase) {
    // this.facturaBase.total -= item?.cantidad * item?.precio;
    this.detalleFactura = this.detalleFactura.filter(
      (c) => c.productosId !== item.productosId
    );
    this.setFacturaTotal();
  }
  abrirEditDetalle(item: FacturasProductosRequestDTO) {
    this.facturaProducModal = true;
    this.facturasProdModal = item.clone();
    this.updateDetalle(this.facturasProdModal);
  }
  updateDetalle(facturasProdModal: FacturasProductosRequestDTO) {
    let resultado = this.detalleFactura.find(
      (c) => c.productosId === this.facturasProdModal.productosId
    );
    resultado.cantidad = facturasProdModal.cantidad;
    resultado.precio = facturasProdModal.precio;
    this.setFacturaTotal();
  }
  saveFactura() {
    this.facturaBase.facturasProductos = this.detalleFactura;
    this._client.creacionDetalleFactura(this.facturaBase).subscribe(
      (data: any) => {
        this.toastr.success('Factura guardada', 'EXCELENTE', {
          positionClass: 'toast-bottom-right',
        });
        console.log(this.facturaBase);
        console.log(this.detalleFactura);
      },
      (error) => {
        this.toastr.warning('Error al guardar factura', 'ERROR', {
          positionClass: 'toast-bottom-right',
        });
        console.log(error);
      }
    );
  }
}

/*  addToProductList() {
    const facturasProd = new FacturasProductosRequestDTO();
    facturasProd.cantidad = this.productSelected.cantidad;
    facturasProd.precio = this.productSelected.precioVenta;
    facturasProd.productosId = this.productSelected.id;
    facturasProd.nombreProducto = this.productSelected.nombre;
    if (this.facturaBase.facturasProductos === undefined) this.facturaBase.facturasProductos = [];
    this.facturaBase.facturasProductos.push(facturasProd);

  } */
