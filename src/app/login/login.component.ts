import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	title = 'Coordinator';
	subtitle = 'Management';

	loginForm = new FormGroup({
		account: new FormControl('',Validators.required),
		password: new FormControl('', Validators.required),
		remember: new FormControl('')
	});

  constructor() { }

  ngOnInit(): void {
		console.log('login init');
  }

	loginFormSubmit(){
		if(!this.loginForm.valid){
			console.warn("form invalido, compila tutti i campi richiesti");
			return;
		}
		console.log(this.loginForm.value);
	}

}
