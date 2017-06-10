import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
 
import { response } from '../clases/response';
@Injectable()
export class loginServicio {
	  private headers = new Headers({'Content-Type': 'application/json'});
      private loginUrl = 'http://localhost:7080/ServerOptimizacionCompras/web/index.php/login';  
        constructor(private http: Http) { }
      getAutorizacionLogin(username:string, pwd: string) :Promise<response>
      {
      	return this.http
            .post(this.loginUrl.concat("/validarlogin"),JSON.stringify({username:username,password:pwd,rememberMe:true}),{headers: this.headers})
                                                                    .toPromise()
                                                                    .then((res) => res.json() as response) ;


      }
       

}