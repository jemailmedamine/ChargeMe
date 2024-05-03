import { Component, OnInit, } from '@angular/core';

interface SideNavToggle{
  screenwidth : number;
  collapsed:boolean;
}
 
@Component({
  selector: 'app-moderator-space',
  templateUrl: './moderator-space.component.html',
  styleUrl: './moderator-space.component.css'
})
export class ModeratorSpaceComponent {
  image = './assets/charge.png';
 
  isSideNavCollapsed=false;
  screenwidht=0;
  onToggleSideNav(data: SideNavToggle): void{
    this.screenwidht=data.screenwidth;
    this.isSideNavCollapsed=data.collapsed;
}
}
