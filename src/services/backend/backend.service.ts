import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Response} from "../../models/Response.model";

@Injectable({
	providedIn: 'root'
})

export class BackendService {

	private url:string='http://auth.coordinator.test';    // salvare da qualche parte nelle impostazioni

	private options={};

	constructor(
		private httpClient:HttpClient,
		private	cookieService:CookieService
	){
		this.loadTokenFromCookie();
	}

	public loadTokenFromCookie():void{
		if(this.cookieService.check('login-token')){
			this.options= {
				'headers': {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': 'Bearer ' + this.cookieService.get('login-token'),
					'Access-Control-Allow-Headers': 'Content-Type'
				}
			}
		}else {
			this.options = {
				'headers': {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Access-Control-Allow-Headers': 'Content-Type'
				}
			}
		}
	}

	public GET(uri:string):Observable<any>{  // impostare interfaccia dei models
		console.log('try to make http get...');
		return this.httpClient.get<any>(this.url+uri,this.options).pipe(map(response=>{
			console.log('response:');
			console.log(response);
			let vResponse=new Response(response.error,response.errors,response.object,response.data);
			console.log(vResponse);
			if(vResponse.error){
				console.log('http get errors:')
				vResponse.errors.forEach(error=>console.log(error));
				return false;
			}else{
				console.log("http get success");
				//let vProfileResponse=new ProfileResponse(vResponse.data);
				//console.log(vProfileResponse);  // @todo capire se si riesce a integrare passando direttamente nei parametri la classe della response che si vuole ottenere
				return vResponse;
			}
		}));
	}


	public POST(uri:string,request:object):Observable<any> {  // impostare interfaccia dei models e delle request
		return this.httpClient.post<any>(this.url+uri,request,this.options).pipe(map(response=>{
			console.log(response);
			let vResponse=new Response(response.error,response.errors,response.object,response.data);
			console.log(vResponse);
			if(vResponse.error){
				console.log('error occurred:')
				vResponse.errors.forEach(error=>console.log(error));
				return false;
			}else{
				console.log("login success");
				return vResponse;
			}
		}));
	}

}
