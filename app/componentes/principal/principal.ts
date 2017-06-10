
import { Component, OnInit, EventEmitter, Input, Output,ViewChild,ViewEncapsulation }           from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import usuario from '../../clases/login';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/of';


import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
 import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

 @Component({
    moduleId: module.id,
    selector: 'principal',
    template: '<h1>wéfk´wekf´pwekf´wekf´wekf´wekp</h1>',
 
       })

       export class principal  implements OnInit {
       	
			       	public constructor(private router: Router)
			       	{}
					public    ngOnInit(): void 
			   		{
					/*if (   localStorage.getItem('currentRol')==="proveedor")
						{		 
					 	this.router.navigate(['solcotizacion'] );
						}*/

			   		}
        
        }