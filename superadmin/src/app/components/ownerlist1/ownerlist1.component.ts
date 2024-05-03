import { Component, OnInit } from '@angular/core';
import { SuperadminService } from '../../services/superadmin.service';
import { CookieService } from 'ngx-cookie-service';
import { NavigationExtras, Router } from '@angular/router';
import { GetOwnerStation } from '../../models/get-owner-station';
import { Owner } from '../../models/owner';

@Component({
  selector: 'app-ownerlist1',
  templateUrl: './ownerlist1.component.html', 
  styleUrl: './ownerlist1.component.css'
})
export class Ownerlist1Component implements OnInit{
  constructor(private superadminservice:SuperadminService,private cookies:CookieService,private router:Router) { }
  login=""
  allowner= new GetOwnerStation();
  showDeletePopup :any;
  showEditSuccessPopup = false;
  page=0;
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
    var res= await this.superadminservice.getAllOwners(this.page).subscribe((owner) => {
      this.allowner=owner;
     // this.allstation.stationborn?.
      
    })
  }
  async next()
  { 
    if(this.page<(Number(this.allowner.nbr)-1))
    {
    this.page=this.page+1
    var res= await this.superadminservice.getAllOwners(this.page).subscribe((owner) => {
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
    var res= await this.superadminservice.getAllOwners(this.page).subscribe((owner) => {
      this.allowner=owner;
    })
  }
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
    var rest= await this.superadminservice.UpdateOwner(owner).toPromise();
        if(rest && rest[0] === 1)
        {
         var res= await this.superadminservice.BloquerOwner(owner).toPromise();
          console.log("updated!!!!!")

        // location.reload();
        }
  }
  fermerSuccessPopup(): void {
    this.showEditSuccessPopup = false;
  }
  closePopupDelete(event: Event): void {
    // Vérifier si l'événement a été déclenché à l'intérieur du popup
    if (event.target === event.currentTarget) {
      this.showDeletePopup = null;
    }
  }
  openDeletePopup(id:any): void {
    this.showDeletePopup = id; // Corrected variable name
  }
  async deleteOwner(showDeletePopup:any) {
    // Assuming the delete operation is successful
    this.showDeletePopup = null; // Hide the delete confirmation popup
    var res = await this.superadminservice.deleteOwner(showDeletePopup).toPromise()
    if(res=="ok" )
        {
         location.reload();
        }
    //this.showDeleteSuccessPopup = true; // Show the "Admin Deleted" popup 
  }
  cancelDelete() {
    this.showDeletePopup = false; // Hide the delete confirmation popup
  }
  async filrage() {
    this.page=0
    var res= await this.superadminservice.getAllOwnersF(this.page,this.login).subscribe((owner) => {
      this.allowner=owner;
    })
  }
}