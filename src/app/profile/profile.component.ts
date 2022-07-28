import { Component, OnInit } from '@angular/core';
import {BackendService} from "../../services/backend/backend.service";
import {HandlerResponse} from "../../models/HandlerResponse.model";
import {ProfileResponse} from "../../models/ProfileResponse.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

	uid:string='Loading...';
	account:string='Loading...';
	fullname:string='Loading...';
	firstname:string='Loading...';
	lastname:string='Loading...';
	gender:string='Loading...';

	handlers:HandlerResponse[]=[];

	update_action:string='';

  constructor(
		private backendService: BackendService
	){}



  ngOnInit(): void {
		console.log('profile component init');

		// retrieve profile

		this.backendService.GET('/Profile').subscribe(response=>{
			if(response===false){
				console.log('http call failed');  // @todo capire se serve o meno
				return;
			}
			if(response.object!=='CAS\\Authentication\\Response\\ProfileResponse'){
				console.log('http response wrong object');
				return;
			}
			console.log('http handler call success');

			let profileResponse=new ProfileResponse(response.data);  // @todo capire come iniettare nella GET in modo da evitare sto passaggio e usare direttamente response

			this.uid=profileResponse.uid;
			this.account=profileResponse.account;
			this.fullname=profileResponse.fullname;
			this.firstname=profileResponse.firstname;
			this.lastname=profileResponse.lastname;
			this.gender=profileResponse.gender;

			this.update_action=profileResponse.actions.update;

			//this.handlers.forEach(this.getHandler);    perche cazzo non va cosi?
			for(let i=0; i<profileResponse.handlers.length; i++){
				this.getHandler(profileResponse.handlers[i]);
			}

		});


  }

	getHandler(uidHandler:string):void{
		this.backendService.GET(uidHandler).subscribe(response=>{
			if(response===false){
				console.log('http handler call failed');
				return;
			}
			console.log('http handler call success');

			let handlerResponse=new HandlerResponse(response.data);  // @todo capire come iniettare nella GET in modo da evitare sto passaggio e usare direttamente response

			this.handlers.push(handlerResponse);
		});
	}

}
