import { Component, Output,EventEmitter, OnInit, HostListener} from '@angular/core';
import{navbardata} from'../admin-space/nav-data';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
interface SideNavToggle{
  screenwidth : number;
  collapsed:boolean;
}

@Component({ 
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit {
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
    if(!this.cookies.get('token'))
    {
      this.router.navigate(['/loginadmin'])
    }
    this.screenwidth =window.innerWidth;
  }
  tokenIsExiste(): boolean{
    if(this.cookies.get('token'))
    {
      return true
    }
    else{
      this.closeSidenav()
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
