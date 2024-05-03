import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { OwnerService } from '../../services/owner.service';
import { StatOwner } from '../../models/stat-owner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html', 
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private ownerservice:OwnerService,private cookies:CookieService,private router:Router) { }
  statowner = new StatOwner()
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    if(!this.cookies.get('token'))
    {
      this.router.navigate(['/loginowner'])
    }
    this.getStatOwner()
     
  }
  imgprofil='./assets/images.jpeg';
  async getStatOwner()
  {
    const rest = await this.ownerservice.getIdOwner().toPromise();
    rest['ProprietaireId']
    var nbrClient: string;
    this.ownerservice.getNbrModerateur(rest['ProprietaireId']).subscribe(
      (count: string) => {
        nbrClient = count;
        if(nbrClient==null||nbrClient.length==0) 
          this.statowner.nbrmoderateur = "0";
        else{
          this.statowner.nbrmoderateur = nbrClient;
        }
        //this.statowner.nbrmoderateur = nbrClient;
      },
      (error) => {
        console.error(error);
      });

      var nbrStation: string;
    this.ownerservice.getNbrStation(rest['ProprietaireId']).subscribe(
      (count: string) => {
        nbrStation = count;
        if(nbrStation==null||nbrStation.length==0)
          this.statowner.nbrstation = "0";
        else{
          this.statowner.nbrstation = nbrStation;
        }
        //this.statowner.nbrstation = nbrStation;
      },
      (error) => {
        console.error(error);
      });

      var nbrOwners: string;
      this.ownerservice.getMonthsMoney(rest['ProprietaireId']).subscribe( 
        (count: string) => {
          nbrOwners = count;
          if(nbrOwners==null||nbrOwners.length==0)
          this.statowner.monthsmoney = "0";
        else{
          this.statowner.monthsmoney = nbrOwners;
        }
        },
        (error) => {
          console.error(error); 
        });

        var money: string;
      this.ownerservice.getTodaysMoney(rest['ProprietaireId']).subscribe(
        (count: string) => {
          money = count;
          if(money==null||money.length==0)
          {
            this.statowner.todaysmoney = "0";
          }
          else{
            this.statowner.todaysmoney = money;
          }
          console.log("to days ----:"+money.length)
        },
        (error) => {
          console.error(error);
        });

  }

 
}
