import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { AllAdmins } from '../../models/all-admins';
import { SuperadminService } from '../../services/superadmin.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Admin } from '../../models/admin';

@Component({
  selector: 'app-adminlist1',
  templateUrl: './adminlist1.component.html', 
  styleUrls: ['./adminlist1.component.css']
})
export class Adminlist1Component implements OnInit {
  constructor(private superadminservice: SuperadminService,private formBuilder: FormBuilder, private cookies: CookieService, private router: Router)
  {
    this.createAdminForm = this.formBuilder.group({});
  }
  email=""
  alladmin = new AllAdmins();
  createAdminForm: FormGroup;
  page = 0;
  showCreatePopup = false;
  showSuccessPopup = false;
  showEditPopup = false;
  showEditSuccessPopup = false;
  showDeletePopup :any;
  showDeleteSuccessPopup = false; // Variable to control admin deletion success popup
   newAdmin: Admin = {
    etat: "actif"
  };
  selectPhone:any
  ancienLog=""
  ancienpass=""
  ngOnInit(): void {
    if (!this.cookies.get('token')) {
      this.router.navigate(['/loginadmin']);
    }
    this.getAlladmin();
  }

  async getAlladmin() {
    var res = await this.superadminservice.getAllAdmin(this.page).subscribe((admins) => {
      this.alladmin = admins;
    });
  }

  async next() {
    if (this.page < (Number(this.alladmin.nbr) - 1)) {
      this.page = this.page + 1;
      var res = await this.superadminservice.getAllAdmin(this.page).subscribe((admins) => {
        this.alladmin = admins;
      });
    }
  }

  async Previous() {
    if (this.page > 0) {
      this.page = this.page - 1;
      var res = await this.superadminservice.getAllAdmin(this.page).subscribe((admins) => {
        this.alladmin = admins;
      });
    }
  }

  navigateToAdminDetails(id: number) {
    this.router.navigate(['/view', id]);
  }

  call(phone:any) {
    // Implement or remove this method
    this.selectPhone=phone
  }

  sendEmail() { 
    // Implement or remove this method
  }
  closePopup2(event: Event): void {
    // Vérifier si l'événement a été déclenché à l'intérieur du popup
    if (event.target === event.currentTarget) {
      this.selectPhone = null;
    }
  }
  closePopupDelete(event: Event): void {
    // Vérifier si l'événement a été déclenché à l'intérieur du popup
    if (event.target === event.currentTarget) {
      this.showDeletePopup = null;
    }
  }
  openCreatePopup(): void {
    this.newAdmin=new Admin();
    this.newAdmin.etat= "actif"
    this.showCreatePopup = true; // Corrected variable name
  }
  openEditPopup(admin:any): void {
    this.newAdmin=admin
this.ancienLog=admin.login
this.ancienpass=admin.password
    this.showEditPopup = true; // Corrected variable name
  }
  openDeletePopup(id:any): void {
    this.showDeletePopup = id; // Corrected variable name
  }

  closeCreatePopup(): void {
    this.showCreatePopup = false; // Corrected variable name
  }
  closeEditPopup(): void {
    this.showEditSuccessPopup = false; // Corrected variable name
    this.showEditPopup = false; // Corrected variable name
  }

  closeSuccessPopup(): void {
    this.showSuccessPopup = false;
  }

  closeDeletePopup(): void {
    this.showDeletePopup = null;
  }
  

