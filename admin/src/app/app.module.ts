import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminSpaceComponent } from './components/admin-space/admin-space.component';
import { BodyComponent } from './components/body/body.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificationPopupComponent } from './components/notification-popup/notification-popup.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { AdminListComponent } from './components/admin-list/admin-list.component';
import { ViewComponent } from './components/view/view.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OwnerListComponent } from './components/owner-list/owner-list.component';
import { DetailsOwnerComponent } from './components/details-owner/details-owner.component';
import { ProfilComponent } from './components/profil/profil.component';
import { EditProfilComponent } from './components/edit-profil/edit-profil.component';
import { StationlistComponent } from './components/stationlist/stationlist.component';
import { CreatestationComponent } from './components/createstation/createstation.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ZoneListComponent } from './components/zone-list/zone-list.component';
import { ChartModule } from 'angular-highcharts';
@NgModule({
  declarations: [
    AppComponent,
    AdminSpaceComponent,
    BodyComponent,
    NotificationPopupComponent,
    SidenavComponent,
    LoginAdminComponent,
    AdminListComponent,
    ViewComponent,
    DashboardComponent,
    OwnerListComponent,
    DetailsOwnerComponent,
    ProfilComponent,
    EditProfilComponent,
    StationlistComponent,
    CreatestationComponent,
    UserListComponent,
    ZoneListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ChartModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
