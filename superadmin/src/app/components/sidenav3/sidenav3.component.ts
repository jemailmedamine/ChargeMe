import { Component, Output,EventEmitter, OnInit, HostListener} from '@angular/core';
import{navbardata} from'./nav-data3';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
interface SideNavToggle{
  screenwidth : number;
  collapsed:boolean;
}
 
@Component({
  selector: 'app-sidenav3',
  templateUrl: './sidenav3.component.html', 
  styleUrl: './sidenav3.component.css'
})
export class Sidenav3Component {
  image = './assets/charge.png';
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> =new EventEmitter();
  constructor( private cookies:CookieService,private router:Router) { }
 collapsed=false;
 navdata=navbardata;
   screenwidth= 0;
   @HostListener('window:resiez',['$event'])
   onResize(event:any){
     this.screenwidth =window.innerWidth;
     if(this.screenwidth<=768){
       this.collapsed=false;
       this.onToggleSideNav.emit({collapsed: this.collapsed,screenwidth:this.screenwidth});
 
     }
     
   }
   ngOnInit(): void {
     this.screenwidth =window.innerWidth;
   }
   tokenIsExiste(): boolean{
    if(this.cookies.get('token'))
    {
      return true
    }
    else{
      this.closeSidenav();
      return false
    }
  }
 toggleCollapse():void{
   this.collapsed=!this.collapsed;
   this.onToggleSideNav.emit({collapsed:this.collapsed, screenwidth:this.screenwidth})
 }
 closeSidenav():void{
   this.collapsed=false;
   this.onToggleSideNav.emit({collapsed:this.collapsed, screenwidth:this.screenwidth})
 }
}
