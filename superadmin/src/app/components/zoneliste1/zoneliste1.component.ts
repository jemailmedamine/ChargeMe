import { Component, Input, OnInit } from '@angular/core';
import { SuperadminService } from '../../services/superadmin.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ZoneAdmin } from '../../models/zone-admin';

@Component({
  selector: 'app-zoneliste1',
  templateUrl: './zoneliste1.component.html',
  styleUrl: './zoneliste1.component.css'
})
export class Zoneliste1Component implements OnInit{
showZoneSuccessPopup: any;
  constructor(private superadminservice:SuperadminService,private cookies:CookieService,private router:Router) { }
  zoneAdminList: ZoneAdmin[] = [];
  zoneNoAdminList: ZoneAdmin[] = [];
  zoneName="";
  ancienName="";
  showZoneCreatePopup: any ;
  showZoneEditPopup : any;
  showEditSuccessPopup :any;
  showDeletePopup : any;
  showDeleteSuccessPopup = false; // Variable to control admin deletion success popup
  editZone: any = {};
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    if(!this.cookies.get('token'))
    {
      this.router.navigate(['/loginadmin'])
    }
    this.allZones()
  }
    openDeletePopup(name:any): void {
      this.zoneName=name
    this.showDeletePopup = true; // Corrected variable name
  }

  cancelBothPopups() {
    this.cancelDeletePopup();
    this.closeDeleteSuccessPopup();
  }
  cancelDeleteSuccessPopup() {
    this.showDeleteSuccessPopup = false; // Hide the "Admin Deleted" popup
  }
  cancelDelete() {
    this.showDeletePopup = false; // Hide the delete confirmation popup
    this.zoneName=""
  }
  cancelDelete2(event: Event): void {
    // Vérifier si l'événement a été déclenché à l'intérieur du popup
    if (event.target === event.currentTarget) {
      this.showDeletePopup = false;
      this.zoneName=""
    }
  }
  
  closeDeleteSuccessPopup(): void {
    this.showDeleteSuccessPopup = false;
    location.reload();
  }
  closeDeleteSuccessPopup2(event: Event): void {
    if (event.target === event.currentTarget) {
    location.reload();
    }
  }
  async deleteZone() {
    var res= await this.superadminservice.deleteZone(this.zoneName).toPromise();
    if(res=="ok" )
    this.showDeletePopup = false; 
    this.showDeleteSuccessPopup = true; 
  }
  
  cancelDeletePopup() {
    this.showDeletePopup = false; // Hide the delete confirmation popup
  }

  openCreatePopup(): void {
    this.showZoneCreatePopup = true; // Corrected variable name
  }
  closeCreatePopup(): void {
    this.showZoneCreatePopup = false; // Corrected variable name
    this.showZoneSuccessPopup = false;
  }
  closeCreatePopup2(event: Event): void {
    // Vérifier si l'événement a été déclenché à l'intérieur du popup
    if (event.target === event.currentTarget) {
      this.showZoneCreatePopup = null; // Corrected variable name
      this.showZoneSuccessPopup = null;
    }
  }


  async submitCreateZoneForm(){
    var labelvid = document.getElementById("alertvide");
        if(labelvid)
        {
          labelvid.style.display = "none";
        }
    var labelE = document.getElementById("alertexist");
        if(labelE)
        {
          labelE.style.display = "none";
        }
    
    if(this.zoneName.length==0)
    {
        if(labelvid)
        {
          labelvid.style.display = "block";
        }
    }
    else {
      var res= await this.superadminservice.getonezone(this.zoneName).toPromise();
    if(res && res.createdAt)
    {
      if(labelE)
      {
        labelE.style.display = "block";
      }
    }
    else{
      
      var res= await this.superadminservice.createZone(this.zoneName).toPromise();
    if(res && res.createdAt)
    {this.showZoneCreatePopup = null;
    console.log(res.createdAt)
    location.reload();
    //this.showZoneSuccessPopup = true;
    }
    }
    }
    
  }
  openEditPopup(name:any): void {
    this.showZoneEditPopup = true; // Corrected variable name
    this.zoneName=name
    this.ancienName=name
  }
  closeEditPopup(): void {
    this.showZoneEditPopup = false; // Corrected variable name
    this.showEditSuccessPopup = false;
    this.ancienName=""
    location.reload();
  } 
  closeEditPopup2(event: Event): void {
    // Vérifier si l'événement a été déclenché à l'intérieur du popup
    if (event.target === event.currentTarget) {
      
      this.showZoneEditPopup = false; // Corrected variable name
    this.showEditSuccessPopup = false;
    this.ancienName=""
    }
  }
  closeEditPopup3(event: Event): void {
    // Vérifier si l'événement a été déclenché à l'intérieur du popup
    if (event.target === event.currentTarget) {
      
      location.reload();
    }
  }
  async submitEditZoneForm() {
    var labelvid = document.getElementById("alertvideED");
    if(labelvid)
    {
      labelvid.style.display = "none";
    }
var labelE = document.getElementById("alertexistED");
    if(labelE)
    {
      labelE.style.display = "none";
    }

if(this.zoneName.length==0)
{
    if(labelvid)
    {
      labelvid.style.display = "block";
    }
}
else {
  var res= await this.superadminservice.getonezone(this.zoneName).toPromise();
if(res && res.createdAt&& this.zoneName!=this.ancienName)
{
  if(labelE)
  {
    labelE.style.display = "block";
  }
}
else{
  
    var res= await this.superadminservice.updateZone(this.ancienName,this.zoneName).toPromise();
    if(res && res[0] === 1)
    {
    this.showZoneEditPopup = null;
    this.showEditSuccessPopup = true;
    }
  }
  }
  }
  async allZones()
  {
    
   var table= await this.superadminservice.getZone().subscribe((zones) => {
      this.zoneAdminList = zones;
    })
    var table= await this.superadminservice.getZoneNoAdmin().subscribe((zones) => {
      this.zoneNoAdminList = zones;
    })
  }
}
