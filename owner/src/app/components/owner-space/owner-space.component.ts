import { Component, OnInit, } from '@angular/core';

interface SideNavToggle{
  screenwidth : number;
  collapsed:boolean;
}
@Component({
  selector: 'app-owner-space',
  templateUrl: './owner-space.component.html',
  styleUrl: './owner-space.component.css'
})
export class OwnerSpaceComponent {
  image = './assets/charge.png';
 
  isSideNavCollapsed=false;
  screenwidht=0;
  onToggleSideNav(data: SideNavToggle): void{
    this.screenwidht=data.screenwidth;
    this.isSideNavCollapsed=data.collapsed;
}
}
