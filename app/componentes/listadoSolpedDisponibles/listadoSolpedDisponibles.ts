
import { Component, OnInit, EventEmitter, Input, Output ,ViewEncapsulation}           from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { listadoSolpedDisponible }            from '../../clases/SolpedDisponible';
import { SolpedDisponible }            from '../../clases/SolpedDisponible';
import { SolpedDisponibleServicio }    from '../../Servicios/SolpedDisponible.Service';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/of';

 
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { SpinnerComponent }          from '../../componentes/spinner/SpinnerComponent';
import 'rxjs/add/observable/of';

 
@Component({
 moduleId: module.id,
   encapsulation: ViewEncapsulation.None,
   selector: 'listadoDisponiblesmdl',
  templateUrl: '../../views/listadoSolpedDisponibles/listadoSolpedDisponibles.html'
       })

export class listadoSolpedDisponibles implements OnInit {

    @Output() onPosicionSeleccionada = new EventEmitter<SolpedDisponible>();
      closeResult: string;
      listado :  listadoSolpedDisponible;   
      page:number = 0 ;  
       public isRequesting: boolean;
      solpedFiltro = ""; 
      posicionFiltro=""; 
     constructor(private modalService : NgbModal  , private soldispServ      :  SolpedDisponibleServicio) {}
      
       open(content:any) {
        this.modalService.open(content,{size:'lg'}).result.then((result) => {
              this.closeResult = `Closed with: ${result}`;  }, 
            (reason) => {   
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                  });
               }

    public filtrarPosiciones(Solped:any,  Posicion:any):void
    {
       this.solpedFiltro   = Solped; 
       this.posicionFiltro = Posicion; 
       this.getSolpedDisponibles();
    }
    public seleccionarItem (item:SolpedDisponible):void {
        
         this.onPosicionSeleccionada.emit(item);  
                                                        }

     getSolpedDisponibles(): void {
      this.soldispServ
          .getSolpedDisponibles(this.page,this.solpedFiltro,this.posicionFiltro)
          .subscribe(soldisponibles => this.listado = soldisponibles,
                       () => this.stopRefreshing(),
                       () => this.stopRefreshing()); 
                                  }

        private stopRefreshing() {
        this.isRequesting = false;
    }                                

     ngOnInit(): void 
     { this.getSolpedDisponibles();  }

     public pageChanged(event:any):void 
     {  this.getSolpedDisponibles();  }

  

    private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}