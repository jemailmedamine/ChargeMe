import { Component, OnInit } from '@angular/core';
import { SuperadminService } from '../../services/superadmin.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AllMoedrateur } from '../../models/all-moedrateur';
import { Moderateur } from '../..//models/moderateur'; 

@Component({
  selector: 'app-moderatorlist1',
  templateUrl: './moderatorlist1.component.html',
  styleUrl: './moderatorlist1.component.css'
})
export class Moderatorlist1Component implements OnInit{
  constructor(private superadminservice:SuperadminService,private cookies:CookieService,private router:Router) { }
  login=""
  showDeletePopup :any;
  showEditSuccessPopup = false;
  page=0
  rest=""
  allmoderateur=new AllMoedrateur()
  selectedmoderator: any; // Variable pour stocker les détails du propriétaire sélectionné
  isEditPopupVisible: boolean = false;
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    if(!this.cookies.get('token'))
    {
      this.router.navigate(['/loginadmin'])
    }
    this.getAllModerateur()
  }
  async getAllModerateur()
  {

    var res= await this.superadminservice.getAllModerateur(this.page).subscribe((moderator) => {
      this.allmoderateur=moderator; 
    })
  }
  async next()
  { 
    if(this.page<(Number(this.allmoderateur.nbr)-1))
    {
    this.page=this.page+1
    var res= await this.superadminservice.getAllModerateur(this.page).subscribe((moderator) => {
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
    var res= await this.superadminservice.getAllModerateur(this.page).subscribe((moderator) => {
      this.allmoderateur=moderator; 
    })
  }
  }

  // Méthode pour afficher les détails du propriétaire sélectionné et ouvrir le popup
  showDetails(moderateur: Moderateur): void {
    this.selectedmoderator = moderateur
  }

  // Méthode pour fermer le popup des détails du propriétaire
  closeDetails(): void {
    this.selectedmoderator = null;
  }
  closePopup2(event: Event): void {
    // Vérifier si l'événement a été déclenché à l'intérieur du popup
    if (event.target === event.currentTarget) {
      this.selectedmoderator = null;
    }
  }
  // deleteModerator(): void {
  //   // Implémentez la logique de suppression ici
  //   console.log("Modérateur supprimé");
  //   this.closeDetails(); // Fermez le popup après la suppression si nécessaire
  // }

  // Méthode pour modifier le modérateur sélectionné
  editModerator(): void {
    // Implémentez la logique de modification ici
    console.log("Modérateur modifié");
    this.closeDetails(); // Fermez le popup après la modification si nécessaire
  }

  

  // Méthode pour ouvrir le popup de modification
  openEditPopup(): void {
    this.isEditPopupVisible = true;
  }

  // Méthode pour fermer le popup de modification
  cancelEdit(): void {
    this.isEditPopupVisible = false;
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
  async deleteModerator(showDeletePopup:any) {
    // Assuming the delete operation is successful
    this.showDeletePopup = null; // Hide the delete confirmation popup
    var res = await this.superadminservice.deleteModerateur(showDeletePopup).toPromise()
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
    var res= await this.superadminservice.getAllModerateurF(this.page,this.login).subscribe((moderator) => {
      this.allmoderateur=moderator; 
    })
  }
}
