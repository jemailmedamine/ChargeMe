import { Component , OnInit} from '@angular/core';
import { SuperadminService } from '../../services/superadmin.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ListeReclamationSuper } from '../../models/liste-reclamation-super';
interface SideNavToggle{
  screenwidth : number;
  collapsed:boolean;
}
@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrl: './reclamation.component.css'
})
export class ReclamationComponent implements OnInit{ 
  constructor(private superadminservice:SuperadminService,private cookies:CookieService,private router:Router) { }

  img1='./assets/images.jpeg';
  showDeletePopup :any;
  selectedReclamation: any = null;
  page=0
  listreclam=new ListeReclamationSuper()

  ngOnInit(): void {
    if(!this.cookies.get('token'))
    {
      this.router.navigate(['/loginadmin'])
    }
    this.getAllReclamation()
  }
  async getAllReclamation()
  {
    
    var res= await this.superadminservice.getAllReclamation(this.page).subscribe((list) => {
      this.listreclam=list; 
    })
  }
  async next()
  { 
    if(this.page<(Number(this.listreclam.nbr))-1)
    { 
    this.page=this.page+1
     var res= await this.superadminservice.getAllReclamation(this.page).subscribe((list) => {
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
    var res= await this.superadminservice.getAllReclamation(this.page).subscribe((list) => {
      this.listreclam=list;  
    })
  }
  }
  showDetails(reclamation: any): void {
    this.selectedReclamation = reclamation;
  }

  closePopup(): void {
    this.selectedReclamation = null;
  }

  deleteClaim(id:any): void {
    // Logique pour supprimer la réclamation
    this.showDeletePopup=id
    console.log("Réclamation supprimée");
    this.closePopup();
  }

  replyToClaim(): void {
    // Logique pour répondre à la réclamation
    console.log("Répondre à la réclamation");
    this.closePopup();
  }
  closePopup2(event: Event): void {
    // Vérifier si l'événement a été déclenché à l'intérieur du popup
    if (event.target === event.currentTarget) {
      this.selectedReclamation = null;
    }
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
  async deleteReclam(showDeletePopup:any) {
    // Assuming the delete operation is successful
    this.showDeletePopup = null; // Hide the delete confirmation popup
    var res = await this.superadminservice.deleteReclam(showDeletePopup).toPromise()
    if(res=="ok" )
        {
         location.reload();
        }
    // //this.showDeleteSuccessPopup = true; // Show the "Admin Deleted" popup 
  }
  cancelDelete() {
    this.showDeletePopup = false; // Hide the delete confirmation popup
  }
}
