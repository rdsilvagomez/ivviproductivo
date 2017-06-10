import { ViewChild }      from '@angular/core'; 
import { Component, OnInit, EventEmitter, Input, Output ,OnChanges,SimpleChange }      from '@angular/core';
import {NgbModal, ModalDismissReasons,NgbModalRef} from '@ng-bootstrap/ng-bootstrap' ;
 
import { listadoSolicitudCotizacionSapCab } from '../../clases/asociacion';
import { listadoSolicitudCotizacionSapCue } from '../../clases/asociacion';
import { filtroServicio }         		from '../../Servicios/filtros';
import { SpinnerComponent }           		from '../../componentes/spinner/SpinnerComponent';
import { response   }                 		from '../../clases/response';
@Component({
  moduleId: module.id,
  selector: 'filtros',
  templateUrl: '../../views/filtros/filtros.html'
 })

export class filtros implements OnInit  {

		constructor(private srv:filtroServicio)
		{

		}
		ngOnInit():void 
		{
				this.cargarValores(); 
		}
		cargarValores() 
		{
			this.srv.getFiltro().subscribe(resultado =>console.log(resultado) );


		}
		actualizarValores(DocType:string ,CreatedBy:string ,PurGroup:string ,Plant:string )
		{
				console.log( DocType); 
				console.log( CreatedBy); 
				console.log( PurGroup); 
				console.log( Plant); 

		}



}
