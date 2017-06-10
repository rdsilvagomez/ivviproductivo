import { ViewChild }      from '@angular/core'; 
import { Component, OnInit, EventEmitter, Input, Output ,OnChanges,SimpleChange }      from '@angular/core';
import {NgbModal, ModalDismissReasons,NgbModalRef} from '@ng-bootstrap/ng-bootstrap' ;
import { filtro           } 					  from '../../clases/filtros';
import { listadoFiltro           } 					  from '../../clases/filtros';
import { filtroServicio }         		from '../../Servicios/filtros';
import { SpinnerComponent }           		from '../../componentes/spinner/SpinnerComponent';
import { response   }                 		from '../../clases/response';
 
import { FormGroup, FormBuilder, Validators,FormArray } 				   from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  moduleId: module.id,
  selector: 'filtros',
  templateUrl: '../../views/filtros/filtros.html'
 })

export class filtros implements OnInit  {
		public reg: filtro = new filtro() ; 
		constructor(private srv:filtroServicio)
		{

		}
		ngOnInit():void 
		{
			this.cargarValores(); 
		}
		
		cargarValores() 
		{
			this.srv.getFiltro().subscribe(resultado =>{
				if(resultado.data.length>0 ){
						this.reg= resultado.data[0];
		
				}
			});
		}

		actualizarValores()
		{	    
			this.srv.actualizarFiltro(this.reg).subscribe(res=>console.log(res));
    	}



}
