import { Component, OnInit } from '@angular/core';
import { SuperadminService } from '../../services/superadmin.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ListHistorique } from '../../models/list-historique';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  page = 0; 
  listhist = new ListHistorique();
  selectedHistoryDetails: any;
  editedHistory: any;
  showDetailsPopup = false;
  showPopup = false;
  reservationModifiee: any; // Stocke la réservation à modifier
  img1 = './assets/images.jpeg';
  showEditForm=false;
  showEditSuccessPopup = false;
  showDeleteSuccessPopup = false;
  supprimerReservationConf = false;
  Email: any;
  hist:any;
  constructor(private superadminservice: SuperadminService, private cookies: CookieService, private router: Router) { }

  ngOnInit(): void {
    if (!this.cookies.get('token')) {
      this.router.navigate(['/loginadmin']);
    }
    this.getAllHist();
    this.superadminservice.listenToHist().subscribe((data) => {
      console.log('Mise à jour du client reçue:', data);
      // Mettez à jour votre interface utilisateur en fonction de la mise à jour du client
      location.reload();
    });
  }

  async getAllHist() {
    const res = await this.superadminservice.getAllHistorique(this.page).subscribe((list) => {
      this.listhist = list;
    });
  }

  async next() {
    if (this.page < (Number(this.listhist.nbr)) - 1) {
      this.page = this.page + 1;
      const res = await this.superadminservice.getAllHistorique(this.page).subscribe((list) => {
        this.listhist = list;
      });
    }
  }

  async Previous() {
    if (this.page > 0) {
      this.page = this.page - 1;
      const res = await this.superadminservice.getAllHistorique(this.page).subscribe((list) => {
        this.listhist = list;
      });
    }
  }

  modifierReservation(hist: any): void {
    this.reservationModifiee = hist;
    this.showEditForm = true;
  }

  supprimerReservation(hist: any): void {
    this.hist=hist
    this.supprimerReservationConf = true;
  }

  fermerPopup(): void {
    this.showEditForm = false;
    this.reservationModifiee = null;
  }

 async showHistoryDetailsPopup(history: any){
    this.selectedHistoryDetails = history;
    if(history.personne=="Client")
    {
      var res= await this.superadminservice.getClientById(history.IdPersonne).toPromise();
      if(res)
      {
        if(res.loginType=='N')
        {
          this.Email=res.login
        }
        else{
          this.Email=res.email
        }
      }
    }else if(history.personne=="Proprietaire")
    {
      var ress= await this.superadminservice.getOwnerById(history.IdPersonne).toPromise();
      if(ress)
      {
        if(ress.loginType=='N')
        {
          this.Email=ress.login
        }
        else{
          this.Email=ress.email
        }
      }
    }else if(history.personne=="Moderateur")
    {
      var rest= await this.superadminservice.getModerateurById(history.IdPersonne).toPromise();
      if(rest)
      {
        
          this.Email=rest.login

      }
    }else if(history.personne=="Admin")
    {
      var resq= await this.superadminservice.getAdminById(history.IdPersonne).toPromise();
      if(resq)
      {
        
          this.Email=resq.login
        
      }
    }
    this.showDetailsPopup = true;
  }

  closeDetailsPopup(): void {
    this.selectedHistoryDetails = null;
    this.showDetailsPopup = false;
  }

  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.popup')) {
      this.showPopup = false;
    }
  }
  successPopup(): void {
    this.showEditSuccessPopup = true;
  }
  fermerSuccessPopup(): void {
    this.showEditSuccessPopup = false;
  }
 async supprimerReser(){
    var res = await this.superadminservice.deleteHist(this.hist.id).toPromise()
    if(res=="ok" )
        {
         location.reload();
        }
    //this.showDeleteSuccessPopup = true;
    //this.supprimerReservationConf = false;
  }
  fermerSupprimerReser(): void {
    this.supprimerReservationConf = false;
  }
  closeDeleteSuccessPopup(): void {
    this.showDeleteSuccessPopup = false;
  }
  closePopupDetails(event: Event)
  {
    this.showDetailsPopup = false;
  }
  closePopupDelete(event: Event): void {
    // Vérifier si l'événement a été déclenché à l'intérieur du popup
    if (event.target === event.currentTarget) {
      this.supprimerReservationConf = false;
    }
  }
}
