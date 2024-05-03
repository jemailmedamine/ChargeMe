import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { OwnerSpaceComponent } from './components/owner-space/owner-space.component';
import { Sidenav1Component } from './components/sidenav1/sidenav1.component';
import { Body1Component } from './components/body1/body1.component';
import { ClaimComponent } from './components/claim/claim.component';
import { HomeComponent } from './components/home/home.component';
import { LoginOwnerComponent } from './components/login-owner/login-owner.component';
import { StationsComponent } from './components/stations/stations.component';
import { ModeratorComponent } from './components/moderator/moderator.component';
import { ModifyModeratorComponent } from './components/modify-moderator/modify-moderator.component';
import { ModifyStationComponent } from './components/modify-station/modify-station.component';
import { ProfilComponent } from './components/profil/profil.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    OwnerSpaceComponent,
    Sidenav1Component,
    Body1Component,
    ClaimComponent,
    HomeComponent,
    LoginOwnerComponent,
    StationsComponent,
    ModeratorComponent,
    ModifyModeratorComponent,
    ModifyStationComponent,
    ProfilComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync(),
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
