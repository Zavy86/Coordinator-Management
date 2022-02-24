import {Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute,ParamMap} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {FormControl,FormGroup,Validators} from "@angular/forms";
import {LoginRequest} from "../../models/LoginRequest.model";
import {LoginResponse} from "../../models/LoginResponse.model";
import {HandlerResponse} from "../../models/HandlerResponse.model";
import {SessionService} from "../../services/session/session.service";

@Component({
  selector:'app-login',
  templateUrl:'./login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent implements OnInit {

	title:string='Coordinator';
	subtitle:string='Management';

	trying:boolean=false;

	loginForm=new FormGroup({
		account:new FormControl('',Validators.required),
		password:new FormControl('', Validators.required),
		remember:new FormControl('')
	});

	token:string='';

	constructor(
		private router:Router,
		private http:HttpClient,
		private sessionService: SessionService,
		private	cookieService:CookieService
	){
	}

	ngOnInit(): void {
		console.log('login component init');
		if(this.cookieService.check('login-account')){
			this.loginForm.controls['remember'].setValue(true);
			this.loginForm.controls['account'].setValue(this.cookieService.get('login-account'));
		}
	}

	loginFormSubmit(){
		if(!this.loginForm.valid){
			console.warn('form invalido, compila tutti i campi richiesti');
			return;
		}
		console.log(this.loginForm.value);

		this.trying=true;

		if(this.sessionService.tryAuthenticate(this.loginForm.controls['account'].value,this.loginForm.controls['password'].value)){
			alert('success')
			this.router.navigateByUrl("/Hub");
		}else{
			//this.router.navigateByUrl("/Login"); già qui
			alert('failed')
		}

		this.trying=false;

		/*
		let vLoginRequest:LoginRequest=new LoginRequest();

		vLoginRequest.username=this.loginForm.controls['account'].value;
		vLoginRequest.password=this.loginForm.controls['password'].value;

		console.log(vLoginRequest);

		if(this.loginForm.controls['remember'].value){
			console.log('set login-account cookie');
			this.cookieService.set('login-account',vLoginRequest.username);
		}else{
			console.log('remove login-account cookie');
			this.cookieService.delete('login-account');
		}

		this.http.post<any>('http://coordinator-engine.test/Authentication/Authenticate',vLoginRequest).subscribe(response=>{
			console.log(response);

			let vResponse=new HandlerResponse(response.error,response.errors,response.object,response.data);
			let vLoginResponse=new LoginResponse(vResponse.data);

			console.log(vResponse);
			console.log(vLoginResponse);

			if(vResponse.error){
				vResponse.errors.forEach(error=>console.log(error));
				vResponse.errors.forEach(error=>alert(error.description));
			}else{
				console.log("login ok");
				this.token=vLoginResponse.token;  // token da mettere nell'app-root o in un service
				this.cookieService.set('login-token',this.token);
			}

		});
		*/

	}

}
