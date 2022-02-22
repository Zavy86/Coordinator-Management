import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ManagementComponent} from "./management/management.component";
import {RouteNotFoundComponent} from "./route-not-found/route-not-found.component";

const routes: Routes = [
	{path:'',redirectTo:'/login',pathMatch:'full'},
	{path:'login',component:LoginComponent},
	{path:'management',component:ManagementComponent},
	{path:'**',component:RouteNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
