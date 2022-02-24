import { Component, OnInit } from '@angular/core';
import {SessionService} from "../../services/session/session.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	isMenuCollapsed:boolean=true;

  constructor(
		public sessionService: SessionService
	){}

  ngOnInit(): void {
  }

}
