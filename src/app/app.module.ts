import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ManagementComponent } from './management/management.component';
import { RouteNotFoundComponent } from './route-not-found/route-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManagementComponent,
    RouteNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
		BrowserAnimationsModule,

    NgbModule,

		ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
