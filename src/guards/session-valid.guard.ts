import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot,CanActivate,Router,RouterStateSnapshot,UrlTree} from '@angular/router';
import {SessionService} from "../services/session/session.service";

@Injectable({
  providedIn: 'root'
})

export class SessionValidGuard implements CanActivate {

	constructor(
		private router:Router,
		private sessionService: SessionService,
	){
	}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree	{

		// my logic here
    if(!this.sessionService.isValid()){
			this.router.navigate(['/Login']);
		}else{
			return true;
		}
		return false;

  }

}
