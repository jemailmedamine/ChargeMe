import { Component } from '@angular/core';
interface SideNavToggle{
  screenwidth : number;
  collapsed:boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'owner';
  isSideNavCollapsed=false;
  screenwidht=0;
    onToggleSideNav(data: SideNavToggle): void{
    this.screenwidht=data.screenwidth;
    this.isSideNavCollapsed=data.collapsed;
  }
}
