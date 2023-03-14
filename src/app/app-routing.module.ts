import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './Pages/home/home.component';
import { ModuloVentasComponent } from './Pages/modulo-ventas/modulo-ventas.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegistoComponent } from './Pages/registo/registo.component';
import { AvisoComponent } from './Pages/aviso/aviso.component';
import { NuevoProComponent } from './Pages/nuevo-pro/nuevo-pro.component';
import { NuevaCatComponent } from './Pages/nueva-cat/nueva-cat.component';
import { InventarioComponent } from './Pages/inventario/inventario.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Ventas', component: ModuloVentasComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Registro', component: RegistoComponent },
  { path: 'Aviso', component: AvisoComponent },
  { path: 'Nuevo', component: NuevoProComponent },
  { path: 'Nueva', component: NuevaCatComponent },
  { path: 'Inventario', component: InventarioComponent },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
