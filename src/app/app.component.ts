import { Component } from '@angular/core';
import {SessionService} from "../services/session/session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	debug:boolean=false;

	constructor(
		public router:Router,
		public sessionService:SessionService
	){
	}

}
