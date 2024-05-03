import { Component,Input,OnInit,input } from '@angular/core';
import { NotificationService } from './notif.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from '../../services/admin.service';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent implements OnInit {
  image='./assets/charge.png';
  bgimage='./assets/rectangle.png';
  @Input() collapsed=false;
  @Input() screenWidth=0;

getBodyClass(): string {
  let styleClass='';
  if(this.collapsed&&this.screenWidth> 768){
    styleClass='body-trimmed';
  }else if(this.collapsed && this.screenWidth<=768 && this.screenWidth>0){
    styleClass='body-md-screen'
  }
 return styleClass;
}

constructor(private authAdminService: AdminService,private notificationService: NotificationService, private cookies:CookieService,private router:Router) { }
ngOnInit(): void {
  //throw new Error('Method not implemented.');
  if(!this.cookies.get('token'))
  { 
    this.router.navigate(['/loginadmin']) 
  }
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
showNotifications() {
  // Appelez une méthode dans le service de notification pour obtenir les notifications
  this.notificationService.getNotifications().subscribe(notifications => {
    // Affichez les notifications dans une boîte de dialogue ou un autre composant de notification
    console.log(notifications); // Exemple de traitement des notifications
  });
}
logout()
{ 
  var res=this.authAdminService.logout().toPromise();
  this.cookies.deleteAll();
  this.router.navigate(['/loginadmin']) 
}

isNotificationPopupOpen: boolean = false;

toggleNotificationPopup(): void {
  this.isNotificationPopupOpen = !this.isNotificationPopupOpen;
}
}
