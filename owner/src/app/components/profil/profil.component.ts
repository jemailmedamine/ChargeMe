import { Component, OnInit } from '@angular/core';
import { Admin } from '../../models/admin';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { OwnerService } from '../../services/owner.service'; 
import { Owner } from '../../models/owner';


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
  constructor(private ownerservice:OwnerService,private cookies:CookieService,private router:Router) { }
  currentURL = window.location.href; 
  editFirstname: any = {};
  editLastname: any = {};
  editRole: any = {};
  admin=new Owner()
  ancienpass=""
  role="none"
  ngOnInit(): void {
   
      if(!this.cookies.get('token'))
      {
        this.router.navigate(['/loginowner'])
      }
  
  
    this.getAdmin();
  }
  async getAdmin() {
   
      try {
        const res = await this.ownerservice.getIdOwner().toPromise();
        const adminData = await this.ownerservice.getOwner(res['ProprietaireId']).toPromise();
        if (adminData) {
          this.admin = adminData;
     
          if(adminData.loginType=="N")
          {
            this.admin.login = adminData.login;
          }else{
            this.admin.login = adminData.email;
          }
          
          this.admin.phone = adminData.phone;
          this.role="Owner";

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
    rest= await this.ownerservice.UpdateOwner(this.admin).toPromise();
  else{
    var ad=new Owner()
    ad.id=this.admin.id
    ad.firstname=this.admin.firstname
    ad.city=this.admin.city
    ad.codePostal=this.admin.codePostal
    ad.country=this.admin.country
    //ad.createdAt=this.admin.lastname
    ad.lastname=this.admin.lastname
    ad.street=this.admin.street
    // ad.lastname=this.admin.lastname
    // ad.lastname=this.admin.lastname
    // ad.lastname=this.admin.lastname
    
    ad.phone=this.admin.phone
    
    rest= await this.ownerservice.UpdateOwner(ad).toPromise();
    
  }
    //this.showEditSuccessPopup = true;
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