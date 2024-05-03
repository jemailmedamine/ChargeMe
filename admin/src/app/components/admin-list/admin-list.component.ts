import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllAdmins } from '../../models/all-admins';

import { CookieService } from 'ngx-cookie-service';
import { AdminService } from '../../services/admin.service';
@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.css'
})
export class AdminListComponent implements OnInit{


constructor(private authAdminService: AdminService,private cookies:CookieService,private router:Router) { }
  email=""
  alladmin= new AllAdmins();
  selectPhone:any
  page=0
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    if(!this.cookies.get('token'))
    {
      this.router.navigate(['/loginadmin'])
    }
    this.getAlladmin()
  }

  
  async getAlladmin()
  {
    var res= await this.authAdminService.getAllAdmin(this.page).subscribe((admins) => {
      this.alladmin=admins; 
    })
  }
  async next()
  { 
    if(this.page<(Number(this.alladmin.nbr)-1))
    {
    this.page=this.page+1
    var res= await this.authAdminService.getAllAdmin(this.page).subscribe((admins) => {
      this.alladmin=admins;
      console.log("----------"+this.page+"---------")
      console.log("----------"+this.alladmin.nbr+"---------")
    })
  }
}
async Previous()
  { 
    if(this.page>0)
    {
    this.page=this.page-1
    var res= await this.authAdminService.getAllAdmin(this.page).subscribe((admins) => {
      this.alladmin=admins;
    })
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
  throw new Error('Method not implemented.');
  }

     selectedAdmin: any;

  // Fonction pour basculer l'affichage des détails de l'administrateur
  toggleDetails(admin: any): void {
    this.selectedAdmin = this.selectedAdmin === admin ? null : admin;
  } 
  closePopup2(event: Event): void {
    // Vérifier si l'événement a été déclenché à l'intérieur du popup
    if (event.target === event.currentTarget) {
      this.selectPhone = null;
    }
  }
  async filrage() {
    this.page=0
          var res = await this.authAdminService.getAllAdminF(this.page,this.email).subscribe((admins) => {
            this.alladmin = admins;
          });
      
      }
}






  
 



