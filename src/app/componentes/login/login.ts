
import { Component, OnInit, EventEmitter, Input, Output }           from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import usuario from '../../clases/login';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/of';
 
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { response }    from '../../clases/response';
import { loginServicio }    from '../../Servicios/login.service';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Component({
    moduleId: module.id,
   selector: 'login',
  templateUrl: '../../views/login/login.html'
       })



export class login implements OnInit {
   
   res :response; 
  constructor(private modalService: NgbModal , private lgnSrv : loginServicio,private router: Router) {}

   public login (usuario: string, pwd :string)
   {
	this.lgnSrv.getAutorizacionLogin(usuario,pwd).then(respuesta=> {
                                                                    this.res= respuesta ;
                                                                    if (this.res.success===true)
                                                                    {
                                                                      localStorage.setItem('currentUser', usuario);
                                                                       this.router.navigate(['habilitacionItem'] );
                                                                    }
                                                                 } ) ;

   }

   public    ngOnInit(): void {}



}