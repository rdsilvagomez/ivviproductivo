
import { Component, OnInit, EventEmitter, Input, Output,ViewChild,ViewEncapsulation }           from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import usuario from '../../clases/login';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/of';


import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
 import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import {LocalStorageService }  from   '../../Servicios/localstorage.service';

import { listadoGrupos  }      from '../../componentes/grupos/grupos';
import { Grupo  }              from '../../clases/grupo';

@Component({
    moduleId: module.id,
    selector: 'seleccionarGrupoContent',
    templateUrl: '../../views/seleccionarGrupo/seleccionarGrupo.html',
 
       })
 
export class seleccionarGrupoContent implements OnInit {
	 @ViewChild('GruposSeleccionados')   GruposSeleccionados  :listadoGrupos;
     @ViewChild('GruposNoSeleccionados') GruposNoSeleccionados:listadoGrupos;
     @Input() solpedSeleccionada      : string="";
     @Input() posicionSeleccionada    : string="";
	   closeResult: string;
	 public    ngOnInit(): void 
   {

   }
   

   
  
	
	onGrupoSeleccionado (item:Grupo)
	{
				this.GruposSeleccionados.filtrarGrupos("","") ;
				this.GruposNoSeleccionados.filtrarGrupos("","");
	}

		
  	 
}


@Component({
    moduleId: module.id,
    selector: 'seleccionarGrupo',
    template: '  <button type="button" class="btn btn-success btn-sm"  (click)="openGrupos()"><i class="fa fa-link"  ></i>Asociar Grupo</button>',
 
       })

       export class seleccionarGrupo implements OnInit { 
	     @Input() solpedSeleccionada      : string="";
	     @Input() posicionSeleccionada    : string="";


	 	public    ngOnInit(): void 
   		{

   		}
   
 		constructor( private modalService : NgbModal   ) 
        {
		 
		}

		 openGrupos(  ) 
    	 {
            var modalRef = this.modalService.open(seleccionarGrupoContent,{size:'lg' });
         
    		modalRef.componentInstance.solpedSeleccionada   = this.solpedSeleccionada;
    		modalRef.componentInstance.posicionSeleccionada = this.posicionSeleccionada;
    	   
    	 }

       }