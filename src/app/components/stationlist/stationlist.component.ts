// stationlist.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from '../../services/admin.service';
import { GetStationBorn } from '../../models/get-station-born';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Admin } from '../../models/admin';
import { Owner } from '../../models/owner';
import { Station } from '../../models/station';
import { Born } from '../../models/born';
import { AllBorn } from '../../models/all-born';
import { AllMoedrateur } from '../../models/all-moedrateur';
import { Connecteur } from '../../models/connecteur';
import { BornConnecteur } from '../../models/born-connecteur';

@Component({
  selector: 'app-stationlist',
  templateUrl: './stationlist.component.html',
  styleUrls: ['./stationlist.component.css']
})
export class StationlistComponent implements OnInit {
station: any;
  constructor(private authAdminService: AdminService,private formBuilder: FormBuilder, private cookies: CookieService, private router: Router,private route: ActivatedRoute) 
   {
    this.createStationForm = this.formBuilder.group({});
    this.createTerminalForm = this.formBuilder.group({});
  }
  showStationSuccessPopup: any;
  createStation: any = {
  confirmStatus: 'Confirmer',
  typeStation:'reel',
  stationStatus:"ouvert"
  };
  createStationForm: FormGroup;
  createTerminalForm: FormGroup;
  editStation: any = {};
  showStationCreatePopup = false;
  showStationEditPopup = false;
  showStationEditSuccessPopup = false;
  showDeletePopup = false;
  showDeleteSuccessPopup = false;
  showTerminalCreatePopup = false;
  showStationDetailsPopup = false;
  newStation: any = {};
  page = 0;
  pageb = 0;
  pagemod = 0;
  allstation = new GetStationBorn();
  allborn=new AllBorn();
  allmoderateur=new AllMoedrateur();
  adminStation=new Admin()
  ownerStation=new Owner()
  listCon:Connecteur[]=[]
  listConCheK:Connecteur[]=[]
  listConDejaCheK:Connecteur[]=[]
  selectedStation: any;
  createTerminal: any = {
    owner:'OandA',
  };
  checkboxesVisible = false;
  TerminalSuccessPopup = false;
  selectedStationDetails: any;
  showTerminalEditPopup = false;
  EditTerminal: any;
  TerminalEditSuccessPopup = false;
  showTerminalDelete = false;
  showTerminalDeleteSuccess = false;
  confirmationAdmin="Confirmer"
  showCheckboxes = false;
  showCheckboxesEdit = false;
  stationEdit = new Station();
  anciRN=""
  idStation=-1
  idBorn=-1
  idowner=""
  born=new Born();
  ancienSerialNbr=""
  ancienNameBorn=""
  name=""
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // Accédez aux paramètres envoyés
      this.idowner = params['ownerid'];
      console.log("-------------------------------------------------------")
      console.log(this.idowner); // Cela devrait afficher 'valeur'
      console.log("-------------------------------------------------------")
    });
    if (!this.cookies.get('token')) {
      this.router.navigate(['/loginadmin']);
    }
    
      this.getstation();
      console.log("!!!!!!!! length" +this.idowner.length)
  }
  async getstation()
  {
    if(!this.idowner)
    {
    var res = await this.authAdminService.getAllStation(this.page,this.confirmationAdmin).subscribe((station) => {
      this.allstation = station;
    })
  }else{
    var res = await this.authAdminService.getByStationOwner(this.idowner,this.page,this.confirmationAdmin).subscribe((station) => {
      this.allstation = station;
    })
  }
  }
  openCreatePopup(): void {
    var labelE = document.getElementById("alertexist");
        if(labelE)
        {
          labelE.style.display = "none";
        }
        this.createStation.registerNumber="";
    this.showStationCreatePopup = true;
  }

  async submitCreateStationForm(event: Event)  {
    event.preventDefault();
    if (this.isFormValid()) {
      var labelE = document.getElementById("alertexist");
      var res= await this.authAdminService.getstationByRN(this.createStation.registerNumber).toPromise();
    if(res && res.createdAt)
    {
      if(labelE)
      {
        labelE.style.display = "block";
      }
    }else{
      const restt = await this.authAdminService.getIdAdmin().toPromise();
      if(restt && restt.AdminId)
      {
        const station = new Station();
        station.adresse=this.createStation.address
        station.confirmationAdmin=this.createStation.confirmStatus
        station.registreNumber=this.createStation.registerNumber
        station.name=this.createStation.name
        station.etat=this.createStation.stationStatus
        station.stationType=this.createStation.typeStation
        station.prixKW=this.createStation.pricePerKW
        station.longitude=this.createStation.longitude
        station.latitude=this.createStation.latitude
        station.telf=this.createStation.phone
        station.AdminId=restt['AdminId']
        //const createStationJson = JSON.stringify(station);
        //console.log(createStationJson);
        var res= await this.authAdminService.createStation(station).toPromise();
        if(res && res.createdAt)
        {
        console.log(res.createdAt) 
        location.reload();
        }
      }
     

      //this.showStationCreatePopup = false;
      //this.showStationSuccessPopup = true;
      // Autres actions à effectuer lorsque le formulaire est valide
    }
    }
  }
  async showTerminalSuccessPopup(event: Event){
    console.log("size jma: "+this.listConCheK.length)
    var labeln = document.getElementById("alertname");
    if(labeln)
    {
      labeln.style.display = "none";
    }
    var labelE = document.getElementById("alertserial");
    if(labelE)
      {
        labelE.style.display = "none";
      }
    event.preventDefault();
    if (this.isFormValidBorn()) {
      var res= await this.authAdminService.getBornbySerial(this.createTerminal.serial).toPromise();
    if(res && res.createdAt)
    {
      if(labelE)
      {
        labelE.style.display = "block";
      }
    }else{
      var res= await this.authAdminService.getBornbyNameAndidStation(this.idStation,this.createTerminal.name).toPromise();
      if(res && res.createdAt)
      {
        if(labeln)
        {
          labeln.style.display = "block";
        }
    }else{
      var born=new Born()
      born.serialNumber=this.createTerminal.serial
      born.name=this.createTerminal.name
      born.proprietaire=this.createTerminal.owner
      born.pourcentageP=this.createTerminal.percentage
      born.NumeroTel=this.createTerminal.phone
      born.StationId=this.idStation
      var res2= await this.authAdminService.createBorn(born).toPromise();
      if(res2 && res2.createdAt)
      {
        console.log("entrrrreeeeeeeeeeeeeeeeee")
        for (const conn of this.listConCheK) {
           if(conn.id)
           {
         // console.log("conn idddd :::: "+conn.id)
         //console.log("res2.id idddd :::: "+res2.id)
          var bornconn=new BornConnecteur()
           bornconn.ConnecteurId=conn.id
           //bornconn.ConnecteurId="1"
            bornconn.BornId=res2.id
          var res3= await this.authAdminService.createBornConnecteur(bornconn).toPromise()
        }
        }
      location.reload();
      }
    }
    }
    //this.showTerminalCreatePopup = false;
    //this.TerminalSuccessPopup = true;
   }
  }
  isFormValid(): boolean {
    // Vérifier si le formulaire est valide en utilisant la propriété valid de FormGroup
    return this.createStationForm.valid;
  }
  isFormValidBorn(): boolean {
    // Vérifier si le formulaire est valide en utilisant la propriété valid de FormGroup
    return this.createTerminalForm.valid;
  }
  async openBorneEditPopup(born:any) {
    this.idBorn=born.id;
    this.ancienNameBorn=born.name
    this.ancienSerialNbr=born.serialNumber
    var resp= await this.authAdminService.getBornbyId(born.id).toPromise();
    if(resp)
    {
      this.born=resp
      console.log("eeeeennnnttttreee "+this.born.name+" "+this.born.serialNumber)
    }
  
    this.listCon=[]
    var s1=0
    var s2=0
    var res4= await this.authAdminService.getAllConnecteurs().toPromise();
    if(res4)
    {
      this.listCon=res4
      s1=1
    }
    
    this.listConDejaCheK=[]
    this.listConCheK=[]
    var list= await this.authAdminService.getConnecteursChecked(born.id).toPromise();
       if(list)
       {
        this.listConDejaCheK=list
        s2=1
       }
       var listInexs: Connecteur[]=[]
       for (let i = 0; i < this.listCon.length; i++) {
        const found = this.listConDejaCheK.find(conn => this.listCon[i].id == conn.id);
        if (found) {
            listInexs.push(found);
        }
    }
      for (let i = 0; i < listInexs.length; i++)
      {
        const found = this.listCon.find(conn => listInexs[i].id == conn.id);
        if (found) {
          this.listCon.splice(this.listCon.indexOf(found),1)
        }
      }
      console.log("length Deja ùù : "+this.listConDejaCheK.length)
      this.listConCheK=this.listConDejaCheK.slice()
      console.log("length Deja éé : "+this.listConCheK.length)
      if(s1==1 && s2==1)
       {
        this.showTerminalEditPopup = true;
  
       }
    }
  
  ListConnectorCheckedEdit(connecteur: Connecteur) {
    console.log("length D : "+this.listConCheK.length)
    //console.log("index!!!! : "+this.listConCheK.indexOf(connecteur))
    if(this.listConCheK.includes(connecteur))
    {
      this.listConCheK.splice(this.listConCheK.indexOf(connecteur),1)
      // this.listConCheK.splice(this.listConCheK.indexOf(connecteur),1)
    }else
    {
      this.listConCheK.push(connecteur)
    }
    console.log("length F : "+this.listConCheK.length)
  
  }
  closeTerminalEditPopup(): void {
    this.idBorn=-1
    this.showTerminalEditPopup = false;
    this.TerminalEditSuccessPopup = false;
  }
  async showTerminalSuccessPopupEdit(event: Event){
    console.log("size jma: "+this.listConCheK.length)
    var labeln = document.getElementById("alertnameEd");
    if(labeln)
    {
      labeln.style.display = "none";
    }
    var labelE = document.getElementById("alertserialEd");
    if(labelE)
      {
        labelE.style.display = "none";
      }
    event.preventDefault();
    if (this.isFormValidBorn()) {
      var inter:any
      inter = this.born.serialNumber
      var res= await this.authAdminService.getBornbySerial(inter).toPromise();
    if(res && res.createdAt && this.born.serialNumber!=this.ancienSerialNbr)
    {
      if(labelE)
      {
        labelE.style.display = "block";
      }
    }else{
      var inter2:any
      inter2=this.born.name
      var res= await this.authAdminService.getBornbyNameAndidStation(this.idStation,inter2).toPromise();
      if(res && res.createdAt && this.ancienNameBorn!=this.born.name)
      {
        if(labeln)
        {
          labeln.style.display = "block";
        }
    }else{
      var listInexs: Connecteur[]=[]
    for (let i = 0; i < this.listConDejaCheK.length; i++) {
      const found = this.listConCheK.find(conn => this.listConDejaCheK[i].id == conn.id);
      if (found) {
        this.listConCheK.splice(this.listConCheK.indexOf(found),1)
      }else{
        listInexs.push(this.listConDejaCheK[i])
      }
  }
  console.clear()
  var variable= await this.authAdminService.UpdateBorn(this.born).toPromise();
        if(variable && variable[0] === 1)
        {
         // location.reload();
         for (let i = 0; i < this.listConCheK.length; i++) {
    
          console.log("&&&&&& "+this.listConCheK[i].libelle+" &&&&&")
  
          var bornconn=new BornConnecteur()
          bornconn.ConnecteurId=this.listConCheK[i].id
          //bornconn.ConnecteurId="1"
          var val:any
          val=this.born.id
           bornconn.BornId=val
         var res3= await this.authAdminService.createBornConnecteur(bornconn).toPromise()
      
        }
        for (let i = 0; i < listInexs.length; i++) {
          
          console.log("superssion de "+listInexs[i].libelle)
          var vall:any
          vall=listInexs[i].id
          var ress= await this.authAdminService.deleteBornConn(this.idBorn,vall).toPromise();
        // if(ress=="ok" )
        // location.reload();
        }
          this.showTerminalEditPopup = false;
          this.TerminalEditSuccessPopup = true;
        }
  
    }
    }
    //this.showTerminalCreatePopup = false;
    //this.TerminalSuccessPopup = true;
   }
  }
  Updated(): void {
    location.reload();
  }
    async next() {
  if(!this.idowner)
  {
    if (this.page < (Number(this.allstation.nbr) - 1)) {
      this.page = this.page + 1
      var res = await this.authAdminService.getAllStation(this.page,this.confirmationAdmin).subscribe((station) => {
        this.allstation = station;
      })
    }
  }else{
    if (this.page < (Number(this.allstation.nbr) - 1)) {
      this.page = this.page + 1
      var res = await this.authAdminService.getByStationOwner(this.idowner,this.page,this.confirmationAdmin).subscribe((station) => {
        this.allstation = station;
      })
    }
  }
    }
  
    async Previous() {
      if(!this.idowner)
      {
        if (this.page > 0) {
          this.page = this.page - 1
          var res = await this.authAdminService.getAllStation(this.page,this.confirmationAdmin).subscribe((station) => {
            this.allstation = station;
          })
        }
      }else{
        if (this.page > 0) {
          this.page = this.page - 1
          var res = await this.authAdminService.getByStationOwner(this.idowner,this.page,this.confirmationAdmin).subscribe((station) => {
            this.allstation = station;
          })
        }
      }
    }
    async nextB() {
      if (this.pageb < (Number(this.allborn.nbr) - 1)) {
        this.pageb = this.pageb + 1
        var res = await this.authAdminService.getAllBorn(this.pageb,this.idStation).subscribe((born) => {
          this.allborn = born;
        })
      }
    }
  
    async PreviousB() {
      if (this.pageb > 0) {
        this.pageb = this.pageb - 1
        var res = await this.authAdminService.getAllBorn(this.pageb,this.idStation).subscribe((born) => {
          this.allborn = born;
        })
      }
    }
    async PreviousMod() {
      if (this.pagemod > 0) {
        this.pagemod = this.pagemod - 1
        var res = await this.authAdminService.getAllModerateurbystation(this.pagemod,this.idStation).subscribe((mod) => {
          this.allmoderateur = mod;
        })
      }
    }
    async nextMod() {
      if (this.pagemod < (Number(this.allmoderateur.nbr) - 1)) {
        this.pagemod = this.pagemod + 1
        var res = await this.authAdminService.getAllModerateurbystation(this.pagemod,this.idStation).subscribe((mod) => {
          this.allmoderateur = mod;
        })
      }
    }
  
    toggleCheckboxes() {
      this.showCheckboxes = !this.showCheckboxes;
    }
  
    toggleCheckboxesEdit(): void {
      this.showCheckboxesEdit = !this.showCheckboxesEdit;
    }
    
  
    closeCreatePopup(): void {
      this.createStation.registerNumber="";
      this.createStation.longitude="";
      this.createStation.latitude="";
  
      this.showStationCreatePopup = false;
      this.showStationSuccessPopup = false;
    }
  
    openEditPopup(station:any): void {
      this.stationEdit=station;
      this.anciRN=station.registreNumber
      this.showStationEditPopup = true;
    }
  
   async submitEditStationForm(event: Event) {
     
      event.preventDefault();
      if (this.isFormValid())
      {
        var labelE = document.getElementById("alertexist");
        if (this.stationEdit.registreNumber !== undefined)
        {
        var res= await this.authAdminService.getstationByRN(this.stationEdit.registreNumber).toPromise();
      if(res && res.createdAt && this.stationEdit.registreNumber!=this.anciRN)
      {
        if(labelE)
        {
          labelE.style.display = "block";
        }
      }
      else{
        const resttt = await this.authAdminService.getIdAdmin().toPromise();
        this.stationEdit.AdminId=resttt['AdminId']
        var res= await this.authAdminService.UpdateStation(this.stationEdit).toPromise();
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
  
    closeEditPopup(): void {
      this.anciRN="";
      this.createStation.longitude="";
      this.createStation.latitude="";
      this.stationEdit=new Station()
      this.showStationEditPopup = false;
      this.showStationEditSuccessPopup = false;
    }
  
    openDeletePopup(idStation:any): void {
      this.idStation=idStation
      this.showDeletePopup = true;
    }
  
    async deleteStation() {
      var res= await this.authAdminService.deleteStation(this.idStation).toPromise();
      if(res=="ok" )
      location.reload();
      // this.showDeletePopup = false;
      // this.showDeleteSuccessPopup = true;
    }
  
    cancelDelete() {
      this.idStation=-1
      this.showDeletePopup = false;
    }
    cancelDeleteStation(event: Event) {
      if (event.target === event.currentTarget) {
      this.idStation=-1
      this.showDeletePopup = false;
      }
    }
  
    closeDeleteSuccessPopup(): void {
      this.showDeleteSuccessPopup = false;
    }
  
    openBornePopup(idStation:any): void {
      this.listCon=[]
      this.idStation=idStation
      var res4 =  this.authAdminService.getAllConnecteurs().subscribe((con) => {
        this.listCon = con;
      })
     
      this.showTerminalCreatePopup = true;
    }
    ListConnectorChecked(con:Connecteur): void {
      if (!this.listConCheK.includes(con)) {
        this.listConCheK.push(con);
        console.log(con.libelle+"!!!!!!!!!")
    }else{
      console.log("this "+con.libelle+" is exsited $$$$$$$")
      this.listConCheK.splice(this.listConCheK.indexOf(con), 1);
      console.log("this "+con.libelle+"est supprimer ££££££")
    }
          
          
    }
    async submitCreateTerminalForm(): Promise<void> {
      this.showTerminalCreatePopup = false;
    }
  
    closeTerminalCreatePopup(): void { 
      this.listConCheK=[]
     this.idStation=-1
      this.showTerminalCreatePopup = false;
      this.TerminalSuccessPopup = false;
    }
    
    
    async openDetailPopup(station: any) {
      this.pageb=0
      this.pagemod=0
      if (this.selectedStationDetails && this.selectedStationDetails.stationName === station.station?.name) {
        this.selectedStationDetails = null;
        this.idStation=-1
      } else {
        if(station.station?.AdminId)
        {
          var res1 =  this.authAdminService.getAdminById(station.station?.AdminId).subscribe((admin) => {
            this.adminStation = admin;
          })
        }
        this.selectedStationDetails = {
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
        var res2 =  this.authAdminService.getAllBorn(this.pageb,station.station?.id).subscribe((born) => {
          this.allborn = born;
        })
        var res3 =  this.authAdminService.getAllModerateurbystation(this.pagemod,station.station?.id).subscribe((mod) => {
          this.allmoderateur = mod;
        })
        if(station.station?.ProprietaireId)
        {
          var res4 =  this.authAdminService.getOwnerById(station.station?.ProprietaireId).subscribe((owner) => {
            this.ownerStation = owner;
          })
        }
     
    }
    }
  
    
    openBorneDeletePopup(idborn:any): void {
      this.idBorn=idborn
      this.showTerminalDelete = true;
    }
    async deleteSuccess() {
      var res= await this.authAdminService.deleteBorn(this.idBorn).toPromise();
      if(res=="ok" )
      location.reload();
     // this.showTerminalDelete = false;
     // this.showTerminalDeleteSuccess = true;
    }
    closeDeleteSuccessPopupx(): void {
      this.showTerminalDeleteSuccess = false;
    }
    cancelDeletex(): void {
      this.showTerminalDelete = false;
    }
    cancelDeletex2(event: Event): void {
      if (event.target === event.currentTarget) {
      this.showTerminalDelete = false;
    }
  }
   async confirmer(){
    this.page=0
    this.pageb=0
    this.pagemod=0
    this.idowner=""
    this.confirmationAdmin="Confirmer"
    var res = await this.authAdminService.getAllStation(this.page,this.confirmationAdmin).subscribe((station) => {
      this.allstation = station;
    })
  }
  async Nonconfirmer() {
    this.page=0
    this.pageb=0
    this.pagemod=0
    this.idowner=""
    this.confirmationAdmin="enCour"
    var res = await this.authAdminService.getAllStation(this.page,this.confirmationAdmin).subscribe((station) => {
      this.allstation = station;
    })
  }
  async filrage() {
    this.page=0
    var res = await this.authAdminService.getAllStationF(this.page,this.confirmationAdmin,this.name).subscribe((station) => {
      this.allstation = station;
    })
  }
  }
