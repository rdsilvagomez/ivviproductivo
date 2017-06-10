import { metadata } from './metadata';
export default class usuario {
	id:string; 
	username: string; 
	firstname:string; 
	lastname : string; 
	password:string; 
}

export class listadoUsuario {
	_meta : metadata;
	 data : usuario[];
}

