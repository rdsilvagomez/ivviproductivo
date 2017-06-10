import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { response   }      from '../clases/response';
import 'rxjs/add/operator/toPromise';
import { listadoSolpedDisponible } from '../clases/SolpedDisponible';
import { SolpedDisponible  }      from '../clases/SolpedDisponible';
import { listadoSequencia  }      from '../clases/sequencia';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { utilService }                from '../Servicios/util';
@Injectable()
export class SolpedDisponibleServicio {

  private headers = new Headers({'Content-Type': 'application/json'});
  private solpedDisponibleUrl :string ;   

  constructor(private http: Http,utilSrv :utilService) { 
  this.solpedDisponibleUrl= utilSrv.rutaServicio.concat("/posicionesDisponibles"); 
  }

  getSolpedDisponibles(event:any,solped:any,posicion:any ): Observable<listadoSolpedDisponible> {
    return this.http.get(this.solpedDisponibleUrl.concat("/list").concat("?page=").concat(event).concat("&solped=").concat(solped).concat("&posicion=").concat(posicion))
               .map(response => response.json() as listadoSolpedDisponible);
               
  }
  public SolicitarCotizacion ( listado:SolpedDisponible[],informacion: string ,esmanual : number ):Observable<response>
  {
   

  	return this.http
            .post(this.solpedDisponibleUrl.concat("/solicitarcot"),JSON.stringify({listado:listado,informacion: informacion,esmanual:esmanual}),{headers: this.headers})
                                                                    .map((res) => res.json() as response)
                                                                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

	}

  public SincronizarPosiciones():Observable<response>
  {
      return this.http.get(this.solpedDisponibleUrl.concat("/sincposlibres"))
                                                                     .map((res) => res.json() as response)
                                                                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }
  public getSequenciaManual(): Observable<listadoSequencia>
  {
   return this.http.get(this.solpedDisponibleUrl.concat("/sequencia"))
                                                                     .map((res) => res.json() as listadoSequencia);

  }

}