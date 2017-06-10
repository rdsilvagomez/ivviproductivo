import { ViewChild }      from '@angular/core'; 
import { Component, OnInit, EventEmitter, Input, Output }      from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { SolpedDisponible  }      from '../../clases/SolpedDisponible';
import { SolpedDisponibleServicio }    from '../../Servicios/SolpedDisponible.Service';
import { listadoGrupos  }      from '../../componentes/grupos/grupos';
import { Grupo  }      from '../../clases/grupo';
@Component({
  moduleId: module.id,
  selector: 'habilitacionItems',
  templateUrl: '../../views/habilitacionItems/HabilitacionItem.html'
 
})
	export class habilitacionItems implements OnInit {

		@ViewChild('GruposSeleccionados')   GruposSeleccionados  :listadoGrupos;
		@ViewChild('GruposNoSeleccionados') GruposNoSeleccionados:listadoGrupos;
     	 listado:SolpedDisponible[]= []; 
     	 listadoEnvio:SolpedDisponible[]=[];
     	 solpedSeleccionada:string=""; 
     	 posicionSeleccionada:string=""; 
		ngOnInit(): void    {}
		   closeResult: string;
        constructor(private modalService : NgbModal  , private soldispServ : SolpedDisponibleServicio ) 
        {


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
		onGrupoSeleccionado (item:Grupo)
		{
				this.GruposSeleccionados.filtrarGrupos("","") ;
				this.GruposNoSeleccionados.filtrarGrupos("","");
		}


		onPosicionSeleccionada(item: SolpedDisponible)
		{
		  this.listado.push(item); 
		}

		public  guardarListado()
		{

		
			this.listadoEnvio = this.listado; 
			this.listado= [] ; 
			this.soldispServ
          .SolicitarCotizacion(this.listadoEnvio).then(()=>this.listado=[]);
          

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