import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule}       from '@ng-bootstrap/ng-bootstrap';
import { AppComponent }  from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule }    from '@angular/http';
 

import {seleccionarGrupo}      from './componentes/seleccionarGrupo/seleccionarGrupo';
import {seleccionarGrupoContent}      from './componentes/seleccionarGrupo/seleccionarGrupo';

import {habilitacionItems} 		  from './componentes/habilitacionItems/HabilitacionItems';
import {listadoSolpedDisponibles} from './componentes/listadoSolpedDisponibles/listadoSolpedDisponibles';
import { SolpedDisponibleServicio }          from './Servicios/SolpedDisponible.Service';
 
import { GrupoServicio }    from './Servicios/Grupo.Service';
import {listadoGrupos} from './componentes/grupos/grupos';


import { ProveedorServicio }    from './Servicios/proveedor.Service';
import {listadoProveedores}           from './componentes/proveedores/proveedor';


import {solicitudCotizacion} from './componentes/solicitudCotizacion/solicitudCotizacion';
import { SolicitudCotServicio }    from './Servicios/SolicitudCot.Service';
import {SpinnerComponent} from './componentes/spinner/SpinnerComponent'; 
import {login} from './componentes/login/login';
import { loginServicio }    from './Servicios/login.service';
import { AuthGuard } from './_guards/auth.guard';
import { FormsModule ,ReactiveFormsModule }   from '@angular/forms';
import {LocalStorageService} from   './Servicios/localstorage.service';
import {asociacionServicio}  from   './Servicios/asociacion';
import {asociacion} from  './componentes/asociacion/asociacion'; 

import {seleccionarProveedor}     from './componentes/seleccionarProveedor/seleccionarProveedor';
import {seleccionarProveedorContent}     from './componentes/seleccionarProveedor/seleccionarProveedor';

import {principal}     from './componentes/principal/principal';

import {utilService}  from   './Servicios/util';

import {filtros}     from './componentes/filtros/filtros'; 
import {filtroServicio}  from   './Servicios/filtros';

  const routes: Routes = [ { path: 'habilitacion'     , component:habilitacionItems   , canActivate: [AuthGuard]     },
                           { path: 'filtros'          , component:filtros   ,           canActivate: [AuthGuard]     },
                           { path: 'asociacion'       , component:asociacion   ,        canActivate: [AuthGuard]     },
            						   { path: 'grupos'           , component:listadoGrupos       , canActivate: [AuthGuard]     },
            						   { path: 'proveedores'      , component:listadoProveedores  , canActivate: [AuthGuard]     },
            						   { path: 'solcotizacion'    , component:solicitudCotizacion , canActivate: [AuthGuard]     },
                           { path: 'login'            , component:login                                              },
                          /* { path: 'principal'        , component:principal           , canActivate: [AuthGuard]   },*/
            						   { path: '**'                ,redirectTo: 'habilitacion'          }  
  							];  
@NgModule({
  imports:      [RouterModule.forRoot(routes),HttpModule ,NgbModule.forRoot(), BrowserModule,FormsModule,ReactiveFormsModule  /*,CustomFormsModule */],
  declarations: [ AppComponent,habilitacionItems,listadoSolpedDisponibles ,listadoGrupos,listadoProveedores ,solicitudCotizacion,login ,SpinnerComponent,seleccionarGrupoContent,seleccionarGrupo,asociacion,seleccionarProveedorContent,seleccionarProveedor,principal,filtros],
    entryComponents: [seleccionarGrupoContent,seleccionarProveedorContent,seleccionarProveedor],
  bootstrap:    [ AppComponent   ],
  providers :   [SolpedDisponibleServicio ,GrupoServicio,ProveedorServicio,SolicitudCotServicio,loginServicio,AuthGuard,LocalStorageService,asociacionServicio,utilService,filtroServicio ]
})
export class AppModule { }
