import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Response} from "../../models/Response.model";
import {HandlerResponse} from "../../models/HandlerResponse.model";

@Injectable({
  providedIn: 'root'
})

export class HandlerService {

	private token:string='';

	constructor(
		private httpClient:HttpClient,
		private	cookieService:CookieService
	){
		this.loadTokenFromCookie();
	}

	private loadTokenFromCookie():void{
		if(this.cookieService.check('login-token')){
			this.token = this.cookieService.get('login-token');
		}
	}

	public getHandler(uidHandler:string):Observable<HandlerResponse|false>{

		const options = {
			'headers' : {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + this.token,
				'Access-Control-Allow-Headers': 'Content-Type'
			}
		}

		console.log('try to retrieve profile...'); // tolto in quanto passa da solo /Handlers/  fare a questo punto unico servizio e ritornare any e dedicedere dal chiamante
		return this.httpClient.get<any>('http://auth.coordinator.test'+uidHandler,options).pipe(map(response=>{
			console.log('response:');
			console.log(response);
			let vResponse=new Response(response.error,response.errors,response.object,response.data);
			let vHandlerResponse=new HandlerResponse(vResponse.data);
			console.log(vResponse);
			console.log(vHandlerResponse);
			if(vResponse.error){
				console.log('error occurred:')
				vResponse.errors.forEach(error=>console.log(error));
				//vResponse.errors.forEach(error=>alert(error.description));
				return false;
			}else{
				console.log("profile retrieve success");
				return vHandlerResponse;
			}
		}));
	}

}
