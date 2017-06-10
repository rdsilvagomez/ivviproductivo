import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Proveedor } from '../clases/proveedor';
import { listadoProveedor } from '../clases/proveedor';

@Injectable()
export class ProveedorServicio {

private headers = new Headers({'Content-Type': 'application/json'});
private proveedorUrl = 'http://localhost:7080/ServerOptimizacionCompras/web/index.php/proveedor';  

  constructor(private http: Http) {}

    public filtrarProveedores (event:any,codigo:any, descripcion:any, seleccion:any,grupoid:any): Promise<listadoProveedor> {
    return this.http.get(this.proveedorUrl.concat("/filtrar").concat("?page=").concat(event).concat("&codigo=").concat(codigo).concat("&descripcion=").concat(descripcion)
    	.concat("&seleccion=").concat(seleccion).concat("&grupoid=").concat(grupoid))
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
         private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}