import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListaComponent } from './cliente/lista/lista.component';
import { TemplateComponent } from './template/template/template.component';
import { ListaproductoComponent } from './producto/listaproducto/listaproducto.component';
import { ListaproveedorComponent } from './proveedor/listaproveedor/listaproveedor.component';
import { ListausuarioComponent } from './usuario/listausuario/listausuario.component';
import { ListaingresoComponent } from './ingreso/lista/listaingreso.component';
import { ListaegresoComponent } from './egreso/listaegreso/listaegreso.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
    path: '', component: LoginComponent
  },

  {


    path: 'template', component: TemplateComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'cliente', component: ListaComponent
      },

      {
        path: 'producto', component: ListaproductoComponent
      },

      {
        path: 'proveedor', component: ListaproveedorComponent
      },

      {
        path: 'usuario', component: ListausuarioComponent
      },

      {
        path: 'ingreso', component: ListaingresoComponent
      },

      {
        path: 'egreso', component: ListaegresoComponent
      },


      {
        path: '**', component: NotFoundComponent
      }



    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
