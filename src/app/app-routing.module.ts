import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {RouteNotFoundComponent} from "./route-not-found/route-not-found.component";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {ManagementComponent} from "./management/management.component";

const routes: Routes = [
	{path:'',redirectTo:'/login',pathMatch:'full'}, //hub
	{path:'login',component:LoginComponent},
	{path:'logout',component:LogoutComponent},
	//{path:'hub',component:HubComponent},
	{path:'management',component:ManagementComponent},
	{path:'**',component:RouteNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
