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
	failed:boolean=false;

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
		this.sessionService.logout();
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

		this.sessionService.tryAuthenticate(this.loginForm.controls['account'].value,this.loginForm.controls['password'].value).subscribe(ret=>{
			if(ret){
				//alert('success')
				this.router.navigateByUrl("/Hub");
			}else{
				this.failed=true;
				setTimeout(()=>{this.failed=false;},9*1000);
			}

			this.trying=false;

		});

		// per evitare problemi se si dovesse piantare qualcosa blocco dopo un timeout di 60 secondi
		setTimeout(()=>{this.trying=false;},60*1000);

	}

}
