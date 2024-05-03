import { Component, OnInit } from '@angular/core';
import { ModerateurService } from '../../services/moderateur.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ListBigReclamation } from '../../models/list-big-reclamation';

import { BigReclamation } from '../../models/big-reclamation'; 

@Component({
  selector: 'app-claim-mod',
  templateUrl: './claim-mod.component.html',
  styleUrl: './claim-mod.component.css'
})
export class ClaimModComponent implements OnInit {
  img1='./assets/images.jpeg';
  page=0
  rest=""
  listreclam=new ListBigReclamation() 
  m:any
  selectedReclamation: any = null;

  constructor(private moderateurservice:ModerateurService,private cookies:CookieService,private router:Router) { }


  ngOnInit(): void {
    if(!this.cookies.get('token'))
      {
        this.router.navigate(['/loginadmin'])
      }
      this.getAllReclamation()
  }
  async getAllReclamation()
  {
    const rest = await this.moderateurservice.getIdModerateur().toPromise(); 
    this.rest=rest['ModerateurId']
    const adminData = await this.moderateurservice.getModerateur(rest['ModerateurId']).toPromise()
    if(adminData)
    {
    console.log('Données du modérateur :', adminData['StationId']);
    this.m=adminData['StationId']
        //var ids=this.m.stationId
        const res = await this.moderateurservice.getAllReclamation(this.page, Number(adminData['StationId'])).subscribe((list) => {
            this.listreclam = list; 
            console.log("------------nice !!!!!-------");
          }); 
        }
          

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
     var res= await this.moderateurservice.getAllReclamation(this.page,this.m).subscribe((list) => {
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
    var res= await this.moderateurservice.getAllReclamation(this.page,this.m).subscribe((list) => {
      this.listreclam=list;  
    })
  }
  }
}
