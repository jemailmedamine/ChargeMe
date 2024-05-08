import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { CreateAdminModalComponent } from './create-admin-modal/create-admin-modal.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { Adminlist1Component } from './components/adminlist1/adminlist1.component';
import { Ownerlist1Component } from './components/ownerlist1/ownerlist1.component';
import { Stationlist1Component } from './components/stationlist1/stationlist1.component';
import { Moderatorlist1Component } from './components/moderatorlist1/moderatorlist1.component';
import { ReclamationComponent } from './components/reclamation/reclamation.component';
import { Zoneliste1Component } from './components/zoneliste1/zoneliste1.component';
import { Userlist1Component } from './components/userlist1/userlist1.component';
import { Reservation1Component } from './components/reservation1/reservation1.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { HistoryComponent } from './components/history/history.component';


const routes: Routes = [
  { path: 'loginadmin', component: LoginAdminComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'adminlist1', component: Adminlist1Component },
  { path: 'ownerlist1', component: Ownerlist1Component },
  { path: 'stationlist1', component: Stationlist1Component },
  { path: 'moderatorlist1', component: Moderatorlist1Component }, 
  { path: 'zoneliste1', component: Zoneliste1Component },
  { path: 'userlist1', component: Userlist1Component },
  { path: 'reclamation', component: ReclamationComponent },
  { path: 'historique', component: HistoryComponent },
  { path: 'reservation1', component: Reservation1Component },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
