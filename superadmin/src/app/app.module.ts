import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Body3Component } from './components/body3/body3.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Adminlist1Component } from './components/adminlist1/adminlist1.component';
import { HistoryComponent } from './components/history/history.component';
import { Moderatorlist1Component } from './components/moderatorlist1/moderatorlist1.component';
import { Ownerlist1Component } from './components/ownerlist1/ownerlist1.component';
import { ReclamationComponent } from './components/reclamation/reclamation.component';
import { Reservation1Component } from './components/reservation1/reservation1.component';
import { Sidenav3Component } from './components/sidenav3/sidenav3.component';
import { Stationlist1Component } from './components/stationlist1/stationlist1.component';
import { Userlist1Component } from './components/userlist1/userlist1.component';
import { Zoneliste1Component } from './components/zoneliste1/zoneliste1.component';
import { SuperAdminComponent } from './components/super-admin/super-admin.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChartModule } from 'angular-highcharts';


@NgModule({
  declarations: [
    AppComponent,
    Body3Component,
    Adminlist1Component,
    HistoryComponent,
    Moderatorlist1Component,
    Ownerlist1Component,
    ReclamationComponent,
    Reservation1Component,
    Sidenav3Component,
    Stationlist1Component,
    Userlist1Component,
    Zoneliste1Component,
    SuperAdminComponent,
    LoginAdminComponent,
    DashboardComponent,

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
    provideAnimationsAsync(),

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
