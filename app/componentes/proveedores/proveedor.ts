
import { Component, OnInit, EventEmitter, Input, Output }           from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Grupo }            from '../../clases/grupo';
import { Proveedor }            from '../../clases/proveedor';
import { listadoProveedor }            from '../../clases/proveedor';
import { ProveedorServicio }    from '../../Servicios/proveedor.Service';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { SpinnerComponent }          from '../../componentes/spinner/SpinnerComponent';

@Component({
        
   selector: 'listadoProveedores',
   templateUrl: 'app/views/proveedores/proveedores.html'
       })

export class listadoProveedores implements OnInit {
	  listado : listadoProveedor;   
    codigoFiltro="";
    descripcionFiltro=""; 
    page:number =0; 
    @Input() showbuttons:number=1; 
    @Input() grupoid      :string="0"; 
    @Input() numeroSolped :string="0"; 
    @Input() posicion     :string="0"; 
    @Input() asociar      : number = 0 ; 
    @Input() seleccion    : number= 0; 

    @Output() onProveedorSeleccionado= new EventEmitter<Proveedor>();

    constructor(private modalService : NgbModal  , private prvServicio      :  ProveedorServicio) {
    }
    ngOnInit(): void  {
         
            if (this.grupoid=="0")
            {
               this.filtrarProveedoresxPosicion();
              
            }
            else {
               this.filtrarProveedor(); 
            }
               
                
              
      	  }
     public filtrarProveedores(Codigo:any,descripcion:any):void
     {

        this.codigoFiltro=Codigo; 
        this.descripcionFiltro= descripcion; 
        this.filtrarProveedor(); 
     }

     public ingresarProveedor(descripcion:string):void 
     {
        console.log(descripcion); 
    }

  public filtrarProveedoresxPosicion() : void 
  {

  this.prvServicio.filtrarProveedoresXposicion(this.page,this.codigoFiltro, 
                                                         this.seleccion,
                                                         this.descripcionFiltro,
                                                         this.numeroSolped,
                                                         this.posicion,
                                                         this.asociar).
      then(resultado=>this.listado= resultado); 

  }

      public filtrarProveedor(): void
    {

    	this.prvServicio.filtrarProveedores(this.page,this.codigoFiltro, 
                                          this.descripcionFiltro,
                                          this.seleccion,
                                          this.grupoid).
    	then(resultado=>this.listado= resultado); 
	  }
    public asociarproveedor(reg:Proveedor): void
    {
        if (this.grupoid=="0") 
        {   
            this.prvServicio.asociarPosicion (reg.id, 
                                                    this.numeroSolped,
                                                    this.posicion,
                                                    this.asociar)
                  .then(()=>this.onProveedorSeleccionado.emit(reg));
         }
        else 
        {
            this.prvServicio.asociarGrupo(reg.id, this.grupoid)
                  .then(()  =>this.onProveedorSeleccionado.emit(reg));
        }
    }
    public eliminarproveedor (reg:Proveedor): void
    {}
    public actualizarproveedor(reg:Proveedor):void
    {}
      public pageChanged(event:any):void 
     {  

         if (this.grupoid=="0")
            {
               this.filtrarProveedoresxPosicion();
              
            }
            else {
               this.filtrarProveedor(); 
            }
               


     }

    


}