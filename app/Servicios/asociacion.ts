import { Injectable }             from '@angular/core';
import { Headers, Http }          from '@angular/http';
import { response   }             from '../clases/response';
import 'rxjs/add/operator/toPromise';
import { Observable }                 from 'rxjs/Observable';
import { listadoSolicitudCotizacionSapCab           } from '../clases/asociacion';
import {listadoSolicitudCotizacionSapCue            } from '../clases/asociacion';
import {SolicitudCotizacionSapCue}from '../clases/asociacion';
import { utilService }                from '../Servicios/util';
import 'rxjs/add/operator/map';
@Injectable()
export class asociacionServicio {
  private headers = new Headers({'Content-Type': 'application/json'});
  private solicitudCotizacionesUrl:string ;  
    		  constructor(private http: Http,utilSrv :utilService) {
    		  	this.solicitudCotizacionesUrl= utilSrv.rutaServicio; 

    		   }
			  getSolicitudCotEncabezado():Observable<listadoSolicitudCotizacionSapCab>
			  {
			    return this.http.get(this.solicitudCotizacionesUrl.concat("/solicitudcotizacionsap/listarmansinasoc"))
			               .map(response => response.json() as listadoSolicitudCotizacionSapCab);
			  }

				getSolicitudCotdetalle(idencabezado:string): Observable<listadoSolicitudCotizacionSapCab>
			  {
			 		return this.http.get(this.solicitudCotizacionesUrl.concat("/solicitudcotizacionsap/listarmansinasocdet").concat("?idencabezado=").concat(idencabezado))
			               .map(response => response.json() as listadoSolicitudCotizacionSapCue);
			  }
			  guardarAsociacion(listado: SolicitudCotizacionSapCue[]):Observable<response>
			  {
 				return this.http.post(this.solicitudCotizacionesUrl.concat("/solicitudcotizacionsap/guardarasoc"),
 						JSON.stringify({listado:listado }),{headers: this.headers})
			               .map(response => response.json() as response);

			  }


	}