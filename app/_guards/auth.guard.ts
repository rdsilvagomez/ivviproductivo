import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            var role = localStorage.getItem('currentRol');
			var url = state.url;
			 
		 
			if (url=== "\\login")
			{  
				return true; 
			}

			if (role ==="admin")
			{
				return true ; 
			}

			if (role === "proveedor" ) 
			{
			 
				 if (url.indexOf("solcotizacion") !=-1  )
					 {
					 		return true; 
					 }
					  
					
					//}
				//else
				//	{
				 
				//}

				/*
					"\\habilitacion"
					"\\asociacion"
					"\\grupos"
					"\\proveedores"
					"\\solcotizacion"
				*/	
				}
			
            return true;
        }
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}


