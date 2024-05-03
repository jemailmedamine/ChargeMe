import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfilComponent } from './components/profil/profil.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { Body2Component } from './components/body2/body2.component';
import { ClaimModComponent } from './components/claim-mod/claim-mod.component';
import { HomeModComponent } from './components/home-mod/home-mod.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { SidemodComponent } from './components/sidemod/sidemod.component';
import { ModeratorSpaceComponent } from './components/moderator-space/moderator-space.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfilComponent,
    LoginAdminComponent,
    Body2Component,
    ClaimModComponent,
    HomeModComponent,
    ReservationComponent,
    SidemodComponent,
    ModeratorSpaceComponent
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
