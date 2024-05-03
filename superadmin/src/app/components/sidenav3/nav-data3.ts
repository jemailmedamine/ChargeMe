import { RouterLink } from "@angular/router"

export const navbardata=[
    {
RouterLink:'dashboard',
icon:'fa fa-home',
label:'Dashboard'
    },
    {
     RouterLink:'adminlist1',
    icon:'fa  fa-user-circle',
         label:'Admins'
         },
{
RouterLink:'stationlist1',
icon:'fa fa-map',
label:'Stations'
 },
 {
 RouterLink:'ownerlist1',
 icon:'fa fa-user-secret',
 label:'Owners'
 },
 {
    RouterLink:'moderatorlist1',
    icon:'fa fa-user',
    label:'moderators'
    },
 {
    RouterLink:'userlist1',
    icon:'fa fa-users',
    label:'Users'
    },
 {
    RouterLink:'zoneliste1',
    icon:'fa fa-object-ungroup',
     label:'Zones'
     }, 
 {RouterLink:'reclamation',
 icon:'fa fa-clipboard',
  label:'Claims'
  }, 
  {
    RouterLink:'reservation1',
    icon:'fa fa-calendar',
    label:'Reservations'
  } , 

 {RouterLink:'historique',
    icon:'fa fa-history',
     label:'History'
     }, 
    
]