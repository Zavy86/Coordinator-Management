import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../services/profile/profile.service";
import {HandlerService} from "../../services/handler/handler.service";
import {HandlerResponse} from "../../models/HandlerResponse.model";

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

	handlers:string[]=['Loading...'];

	handlers_objs:HandlerResponse[]=[];

	update_action:string='';

  constructor(
		private profileService: ProfileService,
		private handlerService: HandlerService
	){}



  ngOnInit(): void {

		console.log('profile component init');

		this.profileService.getProfile().subscribe(response=>{
			if(response===false){
				console.log('http profile call failed');
				return;
			}

			console.log('http profile call success');

			this.uid=response.uid;
			this.account=response.account;
			this.fullname=response.fullname;
			this.firstname=response.firstname;
			this.lastname=response.lastname;
			this.gender=response.gender;
			this.handlers=response.handlers;

			this.update_action=response.actions.update;

			//this.handlers.forEach(this.getHandler);    perche cazzo non va cosi?
			for(let i=0; i<this.handlers.length; i++){
				this.getHandler(this.handlers[i]);
			}

		});

  }

	getHandler(uidHandler:string):void{
		this.handlerService.getHandler(uidHandler).subscribe(response=>{
			if(response===false){
				console.log('http handler call failed');
				return;
			}
			console.log('http handler call success');
			this.handlers_objs.push(response);
		});
	}

}
