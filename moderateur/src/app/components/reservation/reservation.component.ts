import { Component, OnInit } from '@angular/core';
import { ModerateurService } from '../../services/moderateur.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ListeReservation } from '../../models/liste-reservation';
import { Reservation } from '../../models/reservation';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'] 
})
export class ReservationComponent implements OnInit {
  statePopup:any;

  constructor(private moderateurservice:ModerateurService,private cookies:CookieService,private router:Router) { }
  page=0
  rest=""
  listreserv=new ListeReservation()
  m:any
  img1 = './assets/images.jpeg'; 
  showPopup = false;
  reservationModifiee: any; // Stocke la réservation à modifier
  etat="EnCour"
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    if(!this.cookies.get('token'))
      {
        this.router.navigate(['/loginadmin'])
      }
      this.getAllReservation()
  }
  async getAllReservation()
  {
    const rest = await this.moderateurservice.getIdModerateur().toPromise(); 
    this.rest=rest['ModerateurId']
    const adminData = await this.moderateurservice.getModerateur(rest['ModerateurId']).toPromise()
    if(adminData)
    {
    console.log('Données du modérateur :', adminData['StationId']);
    this.m=adminData['StationId']
        //var ids=this.m.stationId
        this.etat="EnCour"
        const res = await this.moderateurservice.getAllReservation(this.page, Number(adminData['StationId']),this.etat).subscribe((list) => {
            this.listreserv = list; 
            console.log("------------nice !!!!!-------");
            console.log("------------"+this.listreserv.nbr+"-------");
          }); 
        }
  }
  async next()
  { 
    if(this.page<(Number(this.listreserv.nbr))-1 )
    { 
    this.page=this.page+1
     var res= await this.moderateurservice.getAllReservation(this.page,this.m,this.etat).subscribe((list) => {
      this.listreserv=list; 
 
    
      console.log("----------"+this.page+"---------")
      console.log("----------"+this.listreserv.nbr+"---------")
    })
  }
  else{
    console.log("----------"+this.page+"---------")
      console.log("----------"+this.listreserv.nbr+"---------")
  }
}
async Previous()
  { 
    if(this.page>0)
    {
    this.page=this.page-1
    var res= await this.moderateurservice.getAllReservation(this.page,this.m,this.etat).subscribe((list) => {
      this.listreserv=list;  
    })
  }
  }
  modifierReservation(reservation: Reservation): void {
    this.reservationModifiee = reservation;
    this.statePopup = reservation;
  }

  supprimerReservation(reservation: Reservation): void {
    // Logique de suppression de la réservation
  }

  fermerPopup(): void {
    this.showPopup = false;
    this.reservationModifiee = null;
  }
 


async   ongoing() {
  this.page=0
  this.etat="EnCour"
  const res = await this.moderateurservice.getAllReservation(this.page,this.m,this.etat).subscribe((list) => {
      this.listreserv = list; 
      console.log("------------nice !!!!!-------");
      console.log("------------"+this.listreserv.nbr+"-------");
    }); 
      }
async   cancelledlist() {
  this.page=0
  this.etat="Annuler"
  const res = await this.moderateurservice.getAllReservation(this.page,this.m,this.etat).subscribe((list) => {
      this.listreserv = list; 
      console.log("------------nice !!!!!-------");
      console.log("------------"+this.listreserv.nbr+"-------");
    }); 
      }
async   finishedlist() {
  this.page=0
  this.etat="Terminer"
  const res = await this.moderateurservice.getAllReservation(this.page,this.m,this.etat).subscribe((list) => {
      this.listreserv = list; 
      console.log("------------nice !!!!!-------");
      console.log("------------"+this.listreserv.nbr+"-------");
    }); 
      }      
async   finished() {
    this.statePopup.etat='Terminer';
    var  rest= await this.moderateurservice.UpdateReserv(this.statePopup).toPromise();
    if(rest && rest[0] === 1)
    {
      location.reload();
    }
      }
async  cancelled() {
    this.statePopup.etat='Annuler';
    var  rest= await this.moderateurservice.UpdateReserv(this.statePopup).toPromise();
    if(rest && rest[0] === 1)
    {
      location.reload();
    }
    }
  async  undo(reservation:any) {
    reservation.etat='EnCour';
      var  rest= await this.moderateurservice.UpdateReserv(reservation).toPromise();
      if(rest && rest[0] === 1)
      {
       // location.reload();
      }
      }   
  closePopup (event: Event): void {
        if (event.target === event.currentTarget) {
          this.statePopup = false;
        }
      }
      subtractOneHour(dateStr: any): Date {
        const date = new Date(dateStr);
        date.setHours(date.getHours() - 1);
        return date;
      }
}
