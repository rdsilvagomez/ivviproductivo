import { Injectable }             			from '@angular/core';
import { Headers, Http }          			from '@angular/http';
import { response   }            	 		from '../clases/response';
import 'rxjs/add/operator/toPromise';
import { Observable }                 		from 'rxjs/Observable';
import { listadoSolicitudCotizacionSapCab           } from '../clases/asociacion';
import {listadoSolicitudCotizacionSapCue            } from '../clases/asociacion';
import {SolicitudCotizacionSapCue}					  from '../clases/asociacion';
import { utilService }                				  from '../Servicios/util';
import { listadoFiltro           } 					  from '../clases/filtros';
import { filtro           } 					  from '../clases/filtros';
import 'rxjs/add/operator/map';
@Injectable()
export class filtroServicio {
  private headers = new Headers({'Content-Type': 'application/json'});
  private ServicioUrl:string ="";  
    		  constructor(private http: Http,utilSrv :utilService) {
    		  	this.ServicioUrl= utilSrv.rutaServicio; 

    		   }

    		   getFiltro() :Observable<listadoFiltro>
    		   {
    		   		return this.http.get(this.ServicioUrl.concat("/filtrousuario/filtrar")).map(response=>response.json() as listadoFiltro); 
			   }

			   actualizarFiltro(reg:filtro ): Observable<response>
			   {
			   	   return this.http.post(this.ServicioUrl.concat("/filtrousuario/actualizar"),JSON.stringify(reg)).map(response=>response.json() as response); 


			   }

}