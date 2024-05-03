import { Component, OnInit } from '@angular/core';
import { GetStationBorn } from '../../models/get-station-born';
import { OwnerService } from '../../services/owner.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Admin } from '../../models/admin';
import { AllBorn } from '../../models/all-born';
import { AllMoedrateur } from '../../models/all-moedrateur';
import { Station } from '../../models/station';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Moderateur } from '../../models/moderateur';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrl: './stations.component.css'
})
export class StationsComponent implements OnInit {
  selectedStation: any;
  name=""
  anciRN=""
  ancipass=""
  ancilog=""
  showStationEditSuccessPopup=false;
  showStationCreatePopup = false;
  showStationSuccessPopup = false;
  showStationEditPopup = false;
  showDeleteSuccessPopup = false;
  showModeratorCreatePopup = false;
  showStationDetailsPopup = false;
  EditStation: any = {
    confirmStatus: 'Confirmer',
    typeStation:'reel',
    stationStatus:"ouvert"
    };
    adminStation=new Admin()
    allborn=new AllBorn();
    moderateur=new Moderateur()
    allmoderateur=new AllMoedrateur();
    createStationForm: FormGroup;
   createModerateurForm: FormGroup;
    EditStationForm: FormGroup;
    EditModeratorForm: FormGroup;
  showModeratorDelete=false;
  ModeratorSuccessPopup=false;
  moderatorDeletePopup=false;
  ModeratorDeleteSuccessPopup=false;
  showModeratorEditPopup=false;
  showModeratorDeleteSuccessPopup=false;
  ModeratorEditSuccessPopup=false;
  pageb=0
  pagemod=0
  idStation=-1
  constructor(private ownerservice:OwnerService,private formBuilder: FormBuilder, private cookies:CookieService,private router:Router) 
  {
    this.createStationForm = this.formBuilder.group({});
    this.createModerateurForm = this.formBuilder.group({});
    this.EditStationForm = this.formBuilder.group({});
    this.EditModeratorForm = this.formBuilder.group({});
  }
  allstation= new GetStationBorn();
  page=0;
  createStation: any = {
    confirmStatus: 'Confirmer',
    typeStation:'reel',
    stationStatus:"ouvert"
    };
  rest="";
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    if(!this.cookies.get('token'))
    {
      this.router.navigate(['/loginowner'])
    }
    this.getstation()
  }
  isFormValid(): boolean {
    // Vérifier si le formulaire est valide en utilisant la propriété valid de FormGroup
    return this.createStationForm.valid;
  }
  isFormValidEd(): boolean {
    // Vérifier si le formulaire est valide en utilisant la propriété valid de FormGroup
    return this.EditStationForm.valid;
  }
  isFormValidMod(): boolean {
    // Vérifier si le formulaire est valide en utilisant la propriété valid de FormGroup
    return this.createModerateurForm.valid;
  }
  isFormValidEdMod(): boolean {
    // Vérifier si le formulaire est valide en utilisant la propriété valid de FormGroup
    return this.EditModeratorForm.valid;
  }
  async getstation()
  {
    const rest = await this.ownerservice.getIdOwner().toPromise();
    this.rest=rest['ProprietaireId']
    var res= await this.ownerservice.getAllStation(this.page,rest['ProprietaireId']).subscribe((station) => {
      this.allstation=station;
     // this.allstation.stationborn?.
      
    })
   
  }
  async next()
  { 
    if(this.page<(Number(this.allstation.nbr)-1))
    {
    this.page=this.page+1
    var res= await this.ownerservice.getAllStation(this.page,this.rest).subscribe((station) => {
      this.allstation=station;
    
      console.log("----------"+this.page+"---------")
      console.log("----------"+this.allstation.nbr+"---------")
      //console.log("----------"+this.rest+"---------")

    })
  }
}
async Previous()
  { 
    if(this.page>0)
    {
    this.page=this.page-1
    var res= await this.ownerservice.getAllStation(this.page,this.rest).subscribe((station) => {
      this.allstation=station;
      console.log("----------"+this.page+"---------")
      console.log("----------"+this.allstation.nbr+"---------")
    })
  }
  }
  openCreatePopup(): void {
    this.showStationCreatePopup = true;
  }
  closeCreatePopup(): void {
    this.createStation.registerNumber="";
    this.createStation.longitude="";
    this.createStation.latitude="";
    this.showStationCreatePopup = false;
    this.showStationSuccessPopup = false;
  }
 
  async submitCreateStationForm(event: Event)  {
    event.preventDefault();
    if (this.isFormValid()) {
      var labelE = document.getElementById("alertexist");
      var res= await this.ownerservice.getstationByRN(this.createStation.registerNumber).toPromise();
    if(res && res.createdAt)
    {
      if(labelE)
      {
        labelE.style.display = "block";
      }
    }else{
      const restt = await this.ownerservice.getIdOwner().toPromise();
      if(restt && restt.ProprietaireId)
     {
      const station = new Station();
      station.adresse=this.createStation.address
      //station.confirmationAdmin=this.createStation.confirmStatus
      station.registreNumber=this.createStation.registerNumber
      station.name=this.createStation.name
      station.telf=this.createStation.phone
      station.ProprietaireId=restt['ProprietaireId']
      //station.etat=this.createStation.stationStatus
      //station.stationType=this.createStation.typeStation
      //station.prixKW=this.createStation.pricePerKW
      // station.longitude=this.createStation.longitude
      // station.latitude=this.createStation.latitude
      //const createStationJson = JSON.stringify(station);
      //console.log(createStationJson);
      var res= await this.ownerservice.createStation(station).toPromise();
      if(res && res.createdAt)
      {
      console.log(res.createdAt) 
      location.reload();
      }

      //this.showStationCreatePopup = false;
      //this.showStationSuccessPopup = true;
      // Autres actions à effectuer lorsque le formulaire est valide
     }
    }
    }
  }
  async submitEditStationForm(event: Event) {
   
    event.preventDefault();
    if (this.isFormValidEd())
    {
      var labelE = document.getElementById("alertexist");
      if (this.EditStation.registreNumber !== undefined)
      {
      var res= await this.ownerservice.getstationByRN(this.EditStation.registreNumber).toPromise();
    if(res && res.createdAt && this.EditStation.registreNumber!=this.anciRN)
    {
      if(labelE)
      {
        labelE.style.display = "block";
      }
    }
    else{
  
      var res= await this.ownerservice.UpdateStation(this.EditStation).toPromise();
      if(res && res[0] === 1)
      {
        location.reload();
      }
    }
  }
    //this.showStationEditPopup = false;
    //this.showStationEditSuccessPopup = true;
    }
  }
  openEditPopup(station:any): void {
    this.EditStation=station;
  this.anciRN=station.registreNumber
    this.showStationEditPopup = true;
  }
  StationSuccessPopup() {
    this.showStationCreatePopup = false;
    this.showStationSuccessPopup = true;
    }
    
    openDeletePopup(idStation:any): void {
      this.idStation=idStation
      this.showDeletePopup = true;
    }
    closeDeleteSuccessPopup(): void {
      this.showDeleteSuccessPopup = false;
      this.showDeletePopup = false;
    }
      deleteStation() {
        this.showDeleteSuccessPopup = true;
        this.showDeletePopup = false;
      }
      showDeletePopup = false;
      closeEditPopup() {
        this.showStationEditPopup = false;
        this.showStationEditSuccessPopup = false;
      }
      cancelDelete() {
        this.showDeletePopup = false;
      }
      StationEditSuccessPopup() {
        this.showStationEditSuccessPopup = true;
        this.showStationEditPopup = false;
        }
       
        closeModeratorCreatePopup(): void {
          this.moderateur=new Moderateur()
          this.showModeratorCreatePopup = false;
          this.ModeratorSuccessPopup = false;
        }
        showModeratorSuccessPopup() {
          this.showModeratorCreatePopup = false;
          this.ModeratorSuccessPopup = true;
          }
          // Inside your component class
