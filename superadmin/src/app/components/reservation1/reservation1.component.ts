import { Component, OnInit } from '@angular/core';
import { SuperadminService } from '../../services/superadmin.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Reservation } from '../../models/reservation';
import { ListeReservation } from '../../models/liste-reservation';
import { Connecteur } from '../../models/connecteur';
import { Chargetype } from '../../models/chargetype';

@Component({
  selector: 'app-reservation1',
  templateUrl: './reservation1.component.html',
  styleUrl: './reservation1.component.css' 
})
export class Reservation1Component implements OnInit {
reservation: any;
selectedStationDetails: any;
showDeletePopup: any;
  showDeleteSuccessPopup= false;
  constructor(private superadminservice:SuperadminService,private cookies:CookieService,private router:Router) { }
  page=0
  rest=""
  listreserv=new ListeReservation()
  connecteur=new Connecteur()
  chargeType=new Chargetype()
  ngOnInit(): void {
    if(!this.cookies.get('token')) 
      {
        this.router.navigate(['/loginadmin'])
      }
      this.getAllReservation()
  }
  async getAllReservation()
  {
    
    
        //var ids=this.m.stationId
        const res = await this.superadminservice.getAllReservation(this.page).subscribe((list) => {
            this.listreserv = list; 
            console.log("------------nice !!!!!-------");
            console.log("------------"+this.listreserv.nbr+"-------");
          }); 
    
  }
  async next()
  { 
    if(this.page<(Number(this.listreserv.nbr))-1 )
    { 
    this.page=this.page+1
     var res= await this.superadminservice.getAllReservation(this.page).subscribe((list) => {
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
    var res= await this.superadminservice.getAllReservation(this.page).subscribe((list) => {
      this.listreserv=list;  
    })
  }
  }

  img1 = './assets/images.jpeg';
 

  showPopup = false;
  reservationModifiee: any;
  reservationToShowDetails: any;

  modifierReservation(reservation:Reservation): void {
    this.showPopup = true;
  }

  fermerPopup(): void {
    this.showPopup = false;
    this.reservationModifiee = null;
  }

  showDetail(reservation: Reservation): void {
    if (this.reservationToShowDetails === reservation) {
      this.reservationToShowDetails = null;
      this.connecteur=new Connecteur();
      this.chargeType=new Chargetype();
    } else {
      this.reservationToShowDetails = reservation;
      if(reservation.BornConnect_ConnecteurId)
      {
      const res =  this.superadminservice.getConnecteurById(reservation.BornConnect_ConnecteurId).subscribe((conne) => {
        this.connecteur = conne; 
                
      });
    }
    if(reservation.typeCharge)
      {
      const res =  this.superadminservice.getChargeById(reservation.typeCharge).subscribe((charg) => {
        this.chargeType = charg;       
      });
    }
      //getChargeById
    }
  }
  closePopupDelete(event: Event): void {
    if (event.target === event.currentTarget) {
      this.showDeletePopup = false;
    }
  }
  supprimerReservation(reservation: Reservation): void {
    this.showDeletePopup = reservation.id; // Corrected variable name
  }
  cancelDelete() {
    this.showDeletePopup = false; // Hide the delete confirmation popup
  }
 async deleteSucc(showDeletePopup:any) {

    this.showDeletePopup = null; // Hide the delete confirmation popup
    var res = await this.superadminservice.deleteReservation(showDeletePopup).toPromise()
    if(res=="ok" )
        {
         location.reload();
        }

    // this.showDeletePopup = false;
    // this.showDeleteSuccessPopup = true;
  }
  fermerSuccessPopup(): void {
    this.showDeleteSuccessPopup = false;
  }
}
