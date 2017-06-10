import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Grupo } from '../clases/grupo';
import { listadoGrupo } from '../clases/grupo';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { utilService }                from '../Servicios/util';
@Injectable()
export class GrupoServicio {
  private headers = new Headers({'Content-Type': 'application/json'});
  private gruposUrl :string;  

  constructor(private http: Http,utilSrv :utilService) {
      this.gruposUrl= utilSrv.rutaServicio.concat("/grupos"); 

  }

    public filtrarGrupos (event:any,codigo:any, descripcion:any,seleccion:any,numeroSolped:any,posicion:any): Observable<listadoGrupo> {
    if (seleccion ==2)
    {
    return this.http.get(this.gruposUrl.concat("/filtrar").concat("?page=").concat(event).concat("&codigo=").concat(codigo).concat("&descripcion=").concat(descripcion))
               .map(response => response.json() as listadoGrupo);
    }
      return this.http.get(this.gruposUrl.concat("/filtrar").concat("?page=").concat(event).concat("&codigo=").concat(codigo).concat("&descripcion=").concat(descripcion)
                            .concat("&seleccion=").concat(seleccion)
                            .concat("&numeroSolped=").concat(numeroSolped)
                            .concat("&posicion=").concat(posicion)
                           )
               .map(response => response.json() as listadoGrupo);
               
    }

    public filtrarGrupoSol (event:any,codigo:any, descripcion:any ): Promise<listadoGrupo> {
       return this.http.get(this.gruposUrl.concat("/list").concat("?page=").concat(event).concat("&codigo=").concat(codigo).concat("&descripcion=").concat(descripcion))
               .toPromise()
               .then(response => response.json() as listadoGrupo);
               
    }

	
    public ingresarGrupo(descripcion: string) : Promise <void>
    {
    
     return this.http
            .post(this.gruposUrl.concat("/crear"),JSON.stringify({descripcion : descripcion  }),{headers: this.headers})
                                                                    .toPromise()
                                                                    .then((res) => res.json())
                                                      .catch(this.handleError);

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

    public  eliminarGrupo(reg:Grupo):Promise<void>
    { 
     return this.http
            .post(this.gruposUrl.concat("/eliminar/"),JSON.stringify({id : reg.id  }),{headers: this.headers})
                                                                    .toPromise()
                                                                    .then((res) => res.json())
                                                      .catch(this.handleError);

    }
     public  actualizarGrupo(reg:Grupo):Promise<void>
    {

        return this.http
            .post(this.gruposUrl.concat("/actualizar/"),JSON.stringify({ id          : reg.id ,
                                                                         descripcion : reg.descripcion }),
                                                                         {headers: this.headers})
                                                                    .toPromise()
                                                                    .then((res) => res.json())
                                                      .catch(this.handleError);

     }
}

