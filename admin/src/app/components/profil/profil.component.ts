import { Component, OnInit } from '@angular/core';
import { Admin } from '../../models/admin';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit{
showProfileEditPopup: any;
  imgprofil='./assets/images.jpeg';
editEmail: any;
editPhoneNumber: any;
showEditSuccessPopup: any;
  constructor(private authAdminService: AdminService,private cookies:CookieService,private router:Router) { }
  currentURL = window.location.href; 
  editFirstname: any = {};
  editLastname: any = {};
  editRole: any = {};
  admin=new Admin()
  ancienpass=""
  role="none"
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
   
      if(!this.cookies.get('token'))
      {
        this.router.navigate(['/loginadmin'])
      }
    this.getAdmin();
  }
  async getAdmin() {
    
    try {
      const res = await this.authAdminService.getIdAdmin().toPromise();
      const adminData = await this.authAdminService.getAdmin(res['AdminId']).toPromise();
      if (adminData) {
        this.admin = adminData;
        this.role="Admin";
      } else {
        // Handle the case where adminData is undefined (e.g., show error message)
      }
    } catch (error) {
      console.error(error);
    }
     
  }
  editProfile(admin:any): void {
    this.ancienpass=admin.password
    this.showProfileEditPopup = true;

  }
  async submitEditProfileForm() {
    var rest
        if(this.ancienpass!=this.admin.password)
        rest= await this.authAdminService.UpdateAdmin(this.admin).toPromise();
      else{
        var ad=new Admin()
        ad.id=this.admin.id
        ad.firstname=this.admin.firstname
        ad.lastname=this.admin.lastname
        ad.login=this.admin.login
        ad.phone=this.admin.phone
        ad.etat=this.admin.etat
        ad.longitude=this.admin.longitude
        ad.latitude=this.admin.latitude
        rest= await this.authAdminService.UpdateAdmin(ad).toPromise();
        
      }
    this.showEditSuccessPopup = true;
    this.showProfileEditPopup = false;
  }
  closeEditProfileForm(): void {
    this.showProfileEditPopup = false;
  }
  closeEditPopup(): void {
    this.showEditSuccessPopup = false;
    this.showProfileEditPopup = false;
  }
}