async toggleDetails(station: any){
  this.pageb=0
    this.pagemod=0
  if (this.selectedStation && this.selectedStation.registerNumber==station.station?.registreNumber) {
    // If the same station is selected and details are already open, close details
    this.showStationDetailsPopup = false;
    this.selectedStation = null;
    this.idStation=-1
  } else {
    if(station.station?.AdminId)
      {
        var res1 =  this.ownerservice.getAdminById(station.station?.AdminId).subscribe((admin) => {
          this.adminStation = admin;
        })
      }
      this.selectedStation = {
        registerNumber: station.station?.registreNumber,
        address: station.station?.adresse,
        stationName: station.station?.name,
        state: station.station?.etat,
        stationType: station.station?.stationType,
        adminConfirmation: station.station?.confirmationAdmin,  
        pricePerKW: station.station?.prixKW,
        phone: station.station?.telf,
        longitude: station.station?.longitude,
        latitude: station.station?.latitude,
         
      };
      this.idStation=station.station?.id
      var res2 =  this.ownerservice.getAllBorn(this.pageb,station.station?.id).subscribe((born) => {
        this.allborn = born;
      })
      var res3 =  this.ownerservice.getAllModerateurbystation(this.pagemod,station.station?.id).subscribe((mod) => {
        this.allmoderateur = mod;
      })
     
   
    // Otherwise, open details for the selected station
   // this.selectedStation = station;
    this.showStationDetailsPopup = true;
  }
}
async nextB() {
  if (this.pageb < (Number(this.allborn.nbr) - 1)) {
    this.pageb = this.pageb + 1
    var res = await this.ownerservice.getAllBorn(this.pageb,this.idStation).subscribe((born) => {
      this.allborn = born;
    })
  }
}

