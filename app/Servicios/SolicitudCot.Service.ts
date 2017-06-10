import { Injectable }             from '@angular/core';
import { Headers, Http }          from '@angular/http';
import { response   }             from '../clases/response';
import 'rxjs/add/operator/toPromise';
import { SolicitudCotizacionCab } from     '../clases/solicitudcotizaciones';
import { listadoSolCotCab  }      from     '../clases/solicitudcotizaciones';
import { SolicitudCotizacionDetalle } from '../clases/solicitudcotizaciones';
import { listadoSolCotDet           } from '../clases/solicitudcotizaciones';
import { Observable }                 from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { utilService }                from '../Servicios/util';

@Injectable()
export class SolicitudCotServicio {
  private headers = new Headers({'Content-Type': 'application/json'});
  private solicitudCotizacionesUrl :string ; 

  constructor(private http: Http,utilSrv :utilService) {
this.solicitudCotizacionesUrl= utilSrv.rutaServicio; 
   }

  getSolicitudCotEncabezado():Observable<listadoSolCotCab>
  {
    return this.http.get(this.solicitudCotizacionesUrl.concat("/solicitudcotizaciones/list"))
               .map(response => response.json() as listadoSolCotCab);
  }
  
  getSolicitudCotDetalle(idencabezado:any):Observable<listadoSolCotDet>
  {
    return this.http.get(this.solicitudCotizacionesUrl.concat("/solicitudcotizacionesdetalle/list").concat("?idencabezado=").concat(idencabezado))
               .map(response => response.json() as listadoSolCotDet);
  }
 
  enviarCotizacionSap(listado:SolicitudCotizacionDetalle[],idSolicitudCotizacionCab: string):Observable<response>
  {
     return this.http.post(this.solicitudCotizacionesUrl.concat("/solicitudcotizacionsap/enviarcotsap")
           ,JSON.stringify({listado:listado,idSolicitudCotizacionCab: idSolicitudCotizacionCab}),{headers: this.headers})
                                                                     .map((res) => res.json() as response)
                                                                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  
  enviarCotizacionSapConArchivo(listado:SolicitudCotizacionDetalle[],idSolicitudCotizacionCab: string,file : File ):Observable<response>
  {
        let formData:FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        formData.append('listado',JSON.stringify(listado));
        formData.append('idSolicitudCotizacionCab',idSolicitudCotizacionCab);
        let headers = new Headers();
        headers.append('enctype', 'multipart/form-data');
        //headers.append('Content-Type', 'application/x-www-form-urlencoded'); 
        headers.append('Accept', 'application/json');
        
        return this.http.post(this.solicitudCotizacionesUrl.concat("/solicitudcotizacionsap/enviarcotsaparchivo"), formData , {headers:  headers})
            .map(res => res.json());
  }




}