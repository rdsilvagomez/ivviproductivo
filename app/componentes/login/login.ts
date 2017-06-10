
import { Component, OnInit, EventEmitter, Input, Output }           from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import usuario from '../../clases/login';
import { listadoUsuario } from  '../../clases/login';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/of';
 
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { response }    from '../../clases/response';
import { loginServicio }    from '../../Servicios/login.service';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import {LocalStorageService } from   '../../Servicios/localstorage.service';

@Component({
    moduleId: module.id,
   selector: 'login',
  templateUrl: '../../views/login/login.html'
       })



export class login implements OnInit {
   
   res :listadoUsuario; 
  constructor(private modalService: NgbModal , private lgnSrv : loginServicio,private router: Router,private loclSrv: LocalStorageService) {}

   public login (usuario: string, pwd :string)
   {
	this.lgnSrv.getAutorizacionLogin(usuario,pwd).subscribe(res=> {
                                                                    this.res= res ;
                                                                    if (this.res.success===true)
                                                                    {
                                                                          localStorage.setItem('currentUser', usuario);
                                                                          localStorage.setItem('currentRol', this.res.data.role);
                                                                            
                                                                          this.loclSrv.announceRole(this.res.data.role);   
                                                                          this.loclSrv.announceLogin(usuario);
                                                                      
                                                                       
                                                                        if ( this.res.data.role==="admin"|| this.res.data.role==="compras")
                                                                          {
                                                                              this.router.navigate(['habilitacion'] );
                                                                          }
                                                                        else
                                                                          {
                                                                              this.router.navigate(['solcotizacion'] );
                                                                          }
 
                                                                          
                                                                    }
                                                                 } ) ;

   }

  public announcelogin(usuario:string) 
  {}
  
  public    ngOnInit(): void 
   {

      this.lgnSrv.logout(); 

   }



}