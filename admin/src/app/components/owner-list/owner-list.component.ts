import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { GetOwnerStation } from '../../models/get-owner-station';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrl: './owner-list.component.css'
})
export class OwnerListComponent implements OnInit {
owner: any;
  constructor(private authAdminService: AdminService,private cookies:CookieService,private router:Router) { }
  allowner= new GetOwnerStation();
  page=0;
  showDeletePopup :any;
  login=""
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    if(!this.cookies.get('token'))
    { 
      this.router.navigate(['/loginadmin'])
    }
    this.getOwner()
  }
  async getOwner()
  {
    var res= await this.authAdminService.getAllOwners(this.page).subscribe((owner) => {
      this.allowner=owner;
     // this.allstation.stationborn?.
      
    })
  }
  async next()
  { 
    if(this.page<(Number(this.allowner.nbr)-1))
    {
    this.page=this.page+1
    var res= await this.authAdminService.getAllOwners(this.page).subscribe((owner) => {
      this.allowner=owner;
      console.log("----------"+this.page+"---------")
      console.log("----------"+this.allowner.nbr+"---------")
    })
  }
}
async Previous()
  { 
    if(this.page>0)
    {
    this.page=this.page-1
    var res= await this.authAdminService.getAllOwners(this.page).subscribe((owner) => {
      this.allowner=owner;
    })
  }
  }
  // Fonction pour basculer l'affichage des détails de la zone
  selectedowner: any;
  
  toggleDetails(owner: any): void {
      this.selectedowner = this.selectedowner === owner ? null : owner;
  }
  Station(owner:any)
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        // Spécifiez vos paramètres ici
        ownerid: owner.id
      }
    };
    //this.router.navigate(['/stationlist1'], navigationExtras);
    this.router.navigate(['/stationlist1'], navigationExtras);
  }
  openDeletePopup(id:any): void {
    this.showDeletePopup = id; // Corrected variable name
  }
  closePopupDelete(event: Event): void {
    // Vérifier si l'événement a été déclenché à l'intérieur du popup
    if (event.target === event.currentTarget) {
      this.showDeletePopup = null;
    }
  }
  async deleteOwner(showDeletePopup:any) {
    // Assuming the delete operation is successful
    this.showDeletePopup = null; // Hide the delete confirmation popup
    var res = await this.authAdminService.deleteOwner(showDeletePopup).toPromise()
    if(res=="ok" )
        {
         location.reload();
        }
    //this.showDeleteSuccessPopup = true; // Show the "Admin Deleted" popup 
  }
  cancelDelete() {
    this.showDeletePopup = false; // Hide the delete confirmation popup
  }
  async toggleActive(owner: any) {
    console.clear()
    console.log("ddddd "+owner.etat)
    //owner.x = !owner.x;
    if(owner.etat=="actif")
    {
      owner.etat="inactif"
      console.log("upppp "+owner.etat)
    }
    else{
      owner.etat="actif"
      console.log("upppp "+owner.etat)
    }
    var rest= await this.authAdminService.UpdateOwner(owner).toPromise();
        if(rest && rest[0] === 1)
        {
         var res= await this.authAdminService.BloquerOwner(owner).toPromise();
          console.log("updated!!!!!")

        // location.reload();
        }
  }
  async filrage() {
    this.page=0
    var res= await this.authAdminService.getAllOwnersF(this.page,this.login).subscribe((owner) => {
      this.allowner=owner;
    })
  }
}
