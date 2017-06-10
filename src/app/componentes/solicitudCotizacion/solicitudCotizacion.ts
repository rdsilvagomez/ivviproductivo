import { ViewChild }      from '@angular/core'; 
import { Component, OnInit, EventEmitter, Input, Output }      from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { SolicitudCotizacionCab } from '../../clases/solicitudcotizaciones';
import { listadoSolCotCab  }      from '../../clases/solicitudcotizaciones';
import { SolicitudCotizacionDetalle } from '../../clases/solicitudcotizaciones';
import { listadoSolCotDet           } from '../../clases/solicitudcotizaciones';
import { SolicitudCotServicio }    from '../../Servicios/SolicitudCot.Service';
@Component({
  moduleId: module.id,
  selector: 'solicitudCotizacion',
  templateUrl: '../../views/solicitudCotizacion/solicitudCotizacion.html'
 })

	export class solicitudCotizacion implements OnInit {
		listadoEncabezado :listadoSolCotCab;
		listadoDetalle    :listadoSolCotDet;

		 constructor(private modalService : NgbModal  , private solCotSer : SolicitudCotServicio ) 
        {


        }
		ngOnInit(): void    {
			this.cargarEncabezado(); 
		}
		public cargarEncabezado ()
		{
				this.solCotSer.getSolicitudCotEncabezado().then(res=>this.listadoEncabezado= res); 
		}
		public cargarDetalle (reg:SolicitudCotizacionCab)
		{
				this.solCotSer.getSolicitudCotDetalle(reg.id).then(res=>this.listadoDetalle= res); 

		}


	}