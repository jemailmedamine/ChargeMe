import { Component,Input,OnInit,input } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ModerateurService } from '../../services/moderateur.service';

@Component({
  selector: 'app-body2',
  templateUrl: './body2.component.html',
  styleUrl: './body2.component.css'
})
export class Body2Component implements OnInit{
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
showNotification: boolean = false;
constructor(private moderateurservice:ModerateurService, private cookies:CookieService,private router:Router) { }
ngOnInit(): void {
  //throw new Error('Method not implemented.');
  if(!this.cookies.get('token'))
  { 
    
    this.router.navigate(['/loginadmin']) 
    
  }
}

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
  var res=this.moderateurservice.logout().toPromise();
    this.cookies.deleteAll();
  this.router.navigate(['/loginadmin']) 

 
}
}
