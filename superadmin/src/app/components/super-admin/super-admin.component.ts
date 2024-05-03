import { Component,OnInit } from '@angular/core';
interface SideNavToggle{
  screenwidth : number;
  collapsed:boolean;}
@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrl: './super-admin.component.css'
})
export class SuperAdminComponent {
  image = './assets/charge.png';
 
  isSideNavCollapsed=false;
  screenwidht=0;
  onToggleSideNav(data: SideNavToggle): void{
    this.screenwidht=data.screenwidth;
    this.isSideNavCollapsed=data.collapsed;
}
}
