import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { listadoSolpedDisponible } from '../clases/SolpedDisponible';
import { SolpedDisponible  }      from '../clases/SolpedDisponible';
@Injectable()
export class SolpedDisponibleServicio {

  private headers = new Headers({'Content-Type': 'application/json'});
  private solpedDisponibleUrl = 'http://localhost:7080/ServerOptimizacionCompras/web/index.php/posicionesDisponibles';  

  constructor(private http: Http) { }

  getSolpedDisponibles(event:any,solped:any,posicion:any ): Promise<listadoSolpedDisponible> {
    return this.http.get(this.solpedDisponibleUrl.concat("/list").concat("?page=").concat(event).concat("&solped=").concat(solped).concat("&posicion=").concat(posicion))
               .toPromise()
               .then(response => response.json() as listadoSolpedDisponible);
               
  }
  public SolicitarCotizacion ( listado:SolpedDisponible[]):Promise<void>
  {
   

  	return this.http
            .post(this.solpedDisponibleUrl.concat("/solicitarcot"),JSON.stringify(listado),{headers: this.headers})
                                                                    .toPromise()
                                                                    .then((res) => res.json());

	}

}