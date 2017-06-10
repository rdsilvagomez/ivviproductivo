import { Component } from '@angular/core';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OnInit, EventEmitter, Input, Output }           from '@angular/core';
import {LocalStorageService} from   './Servicios/localstorage.service';
import {habilitacionItems} 		  from './componentes/habilitacionItems/HabilitacionItems';

import { Subscription }   from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'views/navbar.html'
})
export class AppComponent  implements OnInit { name = 'Angular'; 
  	  ngOnInit(): void  {
            this.logout(); 
     }
  	   currentUser:string ;
	   subscription: Subscription;
     roleSubscription: Subscription; 
       currentRole : string ; 
       constructor(private localStorageService: LocalStorageService,private router: Router) {

       	 this.subscription = localStorageService.loginAnnounced$.subscribe(
            	currentUser => {
            	this.currentUser = currentUser;
        					   });

       this.roleSubscription = localStorageService.roleAnnounced$.subscribe(
              currentRole => {
              this.currentRole = currentRole;
             
                     });

        this.subscription = localStorageService.logoutAnnounced$.subscribe(
            empty => {
            this.currentUser = null;
       				 });
     
    }
public logout () : void 
{
  this.localStorageService.announceLogout(); 
  this.router.navigate(['/login'], { });
}


}