async PreviousB() {
  if (this.pageb > 0) {
    this.pageb = this.pageb - 1
    var res = await this.ownerservice.getAllBorn(this.pageb,this.idStation).subscribe((born) => {
      this.allborn = born;
    })
  }
}
async PreviousMod() {
  if (this.pagemod > 0) {
    this.pagemod = this.pagemod - 1
    var res = await this.ownerservice.getAllModerateurbystation(this.pagemod,this.idStation).subscribe((mod) => {
      this.allmoderateur = mod;
    })
  }
}
async nextMod() {
  if (this.pagemod < (Number(this.allmoderateur.nbr) - 1)) {
    this.pagemod = this.pagemod + 1
    var res = await this.ownerservice.getAllModerateurbystation(this.pagemod,this.idStation).subscribe((mod) => {
      this.allmoderateur = mod;
    })
  }
}

openModeratorEditPopup(moderateur:Moderateur)
  { this.moderateur = moderateur
    if(moderateur.password && moderateur.login)
    {
      this.ancipass =moderateur.password
      this.ancilog=moderateur.login
    }
    this.showModeratorEditPopup = true;
  }
  openModeratorDeletePopup()
  {
    this.showModeratorDelete=true;
  }
  openModeratorDeleteSuccessPopup()
  {
    this.showModeratorDelete=false;
    this.showModeratorDeleteSuccessPopup=true;
  }
  closePopup()
  {
    this.showModeratorDelete=false;
    this.showModeratorDeleteSuccessPopup=false;
  }
  closeModeratorEditPopup()
  {
    this.showModeratorEditPopup = false;
    this.ModeratorEditSuccessPopup = false;
  }
  showModeratorEditSuccessPopup()
  {
    this.showModeratorEditPopup = false;
    this.ModeratorEditSuccessPopup = true;
  }
  openModeratorPopup(idStation:any): void {
    this.idStation=idStation
     this.moderateur=new Moderateur()
    // 
    
    // this.moderateur.lastname="lastname"
    // this.moderateur.firstname="firstname"
    // this.moderateur.password="password"
     this.moderateur.etat="actif"
    // this.moderateur.login="login"
    // this.moderateur.phone="jma"
    this.showModeratorCreatePopup = true;
  }
  async submitcreateModeratorForm(event: Event)  {
    var labelE = document.getElementById("alertLogin");
    if(labelE)
      {
        labelE.style.display = "none";
      }
    event.preventDefault();
    if (this.isFormValidMod()) {

      var res= await this.ownerservice.getModerateurByLogin(this.moderateur.login).toPromise();
  if(res && res.createdAt )
  {
    if(labelE)
    {
      labelE.style.display = "block";
    }
  }else{
    this.moderateur.StationId=this.idStation
    var res2= await this.ownerservice.createModerateur(this.moderateur).toPromise();
    if(res2 && res2.createdAt)
    {
      location.reload();
    }
    //location.reload();
    
      }
    }
  }
  async submitEditModeratorForm    (event: Event)  {
    var labelE = document.getElementById("alertLoginEd");
    if(labelE)
      {
        labelE.style.display = "none";
      }
    event.preventDefault();
    if (this.isFormValidEdMod()) {

      var res= await this.ownerservice.getModerateurByLogin(this.moderateur.login).toPromise();
  if(res && res.createdAt && this.ancilog!=this.moderateur.login)
  {
    if(labelE)
    {
      labelE.style.display = "block";
    }
  }else{
    var rest
    if(this.ancipass!=this.moderateur.password)
    rest= await this.ownerservice.UpdateModerateur(this.moderateur).toPromise();
else{
  var moderat=new Moderateur()
  moderat.StationId=this.moderateur.StationId
  moderat.etat=this.moderateur.etat
  moderat.firstname=this.moderateur.firstname
  moderat.lastname=this.moderateur.lastname
  moderat.login=this.moderateur.login
  moderat.phone=this.moderateur.phone
  moderat.id=this.moderateur.id
  rest= await this.ownerservice.UpdateModerateur(moderat).toPromise();
}
if(rest && rest[0] === 1)
{
  if(this.moderateur.etat!='actif')
  {
    var result= await this.ownerservice.BloquerModerateur(this.moderateur).toPromise();
  }
location.reload();
}
      }
    }
  }  
  async filrage() {
    this.page=0
    var res= await this.ownerservice.getAllStationF(this.page,this.rest,this.name).subscribe((station) => {
      this.allstation=station;
    })
  } 
}