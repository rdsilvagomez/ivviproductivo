import { metadata } from './metadata';

export class SolpedDisponible{
	constructor() {}

	 ID 				:string; 
	 NUMERO_SOLPED 		:string;
	 PREQ_ITEM 			:string;
	 DOC_TYPE 			:string;
	 CREATED_BY 		:string;
	 CH_ON 				:string;
	 PREQ_NAME 			:string;
	 SHORT_TEXT		    :string;
	 MATERIAL		    :string;
	 MATERIAL_EXTERNAL  :string;
	 CANTIDAD           :string; 
	 UNIT 				:string; 
 }

 
 export class listadoSolpedDisponible
{
	
	_meta: metadata;
	data: SolpedDisponible[];


}
