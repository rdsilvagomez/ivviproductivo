
import { ViewChild }      from '@angular/core'; 
import { Component, OnInit, EventEmitter, Input, Output }           from '@angular/core';
import {NgbModal, ModalDismissReasons}       from '@ng-bootstrap/ng-bootstrap';
import { Grupo }            from '../../clases/grupo';

import { listadoGrupo }            from '../../clases/grupo';
import { GrupoServicio }    from '../../Servicios/Grupo.Service';
import { Observable }     from 'rxjs/Observable';
import { listadoProveedores }          from '../../componentes/proveedores/proveedor';

import { Proveedor }            from '../../clases/proveedor';


import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
 
@Component({
      moduleId: module.id,
   selector: 'listadoGrupos',
  templateUrl: '../../views/grupos/grupos.html'
       })

export class listadoGrupos implements OnInit {
	   closeResult: string;
     listado :  listadoGrupo;   
     codigoFiltro="";
     descripcionFiltro=""; 
     page:number =1; 
     @ViewChild('ProveedoresSeleccionados')   ProveedoresSeleccionados   : listadoProveedores;
     @ViewChild('ProveedoresNoSeleccionados') ProveedoresNoSeleccionados : listadoProveedores;
     @Input() showbuttons : number=1; 
     @Input() solped      : string="";
     @Input() posicion    : string="";
     @Input() filtrarXgrupo:number=2; 
     @Output() onGrupoSeleccionado= new EventEmitter<Grupo>();
     GrupoIdSeleccionado   : string="0"; 

	constructor(private modalService : NgbModal  , private grpServicio      :  GrupoServicio) {}
    ngOnInit(): void  {
		 this.filtrarGrupoServicio();  
     }
	
    public filtrarGrupoServicio(): void
    {  
    	this.grpServicio.filtrarGrupos(this.page,this.codigoFiltro, this.descripcionFiltro,this.filtrarXgrupo,this.solped,this.posicion).
    	then(resultado=>{this.listado= resultado;
                      console.log('revisa asignación');});
	  }
   public filtrarGrupoSol(): void
    {                                         
    }
    public filtrarGrupos (codigo:any, descripcion:any):void
	  {
          this.codigoFiltro      = codigo; 
		      this.descripcionFiltro = descripcion; 
          this.filtrarGrupoServicio(); 
    }
	public  seleccionarGrupo(reg:Grupo):void
	{ 
        this.grpServicio.seleccionarGrupo(this.solped,this.posicion,reg.id).then(()=>this.onGrupoSeleccionado.emit(reg));
	}
    public  eliminarGrupo(reg:Grupo):void
    { 
    
    }
    public  actualizarGrupo(reg:Grupo):void
    { 
    
    }
    public asociarProveedores (contentProveedores:any,reg:Grupo): void
    {

        this.GrupoIdSeleccionado= reg.id; 
        
        
        this.modalService.open(contentProveedores,{size:'lg'}).result.then((result) => {
              this.closeResult = `Closed with: ${result}`;  }, 
            (reason) => {   
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                  });

    }

      public pageChanged(event:any):void 
     {  

        this.filtrarGrupos(this.filtrarGrupos,this.descripcionFiltro);  


     }
     public onProveedorSeleccionado(proveedor: Proveedor)
     {
      
      this.ProveedoresSeleccionados.filtrarProveedor(); 
      this.ProveedoresNoSeleccionados.filtrarProveedor(); 

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