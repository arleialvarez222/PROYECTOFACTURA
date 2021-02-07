import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductosComponent } from './components/productos/productos.component';
import { FacturaComponent } from './components/factura/factura.component';
import { NewfacturaComponent } from './components/factura/newfactura/newfactura.component';
import { DatosComponent } from './components/navbar/datos/datos.component';
import { UsuariosComponent } from './components/navbar/usuarios/usuarios.component';
import { ClientesComponent } from './components/navbar/clientes/clientes.component';




export const ROUTES: Routes = [

    { path: '', redirectTo: 'productosComponent', pathMatch: 'full'},
    { path: 'navbar', component: NavbarComponent},
    { path: 'productos', component: ProductosComponent},
    { path: 'factura', component: FacturaComponent},
    { path: 'newfactura', component: NewfacturaComponent},
    { path: 'datos', component: DatosComponent},
    { path: 'usuarios', component: UsuariosComponent},
    { path: 'clientes', component: ClientesComponent},
    { path: '**', redirectTo: 'productosComponent', pathMatch: 'full'},
]