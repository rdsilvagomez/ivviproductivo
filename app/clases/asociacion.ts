import { metadata } from './metadata';
export class SolicitudCotizacionSapCab {

	id: number ; 
	idSolicitudCotizacionCab: number ; 
	fecha:  string; 
	ENVIADOSAP: number ; 
	LIFNR: string ; 
	STCD1: string ; 
	idProveedor: number ; 
	ESMANUAL: number ; 
}
export class SolicitudCotizacionSapCue {
    id: number ; 
	idSolicitudCotizacionCab: number ; 
	fecha:  string; 
	ENVIADOSAP: number ; 
	LIFNR: string ; 
	STCD1: string ; 
	idProveedor: number ; 
	ESMANUAL: number ; 
}

 export class listadoSolicitudCotizacionSapCab
{
	
	_meta: metadata;
	data: SolicitudCotizacionSapCab[];
}
export class listadoSolicitudCotizacionSapCue 
{
   _meta: metadata;
	data: SolicitudCotizacionSapCue[];
}
