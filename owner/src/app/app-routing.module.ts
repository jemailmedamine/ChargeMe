import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignUpComponent } from './components/sign-up/sign-up.component';

import { HomeComponent } from './components/home/home.component';
import { ModeratorComponent } from './components/moderator/moderator.component';
import { StationsComponent } from './components/stations/stations.component';
import { ClaimComponent } from './components/claim/claim.component';
import { ModifyModeratorComponent } from './components/modify-moderator/modify-moderator.component';
import { ModifyStationComponent } from './components/modify-station/modify-station.component';
import { ProfilComponent } from './components/profil/profil.component';
import { LoginOwnerComponent } from './components/login-owner/login-owner.component';

const routes: Routes = [

  { path: 'loginowner', component: LoginOwnerComponent },
  { path: 'SinUp', component: SignUpComponent },
  { path: 'home', component: HomeComponent },
  { path: 'moderator', component: ModeratorComponent },
  { path: 'stations', component: StationsComponent },
  { path: 'claim', component: ClaimComponent },
  { path: 'modify-moderator', component: ModifyModeratorComponent },
  { path: 'modify-station', component: ModifyStationComponent },
  { path: 'modify-moderator/:id', component: ModifyModeratorComponent }, 
  { path: 'profil', component: ProfilComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
