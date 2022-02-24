import {Component,OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SessionService} from "../../services/session/session.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit{

  constructor(
		private router:Router,
		private sessionService: SessionService,
	)
	{
		this.sessionService.logout();
		this.router.navigateByUrl('/Login');
	}

  ngOnInit():void{
		console.log('logout component init');
  }

}
