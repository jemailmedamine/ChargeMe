import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../../services/owner.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ListBigReclamation } from '../../models/list-big-reclamation';
import { BigReclamation } from '../../models/big-reclamation';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html', 
  styleUrl: './claim.component.css'
})
export class ClaimComponent implements OnInit{ 
  constructor(private ownerservice:OwnerService,private cookies:CookieService,private router:Router) { }
  img1='./assets/images.jpeg';
  selectedReclamation: any = null;
  page=0
  rest=""
  listreclam=new ListBigReclamation()
  ngOnInit(): void {
    if(!this.cookies.get('token'))
    {
      this.router.navigate(['/loginowner'])
    }
    this.getAllReclamation()
  }
  async getAllReclamation()
  {
    const rest = await this.ownerservice.getIdOwner().toPromise(); 
    this.rest=rest['ProprietaireId']
    var res= await this.ownerservice.getAllReclamation(this.page,rest['ProprietaireId']).subscribe((list) => {
      this.listreclam=list; 
    })
  }
  showDetails(reclamation: BigReclamation): void {
    this.selectedReclamation = reclamation;
  }

  closePopup(): void {
    this.selectedReclamation = null;
  }
  closePopup2(event: Event): void {
    // Vérifier si l'événement a été déclenché à l'intérieur du popup
    if (event.target === event.currentTarget) {
      this.selectedReclamation = null;
    }
  }
  deleteClaim(): void {
    // Logique pour supprimer la réclamation
    console.log("Réclamation supprimée");
    this.closePopup();
  }

  replyToClaim(): void {
    // Logique pour répondre à la réclamation
    console.log("Répondre à la réclamation");
    this.closePopup();
  }
  async next()
  { 
    if(this.page<(Number(this.listreclam.nbr))-1)
    { 
    this.page=this.page+1
     var res= await this.ownerservice.getAllReclamation(this.page,this.rest).subscribe((list) => {
      this.listreclam=list; 
 
    
      console.log("----------"+this.page+"---------")
      console.log("----------"+this.listreclam.nbr+"---------")
    })
  }
  else{
    console.log("----------"+this.page+"---------")
      console.log("----------"+this.listreclam.nbr+"---------")
  }
}
async Previous()
  { 
    if(this.page>0)
    {
    this.page=this.page-1
    var res= await this.ownerservice.getAllReclamation(this.page,this.rest).subscribe((list) => {
      this.listreclam=list;  
    })
  }
  }
}
