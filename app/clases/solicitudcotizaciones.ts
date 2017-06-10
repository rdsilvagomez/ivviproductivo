import { metadata } from './metadata';

export class SolicitudCotizacionCab
{
	id: string;
	descripcion:string; 
	fecha :string; 
}
export class SolicitudCotizacionDetalle
{
	id : string;
	idSolicitudCotizacionCab :string;
	NUMERO_SOLPED : string;
	PREQ_ITEM : string;
	SHORT_TEXT: string;
	MATERIAL : string;
	CANTIDAD : number ;
	CANTIDAD_OFERTADA : number; 
	PRECIOUNITARIO : number; 

}
export class listadoSolCotCab
{
	_meta: metadata;
	data: SolicitudCotizacionCab[];
}
export class listadoSolCotDet  
{
	_meta: metadata;
	data: SolicitudCotizacionDetalle[];
	 
}