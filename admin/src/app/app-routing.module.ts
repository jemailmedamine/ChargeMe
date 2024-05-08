import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminSpaceComponent } from './components/admin-space/admin-space.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminListComponent } from './components/admin-list/admin-list.component';
import { OwnerListComponent } from './components/owner-list/owner-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ZoneListComponent } from './components/zone-list/zone-list.component';
import { StationlistComponent } from './components/stationlist/stationlist.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ViewComponent } from './components/view/view.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { CreatestationComponent } from './components/createstation/createstation.component';

const routes: Routes = [
  // Other routes
  //{ path: 'create', component: CreateAdminModalComponent }, // Add this line for the "create" modal route
  // Other routes
  { path: 'loginadmin', component: LoginAdminComponent },
  { path: 'admin-space', component: AdminSpaceComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'adminlist', component: AdminListComponent },
  { path: 'ownerlist', component: OwnerListComponent },
  { path: 'userlist', component: UserListComponent },
  { path: 'zonelist', component: ZoneListComponent },
  { path: 'stationlist', component: StationlistComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'view/:id', component: ViewComponent },
  { path: 'createstation', component: CreatestationComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
