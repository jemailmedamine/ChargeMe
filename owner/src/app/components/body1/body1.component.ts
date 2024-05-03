import { Component,Input,OnInit,input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { OwnerService } from '../../services/owner.service';


@Component({
  selector: 'app-body1',
  templateUrl: './body1.component.html',
  styleUrl: './body1.component.css'
})
export class Body1Component implements OnInit{
  image='./assets/charge.png';
  bgimage='./assets/rectangle.png';
  @Input() collapsed=false;
  @Input() screenWidth=0;

getBodyClass(): string { 
  let styleClass='';
  if(this.collapsed&&this.screenWidth> 768){
    styleClass='body1-trimmed';
  }else if(this.collapsed && this.screenWidth<=768 && this.screenWidth>0){
    styleClass='body1-md-screen'
  }
 return styleClass;
}
constructor(private ownerservice:OwnerService, private cookies:CookieService,private router:Router) { }
currentURL = window.location.href; 
ngOnInit(): void {
  // throw new Error('Method not implemented.');
  if(!this.cookies.get('token'))
  {  if(this.currentURL.includes("SinUp"))
  {
      this.router.navigate(['/SinUp'])
  }
   else 
    this.router.navigate(['/loginowner']) 
   
  }
 }

showNotification: boolean = false;

toggleNotification(): void {
  this.showNotification = !this.showNotification;
}

closeNotification(): void {
  this.showNotification = false;
}
tokenIsExiste(): boolean{
  if(this.cookies.get('token'))
  {
    return true
  }
  else{
    return false
  }
}
logout()
{ 
  var res=this.ownerservice.logout().toPromise();
    this.cookies.deleteAll();
  this.router.navigate(['/loginowner']) 
 
}
}

