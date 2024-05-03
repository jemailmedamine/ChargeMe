import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { CreateAdminModalComponent } from './create-admin-modal/create-admin-modal.component';

import { ProfilComponent } from './components/profil/profil.component';

import { HomeModComponent } from './components/home-mod/home-mod.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ClaimModComponent } from './components/claim-mod/claim-mod.component';


import { LoginAdminComponent } from './components/login-admin/login-admin.component';

const routes: Routes = [
  // Other routes
  //{ path: 'create', component: CreateAdminModalComponent }, // Add this line for the "create" modal route
  // Other routes
  { path: 'loginadmin', component: LoginAdminComponent },

  { path: 'profil', component: ProfilComponent },
  { path: 'home-mod', component: HomeModComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'claim-mod', component: ClaimModComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
