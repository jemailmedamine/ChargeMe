import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { StatAdmin } from '../../models/stat-admin';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SuperadminService } from '../../services/superadmin.service';
import { AllHistStat } from '../../models/all-hist-stat';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  constructor(private authAdminService: SuperadminService,private cookies:CookieService,private router:Router,private cdr: ChangeDetectorRef) { }
  statadmin = new StatAdmin()
  page=0
  listhist=new AllHistStat()
  lineChart=new Chart({
   
  })
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    if(!this.cookies.get('token')) 
    {
      this.router.navigate(['/loginadmin'])
    }

    this.getStatAdmin()
    this.getAllHist()
  }
  async getAllHist() {
    var res= await this.authAdminService.getAllStatHistorique(this.page).toPromise();
    if(res)
    {
      this.listhist=res
      console.clear()
      console.log("-----aa-----"+this.listhist.historyqs?.length+"-----aa----")
    }
      var jours:any[]=[]
      var nbrHistory=[]
    if (this.listhist.historyqs) {  // Vérifiez si historyqs existe avant de boucler
      for (var hs of this.listhist.historyqs) {
          jours.push(hs.jour)
          nbrHistory.push(hs.nombreHistoriques)
      }
    var  lineChart2=new Chart({
        chart: {
          type: 'line'
        },
        title: {
          text: 'Service Evolution Curve'
        },
        credits: {
          enabled: false
        },
        xAxis: { // Personnalisation de l'axe des x
          categories: jours // Ajoutez vos propres valeurs pour les mois ou les périodes correspondantes
        },
        yAxis: { // Personnalisation de l'axe des y
          title: {
            text: 'Number of recharges' // Titre de l'axe des y
          }
        },
        series: [
          {
            name: 'Days',
            data: nbrHistory // Modifiez ces valeurs pour refléter vos données personnalisées
          } as any
        ]
      })
      this.lineChart=lineChart2
  }
  }
  imgprofil='./assets/images.jpeg';
  async getStatAdmin()
  {
    var nbrClient: string;
    this.authAdminService.getNbrClient().subscribe(
      (count: string) => {
        nbrClient = count;
        if(nbrClient==null||nbrClient.length==0)
        this.statadmin.nbrclient = "0";
      else{
        this.statadmin.nbrclient = nbrClient;
      }
        //this.statadmin.nbrclient = nbrClient;
      },
      (error) => {
        console.error(error);
      });

      var nbrStation: string;
    this.authAdminService.getNbrStation().subscribe(
      (count: string) => {
        nbrStation = count;
        if(nbrStation==null||nbrStation.length==0)
        this.statadmin.nbrstation = "0";
      else{
        this.statadmin.nbrstation = nbrStation;
      }
       // this.statadmin.nbrstation = nbrStation;
      },
      (error) => {
        console.error(error);
      });

      var nbrOwners: string;
      this.authAdminService.getNbrOwner().subscribe( 
        (count: string) => {
          nbrOwners = count;
          if(nbrOwners==null||nbrOwners.length==0)
          this.statadmin.nbrowners = "0";
        else{
          this.statadmin.nbrowners = nbrOwners;
        }
          //this.statadmin.nbrowners = nbrOwners;
        },
        (error) => {
          console.error(error);  
        });

        //var money: string;
      var  money =await this.authAdminService.getTodaysMoney().toPromise();
      if(money==null||money.length==0)
          this.statadmin.todaysmoney = "0";
        else{
          this.statadmin.todaysmoney = money;
        }
      // this.authAdminService.getTodaysMoney().subscribe(
      //   (count: string) => {
      //     money = count;
      //     if(money==null||money.length==0)
      //     this.statadmin.todaysmoney = "0";
      //   else{
      //     this.statadmin.todaysmoney = money;
      //   }
      //     //this.statadmin.todaysmoney = money;
      //   },
      //   (error) => {
      //     console.error(error);
      //   });
  }
  async  Previous() {
    if (this.page < (Number(this.listhist.totalPages) - 1)) {
      this.page = this.page + 1
      var res= await this.authAdminService.getAllStatHistorique(this.page).toPromise();
    if(res)
    {
      this.listhist=res
      console.clear()
      console.log("-----aa-----"+this.listhist.historyqs?.length+"-----aa----")
    }
      var jours:any[]=[]
      var nbrHistory=[]
    if (this.listhist.historyqs) {  // Vérifiez si historyqs existe avant de boucler
      for (var hs of this.listhist.historyqs) {
          jours.push(hs.jour)
          nbrHistory.push(hs.nombreHistoriques)
      }
    var  lineChart2=new Chart({
        chart: {
          type: 'line'
        },
        title: {
          text: 'Service Evolution Curve'
        },
        credits: {
          enabled: false
        },
        xAxis: { // Personnalisation de l'axe des x
          categories: jours // Ajoutez vos propres valeurs pour les mois ou les périodes correspondantes
        },
        yAxis: { // Personnalisation de l'axe des y
          title: {
            text: 'Number of recharges' // Titre de l'axe des y
          }
        },
        series: [
          {
            name: 'Days',
            data: nbrHistory // Modifiez ces valeurs pour refléter vos données personnalisées
          } as any
        ]
      })
      this.lineChart=lineChart2
  }
    }
  }

  async next() {
    if (this.page > 0) {
      this.page = this.page - 1
      var res= await this.authAdminService.getAllStatHistorique(this.page).toPromise();
      if(res)
      {
        this.listhist=res
        console.clear()
        console.log("-----aa-----"+this.listhist.historyqs?.length+"-----aa----")
      }
        var jours:any[]=[]
        var nbrHistory=[]
      if (this.listhist.historyqs) {  // Vérifiez si historyqs existe avant de boucler
        for (var hs of this.listhist.historyqs) {
            jours.push(hs.jour)
            nbrHistory.push(hs.nombreHistoriques)
        }
      var  lineChart2=new Chart({
          chart: {
            type: 'line'
          },
          title: {
            text: 'Service Evolution Curve'
          },
          credits: {
            enabled: false
          },
          xAxis: { // Personnalisation de l'axe des x
            categories: jours // Ajoutez vos propres valeurs pour les mois ou les périodes correspondantes
          },
          yAxis: { // Personnalisation de l'axe des y
            title: {
              text: 'Number of recharges' // Titre de l'axe des y
            }
          },
          series: [
            {
              name: 'Days',
              data: nbrHistory // Modifiez ces valeurs pour refléter vos données personnalisées
            } as any
          ]
        })
        this.lineChart=lineChart2
    }
    }
  }
 
}
