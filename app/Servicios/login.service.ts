import { Injectable }                 from '@angular/core';
import { Headers, Http }              from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { response }                   from '../clases/response';
import { listadoUsuario }             from '../clases/login';
import { Observable }                 from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { utilService }                from '../Servicios/util';

@Injectable()
export class loginServicio {
	    private headers = new Headers({'Content-Type': 'application/json'});
      private loginUrl :string ; /*= 'http://localhost:7080/ServerOptimizacionCompras/web/index.php/login';  */
        constructor(private http: Http,utilSrv :utilService) { 
        this.loginUrl= utilSrv.rutaServicio.concat("/login"); 
        }
      getAutorizacionLogin(username:string, pwd: string) :Observable<listadoUsuario>
      {
      	return this.http
            .post(this.loginUrl.concat("/validarlogin"),JSON.stringify({username:username,password:pwd,rememberMe:true}),{headers: this.headers})
                                                                    .map(response => response.json() as listadoUsuario);
                                                                    


      }
       
  logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}