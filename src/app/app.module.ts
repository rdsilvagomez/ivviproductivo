import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule}       from '@ng-bootstrap/ng-bootstrap';
import { AppComponent }  from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule }    from '@angular/http';
import {habilitacionItems} 		  from './componentes/habilitacionItems/HabilitacionItems';
import {listadoSolpedDisponibles} from './componentes/listadoSolpedDisponibles/listadoSolpedDisponibles';
import { SolpedDisponibleServicio }          from './Servicios/SolpedDisponible.Service';

import { GrupoServicio }    from './Servicios/Grupo.Service';
import {listadoGrupos} from './componentes/grupos/grupos';


import { ProveedorServicio }    from './Servicios/proveedor.Service';
import {listadoProveedores}           from './componentes/proveedores/proveedor';


import {solicitudCotizacion} from './componentes/solicitudCotizacion/solicitudCotizacion';
import { SolicitudCotServicio }    from './Servicios/SolicitudCot.Service';


import {login} from './componentes/login/login';
import { loginServicio }    from './Servicios/login.service';

import { AuthGuard } from './_guards/auth.guard';

import { FormsModule }   from '@angular/forms';

 /* const routes=[] ;   */
  const routes: Routes = [ { path: 'habilitacion'     , component:habilitacionItems   , canActivate: [AuthGuard]    },
            						   { path: 'grupos'           , component:listadoGrupos       , canActivate: [AuthGuard]     },
            						   { path: 'proveedores'      , component:listadoProveedores  , canActivate: [AuthGuard]      },
            						   { path: 'solcotizacion'    , component:solicitudCotizacion , canActivate: [AuthGuard]     },
                           { path: 'login'            , component:login                                              },
            						   { path: '**'               , redirectTo: ''             }
  							];  
@NgModule({
  imports:      [RouterModule.forRoot(routes),HttpModule ,NgbModule.forRoot(), BrowserModule,FormsModule ],
  declarations: [ AppComponent,habilitacionItems,listadoSolpedDisponibles ,listadoGrupos,listadoProveedores ,solicitudCotizacion,login ],
  bootstrap:    [ AppComponent   ],
  providers :   [SolpedDisponibleServicio ,GrupoServicio,ProveedorServicio,SolicitudCotServicio,loginServicio,AuthGuard ]
})
export class AppModule { }
