import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {BackendService} from "../../services/backend/backend.service";
import {LoginRequest} from "../../models/LoginRequest.model";
import {Response} from "../../models/Response.model";
import {LoginResponse} from "../../models/LoginResponse.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn:'root'
})

export class SessionService{

	private valid:boolean=false;
	private token:string='';

  constructor(
		private httpClient:HttpClient,
		private	cookieService:CookieService,
		private backendService: BackendService
	){
		this.loadTokenFromCookie();
		this.checkIfTokenIsValid();
	}

	private loadTokenFromCookie():void{
		if(this.cookieService.check('login-token')){
			this.token = this.cookieService.get('login-token');
		}
	}

	private checkIfTokenIsValid():void{
		this.valid=(this.token.length>0);
	}

	private destroySessionAndRemoveTokenFromCookie(){
		this.valid=false;
		this.token='';
		if(this.cookieService.check('login-token')) {
			this.cookieService.delete('login-token');
		}
	}

	public isValid():boolean{
		return this.valid;
	}

	public getToken():string{
		return this.token;
	}

	public setNewTokenAndCheckIfIsValid(token:string):void{
		this.token=token;
		this.cookieService.set('login-token',token);
		this.checkIfTokenIsValid();
	}

	public tryAuthenticate(handler:string,identifier:string,password:string):Observable<boolean>{
		let vLoginRequest:LoginRequest=new LoginRequest();
		vLoginRequest.handler=handler;
		vLoginRequest.identifier=identifier;
		vLoginRequest.password=password;
		console.log(vLoginRequest);
		console.log('try to authenticate...');

		/*   capire se si puo fare cosi (ora no va credo perche il subscribe risponde dopo e lui si aspetta una risposta subito
		this.backendService.POST('/Authentication/Login',vLoginRequest).subscribe(response=>{
			if(response===false){
				console.log('http call failed');  // @todo capire se serve o meno
				return false;
			}
			if(response.object!=='CAS\\Authentication\\Response\\ProfileResponse'){
				console.log('http response wrong object');
				return false;
			}
			console.log('http handler call success');

			let vLoginResponse=new LoginResponse(response.data);
			console.log(vLoginResponse);

			this.setNewTokenAndCheckIfIsValid(vLoginResponse.token);
			return true;

		});
*/

		return this.httpClient.post<any>('http://auth.coordinator.test/Authentication/Login',vLoginRequest).pipe(map(response=>{
			console.log(response);
			let vResponse=new Response(response.error,response.errors,response.object,response.data);
			let vLoginResponse=new LoginResponse(vResponse.data);
			console.log(vResponse);
			console.log(vLoginResponse);
			if(vResponse.error){
				console.log('error occurred:')
				vResponse.errors.forEach(error=>console.log(error));
				//vResponse.errors.forEach(error=>alert(error.description));
				return false;
			}else{
				console.log("login success");
				this.setNewTokenAndCheckIfIsValid(vLoginResponse.token);
				return true;
			}
		}));

	}

	logout(){
		this.destroySessionAndRemoveTokenFromCookie();
	}

}
