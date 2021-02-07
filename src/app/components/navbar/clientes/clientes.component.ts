import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Client, ClientesBase, ClientesUpdateRequestDTO } from '../../../services/api.producto.services';
import { PageEvent } from '@angular/material/paginator';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [Client, NgForm],
})
export class ClientesComponent implements OnInit {
  submitted = false;
  display: boolean = false;
  displayModal: boolean = false;
  cliente1: ClientesBase = new ClientesBase();
  clientes2: ClientesBase[] = [];
  clientedialog: ClientesUpdateRequestDTO = new ClientesUpdateRequestDTO();

  page_size: any = 5;
  page_number: number = 1;
  pageSizeOptions = [5, 10]

  constructor(private toastr: ToastrService,
              private _client: Client,
              public form: NgForm) { }

  ngOnInit(): void {
    this.getAllCliente();
  }

  getAllCliente() {
    this._client.clienteAll().subscribe(
      (data: any) => {
        this.clientes2 = data;
      },
      (error) => {
        this.toastr.warning('No se encontron datos ', 'ERROR', {
          positionClass: 'toast-bottom-right',
        });
      }
    );
  }

  saveCliente(form: NgForm) {
    if (form.invalid) {
      this.toastr.warning('Todos los campos son obligatorios', 'COMPLETAR CAMPOS', {
        positionClass: 'toast-bottom-right',
      });
    }
    else {
      this._client.cliente(this.cliente1).subscribe(
        (data: any) => {
          this.getAllCliente();
          this.toastr.success('Cliente guardado con exito', 'GUARDADO', {
            positionClass: 'toast-bottom-right',
          });
        },
        (error: any) => {
          this.toastr.warning('Fallo al guardar', 'ERROR', {
            positionClass: 'toast-bottom-right',
          });
        }
      );
    }
  }

  deleteCliente(item: ClientesBase) {
    this._client.cliente4(item.id).subscribe(
      (data: any) => {
        this.getAllCliente();
        this.toastr.success('Cliente eliminado con exito', 'ELIMINADO', {
          positionClass: 'toast-bottom-right',
        });
      },
      (error: any) => {
        this.toastr.warning('Fallo al eliminar', 'ERROR', {
          positionClass: 'toast-bottom-right',
        });
      }
    );
  }

  openEditCliente(item: ClientesUpdateRequestDTO) {
    this.displayModal            = true;
    this.clientedialog.id        = item.id;
    this.clientedialog.nombre    = item.nombre;
    this.clientedialog.apellido  = item.apellido;
    this.clientedialog.direccion = item.direccion;
    this.clientedialog.telefono  = item.telefono;
    this.clientedialog.email     = item.email;
  }

  saveEditCliente() {
    this._client.cliente2(this.clientedialog.id, this.clientedialog).subscribe((data) => {
      this.getAllCliente();
      this.toastr.success('Cliente actualizado con exito', 'ACTUALIZADO', {
        positionClass: 'toast-bottom-right',
      });
    },
    (error: any) => {
      this.toastr.warning('Fallo al actualizar', 'ERROR', {
        positionClass: 'toast-bottom-right',
      });
    }
    ) 
  }

  showDialog() {
    this.display = true;
  }

  limpiarDialog() {
    this.display           = false;
    this.cliente1.nombre    = '';
    this.cliente1.apellido  = '';
    this.cliente1.direccion = '';
    this.cliente1.telefono  = '';
    this.cliente1.email     = '';
  }

  handlePage(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }
}
