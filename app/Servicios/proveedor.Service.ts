import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Proveedor } from '../clases/proveedor';
import { listadoProveedor } from '../clases/proveedor';
import { utilService }                from '../Servicios/util';
@Injectable()
export class ProveedorServicio {

private headers = new Headers({'Content-Type': 'application/json'});
private proveedorUrl :string ; 

  constructor(private http: Http,utilSrv :utilService) {
   this.proveedorUrl= utilSrv.rutaServicio.concat("/proveedor");

  }

    public filtrarProveedores (event:any,codigo:any, descripcion:any, seleccion:any,grupoid:any): Promise<listadoProveedor> {
    return this.http.get(this.proveedorUrl.concat("/filtrar").concat("?page=").concat(event).concat("&codigo=").concat(codigo).concat("&descripcion=").concat(descripcion)
    	.concat("&seleccion=").concat(seleccion).concat("&grupoid=").concat(grupoid))
               .toPromise()
               .then(response => response.json() as listadoProveedor);
               
    }
 
       public filtrarProveedoresXposicion (    event: any,
                                              codigo: any, 
                                           seleccion: any,
                                              descripcion : string,
                                     numeroSolped   : string,
                                        posicion    : string,
                                        asociar:any
                                        ):Promise<listadoProveedor> {
   
    return this.http.get(this.proveedorUrl.concat("/filtrarposicion")
    .concat("?page=").concat(event)
    .concat("&codigo=").concat(codigo)
    .concat("&descripcion=").concat(descripcion)
    .concat("&seleccion=").concat(seleccion)
    .concat("&numeroSolped=").concat(numeroSolped) 
    .concat("&posicion=").concat(posicion)
    .concat("&asociar=").concat(asociar))
               .toPromise()
               .then(response => response.json() as listadoProveedor);
               
    }


  	public  asociarGrupo(idProveedor:any, idGrupo:any):Promise<void>
  	{ 
     
      return this.http
            .post(this.proveedorUrl.concat("/asociar"),JSON.stringify({idProveedor : idProveedor,
                                                                    idGrupo     : idGrupo  }),{headers: this.headers})
                                                                    .toPromise()
                                                                    .then((res) => res.json())
                                                      .catch(this.handleError);




    }


        public  asociarPosicion(idProveedor: any, 
                               numeroSolped: any,
                               posicion    : any,
                               asociar  : any):Promise<void>
    { 
     
      return this.http
            .post(this.proveedorUrl.concat("/asociarposicion"),JSON.stringify({ 
                                                                                  idProveedor   : idProveedor,
                                                                                  numeroSolped  : numeroSolped,
                                                                                  posicion      : posicion,
                                                                                  asociar    : asociar
                                                                                }),{headers: this.headers})
                                                                    .toPromise()
                                                                    .then((res) => res.json())
                                                      .catch(this.handleError);




    }

         private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}