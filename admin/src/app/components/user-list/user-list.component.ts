import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from '../../services/admin.service';
import { AllClient } from '../../models/all-client';
import { Client } from '../..//models/client';

@Component({ 
  selector: 'app-user-list',
  templateUrl: './user-list.component.html', 
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  constructor(private authAdminService: AdminService,private cookies:CookieService,private router:Router) { }
  page=0
  allclient=new AllClient()
  login=""
  selectedClient: any;
  showEditForm = false;
  editedClient=new Client;
  showEditSuccessPopup = false;
  showDeletePopup :any;
  editClientPopup = false;
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    if(!this.cookies.get('token'))
    {
      this.router.navigate(['/loginadmin'])
    }
    
    this.getAllclient()
    this.authAdminService.listenToClientUpdate().subscribe((data) => {
      console.log('Mise à jour du client reçue:', data);
      // Mettez à jour votre interface utilisateur en fonction de la mise à jour du client
      location.reload();
    });
  }
  async getAllclient()
  {
    var res= await this.authAdminService.getAllClient(this.page).subscribe((clients) => {
      this.allclient=clients; 
    })
  }
  async next()
  { 
    if(this.page<(Number(this.allclient.nbr)-1))
    {
    this.page=this.page+1
    var res= await this.authAdminService.getAllClient(this.page).subscribe((clients) => {
      this.allclient=clients; 
    
      console.log("----------"+this.page+"---------")
      console.log("----------"+this.allclient.nbr+"---------")
    })
  }
}
async Previous()
  { 
    if(this.page>0)
    {
    this.page=this.page-1
    var res= await this.authAdminService.getAllClient(this.page).subscribe((clients) => {
      this.allclient=clients; 
    })
  }
  } 
  
  selectedUser: any;
  
  toggleDetails(client: any): void {
    this.selectedUser = this.selectedUser === client ? null : client;
    console.log(this.selectedUser)
  }
  isBlocked: boolean = true;

  async toggleBlocked(client: Client) {
    client.BlackList = !client.BlackList;
    var rest= await this.authAdminService.UpdateClient(client).toPromise();
        if(rest && rest[0] === 1)
        {
          var res= await this.authAdminService.BloquerClient(client).toPromise();
          console.log("updated!!!!!")

        // location.reload();
        }
    console.log("-----"+ client.BlackList+ "-----")
    console.log(`${client.firstname} ${client.lastname} is now ${client.BlackList ? 'blocked' : 'unblocked'}`);
  }

  editClient(client: any) {
    this.showEditForm = true;
    this.selectedClient = client;
  }

  closeEditClientPopup() {
    this.editClientPopup = false;
    this.selectedClient = null;
  }

  successPopup(): void {
    this.showEditForm = false;
    this.showEditSuccessPopup = true;
  }

  fermerSuccessPopup(): void {
    this.showEditSuccessPopup = false;
  }

  fermerPopup(): void {
    this.showEditForm = false;
    this.selectedClient = null;
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
  cancelDelete() {
    this.showDeletePopup = false; // Hide the delete confirmation popup
  }
  async deleteClient(showDeletePopup:any) {
    // Assuming the delete operation is successful
    this.showDeletePopup = null; // Hide the delete confirmation popup
    var res = await this.authAdminService.deleteClient(showDeletePopup).toPromise()
    if(res=="ok" )
        {
         location.reload();
        }
    //this.showDeleteSuccessPopup = true; // Show the "Admin Deleted" popup
  }
  async filrage() {
    this.page=0
    var res = await this.authAdminService.getAllClientF(this.page,this.login).subscribe((clients) => {
      this.allclient = clients;
    });
  }
}

