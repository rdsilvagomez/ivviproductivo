
import { Component, OnInit, EventEmitter, Input, Output,ViewChild,ViewEncapsulation }           from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import usuario from '../../clases/login';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/of';


import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
 import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import {LocalStorageService }  		 from   '../../Servicios/localstorage.service';

import { listadoGrupos  }      		 from '../../componentes/grupos/grupos';
import { Grupo  }              		 from '../../clases/grupo';
import { Proveedor }            	 from '../../clases/proveedor';
import { listadoProveedores  }       from '../../componentes/proveedores/proveedor';



@Component({
    moduleId: module.id,
    selector: 'seleccionarProveedorContent',
    templateUrl: '../../views/seleccionarProveedor/seleccionarProveedor.html',
 
       })

 
       export class seleccionarProveedorContent implements OnInit 
     { 
    	           @Input() solpedSeleccionada      : string="";
          	     @Input() posicionSeleccionada    : string="";
                 @Input() asociar              : number = 0 ; 
                 @ViewChild('ProveedoresSeleccionados')    ProveedoresSeleccionados   :   listadoProveedores ;
          		   @ViewChild('ProveedoresNoSeleccionados')   ProveedoresNoSeleccionados :  listadoProveedores ;

      	 	       public    ngOnInit(): void 
         		     {
                     

                  }
         
       		       constructor( private modalService : NgbModal   ) 
                  {}

      		       onProveedorSeleccionado( item:Proveedor )
                 {
      				     this.ProveedoresSeleccionados.filtrarProveedoresxPosicion();
      				     this.ProveedoresNoSeleccionados.filtrarProveedoresxPosicion();
                 }


       }

      @Component({
          moduleId : module.id,
          selector    : 'seleccionarProveedor',
          templateUrl : '../../views/seleccionarProveedor/seleccionarProveedorCab.html',
 
       })

       export class seleccionarProveedor implements OnInit { 
       @Input() solpedSeleccionada      : string="";
       @Input() posicionSeleccionada    : string="";
       @Input()  asociar:number = 0 ; 

       public    ngOnInit(): void 
       {
  
       }
   
       constructor( private modalService : NgbModal   ) 
        {
     
        }

       openProveedores( ) 
         {       

              var modalRef = this.modalService.open(seleccionarProveedorContent,{size:'lg' });

              modalRef.componentInstance.solpedSeleccionada   = this.solpedSeleccionada;
              modalRef.componentInstance.posicionSeleccionada = this.posicionSeleccionada;
              modalRef.componentInstance.asociar = this.asociar.toString();
           
         }

       }       