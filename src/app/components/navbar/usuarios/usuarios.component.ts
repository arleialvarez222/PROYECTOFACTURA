import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Client, EmpleadosBase, EmpleadosUpdateRequestDTO } from '../../../services/api.producto.services';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [Client, NgForm],
})
export class UsuariosComponent implements OnInit {
  empleado: EmpleadosBase = new EmpleadosBase();
  empleados: EmpleadosBase[] = [];
  displayModal: boolean = false;
  displayEmpleado: boolean = false;
  empleadoDialog: EmpleadosUpdateRequestDTO = new EmpleadosUpdateRequestDTO();
  activar: boolean = true;

  constructor(private _client: Client,
              private toastr: ToastrService,
              public form: NgForm) { }

  ngOnInit() {
    this.getAllEmpleado();
  }

  getAllEmpleado() {
    this._client.empleadoAll().subscribe(
      (data: any) => {
        this.empleados = data;
      },
      (error) => {
        this.toastr.warning('No se encuentran los datos ', 'ERROR', {
          positionClass: 'toast-bottom-right',
        });
      }
    );
  }

  saveEmpleado(form: NgForm) {
    if (form.invalid) {
      this.toastr.warning('Todos los campos son obligatorios', 'COMPLETAR CAMPOS', {
        positionClass: 'toast-bottom-right',
      });
    }
    else {
      this._client.empleado(this.empleado).subscribe(
        (data: any) => {
          this.getAllEmpleado();
          this.toastr.success('Empleado se guardo con exito', 'GUARDADO', {
            positionClass: 'toast-bottom-right',
          });
        },
        (error) => {
          this.toastr.warning('Error al guardar', 'ERROR', {
            positionClass: 'toast-bottom-right',
          });
        }
      );
    }
   
  }

  deleteEmpleado(item: EmpleadosBase) {
    this._client.empleado4(item.id).subscribe(
      (data: any) => {
        this.getAllEmpleado();
        this.toastr.success('Empleado eliminado con exito', 'ELIMINADO', {
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

  openEditEmpleado(item:EmpleadosBase) {
    this.displayEmpleado           = true;
    this.empleadoDialog.id         = item.id;
    this.empleadoDialog.nombre     = item.nombre;
    this.empleadoDialog.apellido   = item.apellido;
    this.empleadoDialog.direccion  = item.direccion;
    this.empleadoDialog.telefono   = item.telefono;
    this.empleadoDialog.usuario    = item.usuario;
    this.empleadoDialog.contrasena = item.contrasena;
    this.empleadoDialog.empresaId  = item.empresaId;
  }

  saveEditEmpleado() {
    this._client.empleado2(this.empleadoDialog.id, this.empleadoDialog).subscribe((data) => {
      this.getAllEmpleado();
      this.toastr.success('Empleado actualizado con exito', 'ACTUALIZADO', {
        positionClass: 'toast-bottom-right',
      });
    },
      (error) => {
        this.toastr.warning('Error al actualizar', 'ERROR', {
          positionClass: 'toast-bottom-right',
        });
      }
    );

  }

  limpiarDialog() {
    this.displayModal        = false;
    this.empleado.nombre     = '';
    this.empleado.apellido   = '';
    this.empleado.direccion  = '';
    this.empleado.telefono   = '';
    this.empleado.usuario    = '';
    this.empleado.contrasena = '';
    this.empleado.empresaId  = 0;
  }

  showDialog() {
    this.displayModal = true;
  }
}
