import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {SessionValidGuard} from "../guards/session-valid.guard";
import {RouteNotFoundComponent} from "./route-not-found/route-not-found.component";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {ProfileComponent} from "./profile/profile.component";
import {HubComponent} from "./hub/hub.component";
import {ManagementComponent} from "./management/management.component";

const routes: Routes = [
	{path:'',redirectTo:'/Hub',pathMatch:'full'},
	{path:'Login',component:LoginComponent},
	{path:'Logout',component:LogoutComponent},
	{path:'Hub',component:HubComponent,canActivate:[SessionValidGuard]},
	{path:'Profile',component:ProfileComponent,canActivate:[SessionValidGuard]},
	{path:'Management',component:ManagementComponent,canActivate:[SessionValidGuard]},
	{path:'**',component:RouteNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
