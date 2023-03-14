import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from './Pages/home/home.component';
import { MenuComponent } from './Pages/menu/menu.component';
import { ModuloVentasComponent } from './Pages/modulo-ventas/modulo-ventas.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegistoComponent } from './Pages/registo/registo.component';
import { AvisoComponent } from './Pages/aviso/aviso.component';
import { NuevoProComponent } from './Pages/nuevo-pro/nuevo-pro.component';
import { NuevaCatComponent } from './Pages/nueva-cat/nueva-cat.component';
import { InventarioComponent } from './Pages/inventario/inventario.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    ModuloVentasComponent,
    LoginComponent,
    RegistoComponent,
    AvisoComponent,
    NuevaCatComponent,
    NuevoProComponent,
    InventarioComponent,
    FilterPipe
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule,HttpClientModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
