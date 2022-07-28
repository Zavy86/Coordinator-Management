import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../services/profile/profile.service";
import {SessionService} from "../../services/session/session.service";

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

	update_action:string='';

  constructor(
		private profileService: ProfileService
	){}

  ngOnInit(): void {
		console.log('profile component init');
		this.profileService.getProfile().subscribe(response=>{
			if(response===false){
				console.log('http call failed');
				return;
			}

			console.log('http call success');
			this.uid=response.uid;
			this.account=response.account;
			this.fullname=response.fullname;
			this.firstname=response.firstname;
			this.lastname=response.lastname;
			this.gender=response.gender;
			this.handlers=response.handlers;
			//this.update_action=response.actions.update;

		});
  }

}
