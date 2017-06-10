import { ViewChild }      from '@angular/core'; 
import { Component, OnInit, EventEmitter, Input, Output ,OnChanges,SimpleChange }      from '@angular/core';
import {NgbModal, ModalDismissReasons,NgbModalRef} from '@ng-bootstrap/ng-bootstrap' ;
 
import { listadoSolicitudCotizacionSapCab } from '../../clases/asociacion';
import { listadoSolicitudCotizacionSapCue } from '../../clases/asociacion';
import { asociacionServicio }         		from '../../Servicios/asociacion';
import { SpinnerComponent }           		from '../../componentes/spinner/SpinnerComponent';
import { response   }                 		from '../../clases/response';
@Component({
  moduleId: module.id,
  selector: 'asociacion',
  templateUrl: '../../views/asociacion/asociacion.html'
 })
	export class asociacion implements OnInit  {
	 listadoEncabezado :listadoSolicitudCotizacionSapCab;
	 listadoDetalle: listadoSolicitudCotizacionSapCue; 
	 modaldetalle : NgbModalRef; 
	 esError: number  ; 
	 modalMensaje : string 
 		constructor(private modalService : NgbModal  , private solCotSer : asociacionServicio ) 
        { 
        }
		
		ngOnInit(): void    {
				this.cargarEncabezado(); 
						  }

			public cargarEncabezado ()
		{

			this.solCotSer.getSolicitudCotEncabezado().subscribe(res=>this.listadoEncabezado = res); 	
		}

		public cargarDetalle (reg:any, detalle:any)
		{

				this.solCotSer.getSolicitudCotdetalle(reg.id ).subscribe(res=>this.listadoDetalle= res ); 
				this.modaldetalle = this.modalService.open(detalle,{size:'lg'})	

		}
		public EnviarCotizacion(contentMensajeConfirmacion: any) 
		{
				this.solCotSer.guardarAsociacion(this.listadoDetalle.data).subscribe(res=>{
								 
								 this.modaldetalle.close(); 
								 if (res.success==true)
				 						{
				 						  this.esError= 0; 
					 			   		  this.modalMensaje= "Cotización Generada Correctamente"; 
					 			   		  this.modalService.open(contentMensajeConfirmacion,{size:'lg'});
					 			   		  this.cargarEncabezado(); 
					 			   		}
					 			  else  {
					 			  		  this.esError= 1; 
				 					      this.modalMensaje= res.message; 
				 					      this.modalService.open(contentMensajeConfirmacion,{size:'lg'});
					 			        
					 			        } 	 


							}
                     );  
			


		}
	}