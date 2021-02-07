
  import { Component, OnInit } from '@angular/core';
  import { Client, EmpresasBase} from '../../../services/api.producto.services';
  import { ToastrService } from 'ngx-toastr';
  import { NgForm } from '@angular/forms';
  
  @Component({
    selector: 'app-datos',
    templateUrl: './datos.component.html',
    styleUrls: ['./datos.component.css'],
    providers: [Client, NgForm],
  })
  export class DatosComponent implements OnInit {
    displayModal: boolean = false;
    empresa: EmpresasBase = new EmpresasBase();
    empresas: EmpresasBase[] = [];
    empresadialog: EmpresasBase = new EmpresasBase();
  
    constructor(private toastr: ToastrService,
                private _client: Client,
                public form: NgForm) { }
  
    ngOnInit() {
      this.getAllEmpresa();
    }
  
    getAllEmpresa() {
      this._client.empresaAll().subscribe(
        (data: any) => {
          this.empresas = data;
        },
        (error) => {
          this.toastr.warning('No se encontron datos ', 'ERROR', {
            positionClass: 'toast-bottom-center',
          });
        }
      );
    }
  
    guardarDatos(form: NgForm) {
      if (form.invalid) {
        this.toastr.warning('Todos los campos son obligatorios', 'CAMPOS OBLIGATORIOS', {
          positionClass: 'toast-bottom-right',
        });
      }
      else {
        this._client.empresa(this.empresa).subscribe(
          (data: any) => {
            this.getAllEmpresa();
            this.toastr.success('Datos guardados exitosamente', 'GUARDADO', {
              positionClass: 'toast-bottom-right',
            });
          },
          (error: any) => {
            this.toastr.warning('Datos sin guardar', 'ERROR', {
              positionClass: 'toast-bottom-right',
            });
          }
        );
      }
    }
  
    openEditEmpresa(item: EmpresasBase) {
      this.displayModal = true;
      this.empresadialog.id          = item.id;
      this.empresadialog.nombre      = item.nombre;
      this.empresadialog.nit         = item.nit;
      this.empresadialog.propietario = item.propietario;
      this.empresadialog.telefono    = item.telefono;
      this.empresadialog.email       = item.email;
      this.empresadialog.direccion   = item.direccion;
    }
  
    saveEditEmpresa() {
      this._client.empresa2(this.empresadialog.id, this.empresadialog).subscribe((data: any) => {
        this.getAllEmpresa();
        this.toastr.success('Datos actualizados exitosamente', 'ACTUALIZADO', {
          positionClass: 'toast-bottom-right',
        });
      },
      (error: any) => {
        this.toastr.warning('Error al editar los datos ', 'ERROR', {
          positionClass: 'toast-bottom-right',
        });
      }
      )
    }
  
    eliminarEmpresa(item: EmpresasBase) {
      this._client.empresa4(item.id).subscribe(
        (data: any) => {
          this.getAllEmpresa();
          this.toastr.success(
            'Datos eliminados exitosamente',
            'ELIMINADO',
            {
              positionClass: 'toast-bottom-right',
            }
          );
        },
        (error: any) => {
          this.toastr.warning('No se eliminaron los datos ', 'ERROR', {
            positionClass: 'toast-bottom-right',
          });
        }
      );
    }
  }

