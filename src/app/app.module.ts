import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ToastrModule } from 'ngx-toastr';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { DropdownModule } from 'primeng/dropdown';

import { AppComponent } from './app.component';
import { ProductosComponent } from './components/productos/productos.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FacturaComponent } from './components/factura/factura.component';
import { FooterComponent } from './components/footer/footer.component';
import { NewfacturaComponent } from './components/factura/newfactura/newfactura.component';
import { DatosComponent } from './components/navbar/datos/datos.component';
import { UsuariosComponent } from './components/navbar/usuarios/usuarios.component';
import { ClientesComponent } from './components/navbar/clientes/clientes.component';
import { CustomMatPaginatorIntl } from './components/productos/pagination-es';

//rutas
import { ROUTES } from './app.routes';

import { API_BASE_URL } from './services/api.producto.services';
import EnviromentVariables from 'src/environments/enviroment-variables';

//pipes
import { CapitalizadoPipe } from './pipes/capitalizado.pipe';
import { PaginationPipe } from './pipes/pagination.pipe';
import { FiltroProductoPipe } from './pipes/filtro-producto.pipe';
import { ContrasenaPipe } from './pipes/contrasena.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    NavbarComponent,
    FacturaComponent,
    FooterComponent,
    NewfacturaComponent,
    DatosComponent,
    UsuariosComponent,
    ClientesComponent,
    CapitalizadoPipe,
    PaginationPipe,
    FiltroProductoPipe,
    ContrasenaPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastModule,
    DialogModule,
    FormsModule,
    TableModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    FormsModule,
    DropdownModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    ToastrModule.forRoot(),
    AutoCompleteModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
    { provide: API_BASE_URL, useValue: EnviromentVariables.API_URL },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
