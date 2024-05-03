import { Component, OnInit } from '@angular/core';
import { Admin } from '../../models/admin';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { ModerateurService } from '../../services/moderateur.service';

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
ancienpass=""
showEditSuccessPopup: any;
  constructor(private moderateurservice:ModerateurService,private cookies:CookieService,private router:Router) { }
  currentURL = window.location.href; 
  editFirstname: any = {};
  editLastname: any = {};
  editRole: any = {};
  admin=new Admin()
  role="none"
  ngOnInit(): void {
    
      if(!this.cookies.get('token'))
      {
        this.router.navigate(['/loginadmin'])
      }
    
  
    this.getAdmin();
  }
  async getAdmin() {
    
      try {
        const res = await this.moderateurservice.getIdModerateur().toPromise();
        const adminData = await this.moderateurservice.getModerateur(res['ModerateurId']).toPromise();
        if (adminData) {
          this.admin.id = adminData.id;
          this.admin.firstname = adminData.firstname;
          this.admin.password = adminData.password;
          this.admin.lastname = adminData.lastname;
          this.admin.login = adminData.login;
          this.admin.phone = adminData.phone;
          this.role="Moderator";

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
        rest= await this.moderateurservice.UpdateModerateur(this.admin).toPromise();
      else{
        var ad=new Admin()
        ad.id=this.admin.id
        ad.firstname=this.admin.firstname
        ad.lastname=this.admin.lastname
        
        ad.phone=this.admin.phone
        
        rest= await this.moderateurservice.UpdateModerateur(ad).toPromise();
        
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