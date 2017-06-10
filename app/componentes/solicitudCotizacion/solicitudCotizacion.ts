import { ViewChild }      from '@angular/core'; 
import { Component, OnInit, EventEmitter, Input, Output ,OnChanges,SimpleChange }        from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormArray } 				  				 from '@angular/forms';
import {NgbModal, ModalDismissReasons,NgbModalRef} 										 from '@ng-bootstrap/ng-bootstrap';
import { SolicitudCotizacionCab } 														 from '../../clases/solicitudcotizaciones';
import { listadoSolCotCab  }      														 from '../../clases/solicitudcotizaciones';
import { SolicitudCotizacionDetalle } 													 from '../../clases/solicitudcotizaciones';
import { listadoSolCotDet           }													 from '../../clases/solicitudcotizaciones';
import { SolicitudCotServicio }    														 from '../../Servicios/SolicitudCot.Service';
import { SpinnerComponent }          													 from '../../componentes/spinner/SpinnerComponent';
import { response   }                												     from '../../clases/response';
@Component({
  moduleId: module.id,
  selector: 'solicitudCotizacion',
  templateUrl: '../../views/solicitudCotizacion/solicitudCotizacion.html'
 })

	export class solicitudCotizacion implements OnInit  {
		@Input () listadoEncabezado :listadoSolCotCab;
		idSolicitudCotizacionCabSeleccionado : string; 
		listadoDetalle    :listadoSolCotDet;
		respuesta : response ; 
		esError      : number = 0 ; 
		modalMensaje : string =""; 
		modalDetalleCotizacion:  NgbModalRef;  
		total: number= 0 ; 
        public isRequesting: boolean;
	    frmDetalleCotizaciones :FormGroup; 
	    fileList: FileList;
		
		fileChange(event:any ) {
      		this.fileList  = event.target.files;
   							   }

		 constructor(private _fb: FormBuilder,private modalService : NgbModal  , private solCotSer : SolicitudCotServicio ) 
        {
	 		this.frmDetalleCotizaciones  = this._fb.group({listado: this._fb.array([])});
  			this.frmDetalleCotizaciones.valueChanges.subscribe(data => {
      				 this.recalcular(data.listado); 
      			});
        }
        public recalcular(data: any)
		{
			 	let acumulado:number  =0 ; 
			   	for (var i= 0 ; i< data.length;i++ )
			   {
					acumulado = acumulado + data[i].CANTIDAD_OFERTADA*  data[i].PRECIOUNITARIO;
			   }
				this.total= acumulado; 
		}

 	    ngOnInit(): void    {
			this.cargarEncabezado(); 
		}
	 initSolicitudCotizacionRec(rec: SolicitudCotizacionDetalle) {
      
        return this._fb.group({
          	 id 					  : [rec.id],
	   		 idSolicitudCotizacionCab : [rec.idSolicitudCotizacionCab],
	   		 NUMERO_SOLPED            : [rec.NUMERO_SOLPED],
	   		 PREQ_ITEM 				  : [rec.PREQ_ITEM],
	   		 SHORT_TEXT 			  : [rec.SHORT_TEXT],
	   		 MATERIAL  				  : [rec.MATERIAL],
	   		 CANTIDAD                 : [rec.CANTIDAD],
	   		 CANTIDAD_OFERTADA        : [rec.CANTIDAD_OFERTADA],
	   		 PRECIOUNITARIO           : [rec.PRECIOUNITARIO]
          	
							 });
    }
 

		public cargarEncabezado ()
		{
				this.solCotSer.getSolicitudCotEncabezado().subscribe(res=>this.listadoEncabezado= res,
                       () => this.stopRefreshing(),
                       () => this.stopRefreshing()  ); 
		}
		
		public cargarFormularioDetalle(listado:listadoSolCotDet)
		{
			 const control = <FormArray> this.frmDetalleCotizaciones.controls['listado']; 
			while(control.length) {control.removeAt(0);}
			this.listadoDetalle= listado; 
			for (var i =  0; i <listado.data.length; i++) {
				control.push(this.initSolicitudCotizacionRec(listado.data[i])); 
			}

	    }

		public cargarDetalle (detalleCotizacion: any , reg:SolicitudCotizacionCab)
		{		
				this.idSolicitudCotizacionCabSeleccionado= reg.id ; 
				this.solCotSer.getSolicitudCotDetalle(reg.id).subscribe(res=>this.cargarFormularioDetalle(res),
                       () => this.stopRefreshing(),
                       () => this.stopRefreshing()  ); 
				this.modalDetalleCotizacion = this.modalService.open(detalleCotizacion,{size:'lg'})

		}
		public calcularTotal()
		{return 10000; }

		public recalcularTotal(event: any)
		{
		 
			let acumulado:number  =0 ; 
		   
		    for (var i= 0 ; i<this.listadoDetalle.data.length;i++ )
		   {
				acumulado = acumulado +this.listadoDetalle.data[i].CANTIDAD* this.listadoDetalle.data[i].PRECIOUNITARIO;
			}

		   this.total= acumulado; 
		}

		public EnviarCotizacion(contentConfirmacion:any,FileCotizacion:any)
		{
		  					    if(this.fileList.length > 0) {
		  					    	 
							        this.solCotSer.enviarCotizacionSapConArchivo( this.frmDetalleCotizaciones.value.listado, this.idSolicitudCotizacionCabSeleccionado,this.fileList[0])
							        .subscribe(res=>{
								
								 this.modalDetalleCotizacion.close(); 
								 if (res.success==true)
				 						{
				 						  this.esError= 0; 
					 			   		  this.modalMensaje= "Cotización Generada Correctamente"; 
					 			   		  this.modalService.open(contentConfirmacion,{size:'lg'});
					 			   		  this.cargarEncabezado(); 
					 			   		}
					 			  else  {
					 			  		  this.esError= 1; 
				 					      this.modalMensaje= res.message; 
				 					      this.modalService.open(contentConfirmacion,{size:'lg'});
					 			        
					 			        } 		


							})
							        ;

									return; 
								}
    			if (!this.frmDetalleCotizaciones.valid)
    			{
					this.esError= 1; 
 					this.modalMensaje= "El formulario debe ser diligenciado correctamente"; 
					this.modalService.open(contentConfirmacion,{size:'lg'});
		    		return; 
    			}
		  
			this.solCotSer.enviarCotizacionSap( this.frmDetalleCotizaciones.value.listado, this.idSolicitudCotizacionCabSeleccionado)
			.subscribe(res=>{
								
								 this.modalDetalleCotizacion.close(); 
								 if (res.success==true)
				 						{
				 						  this.esError= 0; 
					 			   		  this.modalMensaje= "Cotización Generada Correctamente"; 
					 			   		  this.modalService.open(contentConfirmacion,{size:'lg'});
					 			   		  this.cargarEncabezado(); 
					 			   		}
					 			  else  {
					 			  		  this.esError= 1; 
				 					      this.modalMensaje= res.message; 
				 					      this.modalService.open(contentConfirmacion,{size:'lg'});
					 			        
					 			        } 		


							},
                       () => this.stopRefreshing(),
                       () => this.stopRefreshing()  );  
			 
		}
		 private stopRefreshing() {
        this.isRequesting = false; }


	}