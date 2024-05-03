import { Component, OnInit } from '@angular/core';

import { ModerateurService } from '../../services/moderateur.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AllBorn } from '../../models/all-born';
import { Born } from '../../models/born';

@Component({
  selector: 'app-home-mod',
  templateUrl: './home-mod.component.html',
  styleUrl: './home-mod.component.css'
})
export class HomeModComponent implements OnInit{
  showOperational=false;
  showNonOperational=false;
  constructor(private moderateurservice:ModerateurService,private cookies:CookieService,private router:Router) { }
  dispo='./assets/dispo.png';
  panne='./assets/panne.png';
  occuper='./assets/occupé.png';
  rest=""
  m:any
  allborn=new AllBorn();
  born=new Born()
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    if(!this.cookies.get('token'))
      {
        this.router.navigate(['/loginadmin'])
      }
      else{
        this.getBorn()
      }
      this.moderateurservice.listenToBornUpdate().subscribe((data) => {
        console.log('Mise à jour du client reçue:', data);
        // Mettez à jour votre interface utilisateur en fonction de la mise à jour du client
        location.reload(); 
      });
  }
 
  async getBorn()
  {
    const rest = await this.moderateurservice.getIdModerateur().toPromise(); 
    this.rest=rest['ModerateurId']
    const adminData = await this.moderateurservice.getModerateur(rest['ModerateurId']).toPromise()
    if(adminData)
    {
    console.log('Données du modérateur :', adminData['StationId']);
    this.m=adminData['StationId']
        //var ids=this.m.stationId getAllBorn
        // var res2 =  this.moderateurservice.getAllBorn(adminData['StationId']).subscribe((born) => {
        //   this.allborn = born;
        // })
        var born = await this.moderateurservice.getAllBorn(adminData['StationId']).toPromise()
        if(born)
        {
          this.allborn = born;
        }
        }
  }

  detailsBorne: any; // Stocke les détails de la borne sélectionnée pour afficher dans le popup

  afficherDetailsBorne(borne: any): void {
    //this.detailsBorne = borne;
  }
  closePopup(event: Event)
  {
    this.showOperational=false;
    this.showNonOperational=false;
  }
  fermerPopup(): void {
    this.detailsBorne = null;
  }
  setOperational(born: any): void {
    this.born =born;
    this.showOperational=true;
    }
  setNonOperational(born:any) {
    this.born =born;
    this.showNonOperational=true;
    }
async  Operational() {
  this.born.etatB = 'Dispo';
    var res= await this.moderateurservice.UpdateBorn(this.born).toPromise();
    if(res && res[0] === 1)
    {
     // location.reload();
    }
    this.showOperational=false;
}
async  NonOperational() {
    this.born.etatB = 'EnPanne';
    var res= await this.moderateurservice.UpdateBorn(this.born).toPromise();
    if(res && res[0] === 1)
    {
     // location.reload();
    }
    this.showNonOperational=false;
  }
  close() {
    this.showOperational=false;
    this.showNonOperational=false;
  }
}