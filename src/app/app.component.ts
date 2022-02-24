import { Component } from '@angular/core';
import {SessionService} from "../services/session/session.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	valid:boolean=false;
	token:string='undefined';

	constructor(
		public sessionService: SessionService
	){
		this.valid=sessionService.isValid();
		this.token=sessionService.getToken();
	}

}