  closeBothPopups(): void {
    this.closeCreatePopup(); 
    this.closeSuccessPopup();
  }
  isFormValid(): boolean {
    // Vérifier si le formulaire est valide en utilisant la propriété valid de FormGroup
    return this.createAdminForm.valid;
  }
  async submitCreateAdminForm(event: Event){
    var labelE = document.getElementById("alertexistmailcreat");
    if(labelE)
    {
      labelE.style.display = "none";
    }
    var labelE2 = document.getElementById("alertmajuscr");
    if(labelE2)
      {
        labelE2.style.display = "none";
      }
    event.preventDefault();
    if (this.isFormValid())
   {if(this.newAdmin.login)
    {
      if(this.newAdmin.login==this.newAdmin.login.toLowerCase())
    {
      var res= await this.superadminservice.getAdminByName(this.newAdmin.login).toPromise();
      if(res && res.createdAt)
      {
        if(labelE)
        {
          labelE.style.display = "block";
        }
      }
      else{
        var rest= await this.superadminservice.createAdmin(this.newAdmin).toPromise();
        if(rest && rest.createdAt)
        {
        
        location.reload();
        }
  
      } 
    }
    else{
      if(labelE2)
        {
          labelE2.style.display = "block";
        }
    }
     // this.showCreatePopup = false;
     // this.showSuccessPopup = true;
    }
   }
    
  }
  async submitEditAdminForm(event: Event){
    var labelE = document.getElementById("alertexistmailup");
    var labelE2 = document.getElementById("alertmajus");
    if(labelE2)
      {
        labelE2.style.display = "none";
      }
    if(labelE)
    {
      labelE.style.display = "none";
    }
    event.preventDefault();
    if (this.isFormValid()) {
      if(this.newAdmin.login)
    {
      if(this.newAdmin.login==this.newAdmin.login.toLowerCase())
      {
        var res= await this.superadminservice.getAdminByName(this.newAdmin.login).toPromise();
      if(res && res.createdAt && this.ancienLog!=this.newAdmin.login)
      {
        if(labelE)
        {
          labelE.style.display = "block";
        }
      }
      else{
        var rest
        if(this.ancienpass!=this.newAdmin.password)
        rest= await this.superadminservice.UpdateAdmin(this.newAdmin).toPromise();
      else{
        var ad=new Admin()
        ad.id=this.newAdmin.id
        ad.firstname=this.newAdmin.firstname
        ad.lastname=this.newAdmin.lastname
        ad.login=this.newAdmin.login
        ad.phone=this.newAdmin.phone
        ad.etat=this.newAdmin.etat
        ad.longitude=this.newAdmin.longitude
        ad.latitude=this.newAdmin.latitude
        rest= await this.superadminservice.UpdateAdmin(ad).toPromise();
        
      }
        if(rest && rest[0] === 1)
        {
          if(this.newAdmin.etat!='actif')
          {
            var result= await this.superadminservice.BloquerAdmin(this.newAdmin).toPromise();
          }
        location.reload();
        }
  
      }
      }
      else{
        if(labelE2)
          {
            labelE2.style.display = "block";
          }
      }
      // this.showEditPopup = false;
      // this.showEditSuccessPopup = true;
    }
    
    }
  }
  

  deleteAdmin(showDeletePopup:any) {
    // Assuming the delete operation is successful
    this.showDeletePopup = null; // Hide the delete confirmation popup
    var res =  this.superadminservice.deleteAdminId(showDeletePopup).toPromise()
    location.reload();
    //this.showDeleteSuccessPopup = true; // Show the "Admin Deleted" popup
  }
  
  cancelDeletePopup() {
    this.showDeletePopup = false; // Hide the delete confirmation popup
  }

  cancelSuccessPopup() {
    this.showSuccessPopup = false; // Hide the "Admin Created" popup
  }
  
  cancelBothPopups() {
    this.cancelDeletePopup();
    this.cancelSuccessPopup();
  }
  cancelDeleteSuccessPopup() {
    this.showDeleteSuccessPopup = false;
     // Hide the "Admin Deleted" popup
     
  }
  cancelDelete() {
    this.showDeletePopup = false; // Hide the delete confirmation popup
  }
  
  closeDeleteSuccessPopup(): void {
    this.showDeleteSuccessPopup = false;
  }
  async filrage() {
this.page=0
      var res = await this.superadminservice.getAllAdminF(this.page,this.email).subscribe((admins) => {
        this.alladmin = admins;
      });
  
  }
}
