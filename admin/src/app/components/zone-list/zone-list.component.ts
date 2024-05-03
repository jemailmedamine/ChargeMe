// zone-list.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { ZoneAdmin } from '../../models/zone-admin';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from '../../services/admin.service';


 
@Component({
  selector: 'app-zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.css']
})
export class ZoneListComponent implements OnInit{
  constructor(private authAdminService: AdminService,private cookies:CookieService,private router:Router) { }
  zoneAdminList: ZoneAdmin[] = [];
  zoneNoAdminList: ZoneAdmin[] = [];
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    if(!this.cookies.get('token'))
    {
      this.router.navigate(['/loginadmin'])
    }
    this.allZones()
  }
  async allZones()
  {
    
   var table= await this.authAdminService.getZone().subscribe((zones) => {
      this.zoneAdminList = zones;
    })
    var table= await this.authAdminService.getZoneNoAdmin().subscribe((zones) => {
      this.zoneNoAdminList = zones;
    })
  }
  // Fonction pour basculer l'affichage des détails de la zone
  selectedzone: any;
  
  toggleDetails(zone: any): void {
    this.selectedzone = this.selectedzone === zone ? null : zone;
  }
}
