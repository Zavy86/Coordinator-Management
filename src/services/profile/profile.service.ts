import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HandlerResponse} from "../../models/HandlerResponse.model";
import {ProfileResponse} from "../../models/ProfileResponse.model";

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

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

	public getProfile():Observable<ProfileResponse|false>{

		const options = {
			'headers' : {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + this.token,
				'Access-Control-Allow-Headers': 'Content-Type'
			}
		}

		console.log('try to retrieve profile...');
		return this.httpClient.get<any>('http://auth.coordinator.test/Profile',options).pipe(map(response=>{
			console.log('response:');
			console.log(response);
			let vResponse=new HandlerResponse(response.error,response.errors,response.object,response.data);
			let vProfileResponse=new ProfileResponse(vResponse.data);
			console.log(vResponse);
			console.log(vProfileResponse);
			if(vResponse.error){
				console.log('error occurred:')
				vResponse.errors.forEach(error=>console.log(error));
				//vResponse.errors.forEach(error=>alert(error.description));
				return false;
			}else{
				console.log("profile retrieve success");
				return vProfileResponse;
			}
		}));
	}

}
