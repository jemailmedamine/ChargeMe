import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../../services/owner.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AllMoedrateur } from '../../models/all-moedrateur';

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrl: './moderator.component.css'
})
export class ModeratorComponent implements OnInit {
  DeletePopup=false; 
  DeleteSuccessPopup=false;
  constructor(private ownerservice:OwnerService,private cookies:CookieService,private router:Router) { }
  page=0
  login=""
  rest=""
  allmoderateur=new AllMoedrateur()
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    if(!this.cookies.get('token'))
    {
      this.router.navigate(['/loginowner'])
    }
    this.getAllModerateur()
  }
  async getAllModerateur()
  {
    const rest = await this.ownerservice.getIdOwner().toPromise(); 
    this.rest=rest['ProprietaireId']
    var res= await this.ownerservice.getAllModerateur(this.page,rest['ProprietaireId']).subscribe((moderator) => {
      this.allmoderateur=moderator; 
    })
  }
  async next()
  { 
    if(this.page<(Number(this.allmoderateur.nbr)-1))
    {
    this.page=this.page+1
    var res= await this.ownerservice.getAllModerateur(this.page,this.rest).subscribe((moderator) => {
      this.allmoderateur=moderator; 
    
      console.log("----------"+this.page+"---------")
      console.log("----------"+this.allmoderateur.nbr+"---------")
    })
  }
}
async Previous()
  { 
    if(this.page>0) 
    {
    this.page=this.page-1
    var res= await this.ownerservice.getAllModerateur(this.page,this.rest).subscribe((moderator) => {
      this.allmoderateur=moderator; 
    })
  }
  }
  async toggleActive(mod: any) {
    console.clear()
    if(mod.etat=="actif")
    {
      mod.etat="inactif"
      console.log("upppp "+mod.etat)
    }
    else{
      mod.etat="actif"
      console.log("upppp "+mod.etat)
    }
    var rest= await this.ownerservice.UpdateModerateur(mod).toPromise();
        if(rest && rest[0] === 1)
        {
         var res= await this.ownerservice.BloquerModerateur(mod).toPromise();
          console.log("updated!!!!!")

        // location.reload();
        }
  
  }
  showDeletePopup() {
    this.DeletePopup = true;
  }
  cancelDelete() {
    this.DeletePopup = false;
    this.DeleteSuccessPopup = false;
  }
  showDeleteSuccessPopup() {
    this.DeletePopup = false;
    this.DeleteSuccessPopup = true;
  }
  async filrage() {
    this.page=0
    var res= await this.ownerservice.getAllModerateurF(this.page,this.rest,this.login).subscribe((moderator) => {
      this.allmoderateur=moderator; 
    })
  }
}

