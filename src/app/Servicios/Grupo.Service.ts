import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Grupo } from '../clases/grupo';
import { listadoGrupo } from '../clases/grupo';

@Injectable()
export class GrupoServicio {
  private headers = new Headers({'Content-Type': 'application/json'});
  private gruposUrl = 'http://localhost:7080/ServerOptimizacionCompras/web/index.php/grupos';  

  constructor(private http: Http) {}

    public filtrarGrupos (event:any,codigo:any, descripcion:any,seleccion:any,numeroSolped:any,posicion:any): Promise<listadoGrupo> {
    if (seleccion ==2)
    {
    return this.http.get(this.gruposUrl.concat("/filtrar").concat("?page=").concat(event).concat("&codigo=").concat(codigo).concat("&descripcion=").concat(descripcion))
               .toPromise()
               .then(response => response.json() as listadoGrupo);}
      return this.http.get(this.gruposUrl.concat("/filtrar").concat("?page=").concat(event).concat("&codigo=").concat(codigo).concat("&descripcion=").concat(descripcion)
                            .concat("&seleccion=").concat(seleccion)
                            .concat("&numeroSolped=").concat(numeroSolped)
                            .concat("&posicion=").concat(posicion)
                           )
               .toPromise()
               .then(response => response.json() as listadoGrupo);
               
    }

    public filtrarGrupoSol (event:any,codigo:any, descripcion:any ): Promise<listadoGrupo> {
       return this.http.get(this.gruposUrl.concat("/list").concat("?page=").concat(event).concat("&codigo=").concat(codigo).concat("&descripcion=").concat(descripcion))
               .toPromise()
               .then(response => response.json() as listadoGrupo);
               
    }

	
  	public  seleccionarGrupo(numeroSolped:any,posicion:any, idGrupo:any):Promise<void>
  	{ 
     
      return this.http
            .post(this.gruposUrl.concat("/asociar"),JSON.stringify({numeroSolped : numeroSolped,
                                                                    posicion     : posicion,
                                                                    idGrupo      : idGrupo }),{headers: this.headers})
                                                                    .toPromise()
                                                                    .then((res) => res.json())
                                                      .catch(this.handleError);




    }
     private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

    public  eliminarGrupo(reg:Grupo):void
    { 


    }
     public  actualizarGrupo(reg:Grupo):void
    { }
}

