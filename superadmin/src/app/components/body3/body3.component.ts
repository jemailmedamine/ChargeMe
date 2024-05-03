import { Component,Input,OnInit,input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SuperadminService } from '../../services/superadmin.service';
import { Admin } from '../../models/admin';

@Component({
  selector: 'app-body3',
  templateUrl: './body3.component.html', 
  styleUrl: './body3.component.css'
})
export class Body3Component implements OnInit {
  ancienPass=""
 admin=new Admin()
  showProfilePopup=false;
  showUpdateProfilePopup=false; 
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

constructor(private superadminservice: SuperadminService, private cookies:CookieService,private router:Router) { }
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
logout()
{ 
 
  var res=this.superadminservice.logout().toPromise();
  this.cookies.deleteAll();
  this.router.navigate(['/loginadmin']) 
}
async openProfilePopup()
{
  //superAdminId
  try {
    const res = await this.superadminservice.getIdSuperAdmin().toPromise();
    const adminData = await this.superadminservice.getSuperAdmin(res['superAdminId']).toPromise();
    if (adminData) {
      this.admin = adminData;
      if(this.admin.password)
     this.ancienPass=this.admin.password
    } else {
      // Handle the case where adminData is undefined (e.g., show error message)
      console.log('adminData is undefined probleme de getSuperAdmin');
    }
  } catch (error) {
    console.error(error);
  }
  this.showProfilePopup=true;
}
closeProfilePopup() {
  this.ancienPass=""
  this.showProfilePopup=false;
  }
  async UpdateProfilePopup() {
    var rest
    if(this.ancienPass!=this.admin.password)
    rest= await this.superadminservice.UpdateSuperAdmin(this.admin).toPromise();
  else{
    var ad=new Admin()
    ad.id=this.admin.id
    ad.login=this.admin.login
    rest= await this.superadminservice.UpdateSuperAdmin(ad).toPromise();
    
  }
    this.showProfilePopup=false;
    this.showUpdateProfilePopup=true;
  }
  closeUpdateProfilePopup() {
    this.showUpdateProfilePopup=false;
  }
} 
