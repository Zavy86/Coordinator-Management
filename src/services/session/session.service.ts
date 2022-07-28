import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {LoginRequest} from "../../models/LoginRequest.model";
import {HandlerResponse} from "../../models/HandlerResponse.model";
import {LoginResponse} from "../../models/LoginResponse.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn:'root'
})

export class SessionService{

	private valid:boolean=false;
	private token:string='';

  constructor(
		private router:Router,
		private httpClient:HttpClient,
		private	cookieService:CookieService
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

	public tryAuthenticate(identifier:string,password:string):Observable<boolean>{
		let vLoginRequest:LoginRequest=new LoginRequest();
		vLoginRequest.handler='local';
		vLoginRequest.identifier=identifier;
		vLoginRequest.password=password;
		console.log(vLoginRequest);
		console.log('try to authenticate...');
		return this.httpClient.post<any>('http://auth.coordinator.test/Authentication/Login',vLoginRequest).pipe(map(response=>{
			console.log(response);
			let vResponse=new HandlerResponse(response.error,response.errors,response.object,response.data);
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
