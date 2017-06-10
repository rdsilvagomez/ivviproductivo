import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { SolicitudCotizacionCab } from '../clases/solicitudcotizaciones';
import { listadoSolCotCab  }      from '../clases/solicitudcotizaciones';
import { SolicitudCotizacionDetalle } from '../clases/solicitudcotizaciones';
import { listadoSolCotDet           } from '../clases/solicitudcotizaciones';
@Injectable()
export class SolicitudCotServicio {
  private headers = new Headers({'Content-Type': 'application/json'});
  private solicitudCotizacionesUrl = 'http://localhost:7080/ServerOptimizacionCompras/web/index.php';  

  constructor(private http: Http) { }

  getSolicitudCotEncabezado():Promise<listadoSolCotCab>
  {
    return this.http.get(this.solicitudCotizacionesUrl.concat("/solicitudcotizaciones"))
               .toPromise()
               .then(response => response.json() as listadoSolCotCab);
  }
  
  getSolicitudCotDetalle(idencabezado:any):Promise<listadoSolCotDet>
  {
    return this.http.get(this.solicitudCotizacionesUrl.concat("/solicitudcotizacionesdetalle/list").concat("?idencabezado=").concat(idencabezado))
               .toPromise()
               .then(response => response.json() as listadoSolCotDet);
  }

}