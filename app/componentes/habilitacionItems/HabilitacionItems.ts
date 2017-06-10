import { ViewChild }      									   from '@angular/core'; 
import { Component, OnInit, EventEmitter, Input, Output }      from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormArray } 				   from '@angular/forms';
import {NgbModal, ModalDismissReasons,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SolpedDisponible  }         from '../../clases/SolpedDisponible';
import { response   }                from '../../clases/response';
import { SolpedDisponibleServicio }  from '../../Servicios/SolpedDisponible.Service';
import {LocalStorageService}         from   '../../Servicios/localstorage.service';
import { listadoGrupos  }            from '../../componentes/grupos/grupos';
import { listadoProveedores  }       from '../../componentes/proveedores/proveedor';
import { Grupo  }      				 from '../../clases/grupo';
import { SpinnerComponent }          from '../../componentes/spinner/SpinnerComponent';
import { Proveedor }            	 from '../../clases/proveedor';
import { Observable }                from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {NgForm} from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'habilitacionItems',
  templateUrl: '../../views/habilitacionItems/HabilitacionItem.html'
 
})
	export class habilitacionItems implements OnInit {

		@ViewChild('GruposSeleccionados')         GruposSeleccionados        :  listadoGrupos      ;
		@ViewChild('GruposNoSeleccionados')       GruposNoSeleccionados      :  listadoGrupos      ;
	    @ViewChild('ProveedoresSeleccionados')    ProveedoresSeleccionados   :  listadoProveedores ;
		@ViewChild('ProveedoresNoSeleccionados')  ProveedoresNoSeleccionados :  listadoProveedores ;

		 closeResult: string;
     	 listado:SolpedDisponible[]= []; 
     	 listadoEnvio:SolpedDisponible[]=[];

	 	 listadoSolpedManual:SolpedDisponible[]= []; 

     	 solpedSeleccionada:string=""; 
     	 posicionSeleccionada:string=""; 
     	 respuestaSolicitud : Observable<response> ; 
     	 respuesta : response ; 
     	 modalHabilitacionPedido:  NgbModalRef;  
		 modalHabilitacionPedidoManual:  NgbModalRef;  
     	 modalMensaje : string =""; 
     	 esError      : number = 0 ; 
     	 public isRequesting: boolean;
	     SeqPosicionesMantenimiento : string = "0" ; 
	 
   		 public frmSolpedisponibles: FormGroup;  
   		 public frmSolpedManual     : FormGroup;  
		ngOnInit(): void    {
		 
			if (   localStorage.getItem('currentRol')==="proveedor")
			{		 
					 this.router.navigate(['solcotizacion'] );
			}
			 this.frmSolpedisponibles = this._fb.group({listadoDisponibles: this._fb.array([])});
			 this.frmSolpedManual     = this._fb.group({listadoSopedManual: this._fb.array([])});

		}
	
	constructor(private router: Router,private _fb: FormBuilder,private lgSrvc: LocalStorageService,private modalService : NgbModal  , private soldispServ : SolpedDisponibleServicio,fb: FormBuilder ) 
        {
        	   
			lgSrvc.announceLogin( localStorage.getItem('currentUser'));
		}


	initSolpedManualRec(rec: SolpedDisponible) {
         
        return this._fb.group({
          	SHORT_TEXT:		    [rec.SHORT_TEXT],
			MATERIAL:		    [rec.MATERIAL],
			CANTIDAD:           [rec.CANTIDAD, Validators.required] 
							  });
    }

		initSolpedDisponibleRec(rec: SolpedDisponible) {
         
        return this._fb.group({
            ID:  				[rec.ID],
			NUMERO_SOLPED :  	[rec.NUMERO_SOLPED],
			PREQ_ITEM : 		[rec.PREQ_ITEM],
			DOC_TYPE : 			[rec.DOC_TYPE],
			CREATED_BY:  		[rec.CREATED_BY],
			CH_ON : 			[rec.CH_ON],
			PREQ_NAME : 	    [rec.PREQ_NAME],
			SHORT_TEXT:		    [rec.SHORT_TEXT],
			MATERIAL:		    [rec.MATERIAL],
			MATERIAL_EXTERNAL:  [rec.MATERIAL_EXTERNAL],
			CANTIDAD:           [rec.CANTIDAD, Validators.required],
			UNIT    : 			[rec.UNIT]
        });
    }
		public removerSolpedisponible(n: number )
		{
			const control = <FormArray>this.frmSolpedisponibles.controls['listadoDisponibles'];
        	control.removeAt(n);
		}
			public removerSolpedManual(n: number )
		{
			const control = <FormArray>this.frmSolpedManual.controls['listadoSopedManual'];
        	control.removeAt(n);
		}
  

	 
		addItem(item: SolpedDisponible) {
		    const control = <FormArray>this.frmSolpedisponibles.controls['listadoDisponibles'];
    		this.solpedSeleccionada=item.NUMERO_SOLPED; 
            this.posicionSeleccionada=item.PREQ_ITEM;
		 
		     var arr_seleccionado= this.frmSolpedisponibles.value.listadoDisponibles; 
		    for(var i= 0 ; i<arr_seleccionado.length; i++)
		    {
		    	if ( arr_seleccionado[i].NUMERO_SOLPED===item.NUMERO_SOLPED&& arr_seleccionado[i].PREQ_ITEM===item.PREQ_ITEM)
		    	{
		    		return ; 
		    	}
		    }
			control.push(this.initSolpedDisponibleRec(item));
		}

		 public adicionarItemManual()
		 {
				var item : SolpedDisponible; 
				item= new SolpedDisponible(); 
			    const control = <FormArray>this.frmSolpedManual.controls['listadoSopedManual'];
			    control.push(this.initSolpedManualRec(item )) ; 

		 }

        
			openProveedores ( contentProveedores:any,solped:string , posicion:string)
		{
		     

		    this.solpedSeleccionada=solped; 
            this.posicionSeleccionada=posicion;
	
		this.modalService.open(contentProveedores,{size:'lg'}).result.then((result) => {
              this.closeResult = `Closed with: ${result}`;  }, 
            (reason) => {   
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                  });
		}
      
        openGrupos(contentGroup:any,solped:string , posicion:string) 
        {
            this.solpedSeleccionada=solped; 
            this.posicionSeleccionada=posicion;
        	this.modalService.open(contentGroup,{size:'lg'}).result.then((result) => {
              this.closeResult = `Closed with: ${result}`;  }, 
            (reason) => {   
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                  });
		}

        onProveedorSeleccionado( item:Proveedor )
        {
				this.ProveedoresSeleccionados.filtrarProveedoresxPosicion();
				this.ProveedoresNoSeleccionados.filtrarProveedoresxPosicion();
        }
		onGrupoSeleccionado (item:Grupo)
		{
				this.GruposSeleccionados.filtrarGrupos("","") ;
				this.GruposNoSeleccionados.filtrarGrupos("","");
		}


		onPosicionSeleccionada(item: SolpedDisponible)
		{

		  this.removeritem(item); 
		  this.listado.push(item); 
		  this.addItem(item); 
		}

		public removeritemManual (item:SolpedDisponible)
		{
			var index = this.listadoSolpedManual.indexOf(item);
			 
			if (index !=-1 ) 
			{ 
				this.listadoSolpedManual.splice(index, 1); 
			}

		}
		public removeritem(item:SolpedDisponible)
		{
			var index = this.listado.indexOf(item);
			 
			if (index !=-1 ) 
			{ 
				this.listado.splice(index, 1); 
			}
		}
		public EnviarCotizacionManual(contentConfirmacion: any )
		{

		 
		 if (!this.frmSolpedManual.valid ) 
            {
            		this.esError= 1; 
 					this.modalMensaje= "El formulario debe ser diligenciado correctamente"; 
					this.modalService.open(contentConfirmacion,{size:'lg'});
					return; 
            }

           if (this.frmSolpedManual.value.listadoSopedManual.length==0 )
		 	{       
		 		    this.esError= 1; 
 					this.modalMensaje= "Debe seleccionar al menos un item para cotizar"; 
					this.modalService.open(contentConfirmacion,{size:'lg'});
				 
					return; 
		 	}


        	
		   this.soldispServ.SolicitarCotizacion(this.frmSolpedManual.value.listadoSopedManual,"",1)
			 .subscribe(res => { if (res.success==true)
				 						{
					 						   this.esError= 0; 
					 						   this.listadoSolpedManual	  = [];
					 						   this.modalHabilitacionPedidoManual.close(); 
					 						   this.modalMensaje= "Solped Habilitadas para Cotizar"; 
					 						   this.modalService.open(contentConfirmacion,{size:'lg'});
					 						 	this.SeqPosicionesMantenimiento  ="0";
					 						   
 											   const control = <FormArray>this.frmSolpedManual.controls['listadoSopedManual'];  

												while(control.length) {
  																control.removeAt(0);
																		}
				 						}
				 					    else 
				 					    {       this.esError= 1; 
				 					    	    this.modalMensaje= res.message; 
				 					    		this.modalService.open(contentConfirmacion,{size:'lg'});
				 					    }
			 				   },

						err => {
                                   this.modalMensaje = err;  
							       this.esError= 1; 
				 				   this.modalService.open(contentConfirmacion,{size:'lg'});
                                 
                                }
			 			);  

		}
		public solicitarCotizacion (contentConfirmacion: any ,informacion:string) 
		{
          
			 
		 	 if(this.frmSolpedisponibles.value.listadoDisponibles.length==0)
		 	 {
		 	 	    this.esError= 1; 
 					this.modalMensaje= "Debe seleccionar al menos una posición para cotizar"; 
					this.modalService.open(contentConfirmacion,{size:'lg'});
					this.modalHabilitacionPedido.close(); 
					return; 
		 	 }
		 	 
		 
		   this.soldispServ.SolicitarCotizacion( this.frmSolpedisponibles.value.listadoDisponibles,informacion,0)
			 .subscribe(res => { if (res.success==true)
				 						{
					 						   this.esError= 0; 
					 						   this.listado	  = [];
					 						   this.modalHabilitacionPedido.close(); 
					 						   this.modalMensaje= "Solped Habilitadas para Cotizar"; 
					 						   this.modalService.open(contentConfirmacion,{size:'lg'});
					 						     const control = <FormArray>this.frmSolpedisponibles.controls['listadoDisponibles']; 
												while(control.length) {
  																control.removeAt(0);
																		}
				 						}
				 					    else 
				 					    {       this.esError= 1; 
				 					    		this.modalService.open(contentConfirmacion,{size:'lg'});
				 					    }
			 				   },

						err => {
                                   this.modalMensaje = err;  
							       this.esError= 1; 
				 				   this.modalService.open(contentConfirmacion,{size:'lg'});
                                 
                                }
			 			); 
	 
		}
 	  public  save(model: any, isValid: boolean) {


 	  }
 	private stopRefreshing() 
 	{
           this.isRequesting = false;
    }

     public CargarCotizacionManual(contentSolpedManual:any)
	 {
        
	 	if (this.SeqPosicionesMantenimiento==="0")
		{
         	this.soldispServ.getSequenciaManual() 
         	.subscribe(res=>{
         			this.SeqPosicionesMantenimiento = res.data[0].SequenciaManual ; 
			}); 
         }
			this.modalHabilitacionPedidoManual	= this.modalService.open(contentSolpedManual,{size:'lg'});
	 }
	 
	public  guardarListado(contentConfirmacion:any, contentEnviarRegistros:any )
     {
        	if (!this.frmSolpedisponibles.valid ) 
            {
            		this.esError= 1; 
 					this.modalMensaje= "El formulario debe ser diligenciado correctamente"; 
					this.modalService.open(contentConfirmacion,{size:'lg'});
					return; 
            }

 
			this.modalHabilitacionPedido = 	this.modalService.open(contentEnviarRegistros,{size:'lg'}); 
     }
	public   sincronizarPosiciones(contentConfirmacion: any  )
        {    this.isRequesting = true;
        	 this.soldispServ.SincronizarPosiciones()
		            .subscribe(res =>  {	
			             					if (res.success==true)
											{     
												  this.esError= 0;  
												  this.modalMensaje= "Solped y Posiciones cargadas correctamente."; 
												  this.modalService.open(contentConfirmacion,{size:'lg'});
											}
										    else 
										    {  
										    	  this.esError= 1;  
												  this.modalMensaje= res.message 
												  this.modalService.open(contentConfirmacion,{size:'lg'});
										    }
											this.stopRefreshing(); 
										},
		            		  err => {
                                  this.esError= 1;  
												  this.modalMensaje=err
												  this.modalService.open(contentConfirmacion,{size:'lg'});
                                 			this.stopRefreshing(); 
                                	 }
		               
		            		);
		} 


	 
 
		
	
  		
  		private getDismissReason(reason: any): string {
	    	if (reason === ModalDismissReasons.ESC) {
	      			return 'by pressing ESC';
	    	} 
	    	else if (reason === ModalDismissReasons.BACKDROP_CLICK) 
	    	{
	      			return 'by clicking on a backdrop';
	    	} else 
	    	{
	      			return  `with: ${reason}`;
	    	}
	    	}


}