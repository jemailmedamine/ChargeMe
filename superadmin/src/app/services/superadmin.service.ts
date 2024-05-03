import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthAdmin } from '../models/auth-admin';
import { Observable, map } from 'rxjs';
import { ListHistorique } from '../models/list-historique';
import { Station } from '../models/station';
import { GetOwnerStation } from '../models/get-owner-station';
import { Born } from '../models/born';
import { GetStationBorn } from '../models/get-station-born';
import { AllClient } from '../models/all-client';
import { Client } from '../models/client';
import { AllAdmins } from '../models/all-admins';
import { ZoneAdmin } from '../models/zone-admin';
import { AllMoedrateur } from '../models/all-moedrateur';
import { ListeReservation } from '../models/liste-reservation';
import { ListeReclamationSuper } from '../models/liste-reclamation-super';
import { baseUrl } from './../URL/urls';
import { Connecteur } from '../models/connecteur';
import { Chargetype } from '../models/chargetype';
import { AllBorn } from '../models/all-born';
import { Admin } from '../models/admin';
import { Owner } from '../models/owner';
import { BornConnecteur } from '../models/born-connecteur';
import { Moderateur } from '../models/moderateur';
import { Socket, io } from 'socket.io-client';
import { AllHistStat } from '../models/all-hist-stat';

@Injectable({ 
  providedIn: 'root'
})
export class SuperadminService {
  private socket: Socket 
  constructor(private http: HttpClient,private cookies: CookieService) 
  {
    this.socket = io('http://localhost:3000');
  }

  login(data: AuthAdmin): Observable<any> {
    //return this.http.post(apiUrl, data);
    return this.http.post(baseUrl+'loginsuper', data);
  }
  logout(): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete(baseUrl+'logoutsuperadmin/'+this.cookies.get('token'),{headers});
  }
  listenToHist(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('histo', (data: any) => {
        observer.next(data);
      });
    });
  }
  UpdateSuperAdmin(admin:Admin): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    const createAdminJson = JSON.stringify(admin);
    return this.http.put(baseUrl+'superadmin/'+admin.id, createAdminJson,{headers});
  }
  getIdSuperAdmin(): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };

    return this.http.get<any>(`${baseUrl}tokenSuperadmin/${this.cookies.get('token')}`, {
      headers
    });
  }
  getSuperAdmin(id:any): Observable<Admin> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };

    return this.http.get<Admin>(`${baseUrl}superadmin/${id}`, {
      headers
    });
  }
  getAllHistorique(numPage :number): Observable<ListHistorique> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
  
    return this.http.get<{content:any[],totalPages:string}>(`${baseUrl}historiques?page=${numPage}`, {
      headers
    }).pipe(
      map(response => ({
        historiques: response.content.map(hist => ({
          id: hist?.id,
          referenceReserv: hist?.referenceReserv,
          dateDebut: hist?.dateDebut,
          dateFin: hist?.dateFin,
          revenueChargeMe: hist?.revenueChargeMe,
          revenueOwner: hist?.revenueOwner,
          consomationKW: hist?.consomationKW,
          revenueTot: hist?.revenueTot,
          revenueNet: hist?.revenueNet,
          personne: hist?.personne,
          IdPersonne: hist?.IdPersonne,
          createdAt: hist?.createdAt,
          updatedAt: hist?.updatedAt,
          BornConnectId: hist?.BornConnectId,
          bornName: hist?.BornConnect?.Born?.name,
          stationName: hist?.BornConnect?.Born?.Station?.name,
         
      })),
        nbr: response.totalPages,
      }))
      
    );
  }
  getAllAdmin(numPage :number): Observable<AllAdmins> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };

    return this.http.get<{content:any[],totalPages:string}>(`${baseUrl}filtrageadmins?page=${numPage}`, {
      headers
    }).pipe(
      map(response => ({
        admins: response.content.map(admin => ({
          admin: {
            id: admin.id,
            firstname: admin.firstname,
            lastname: admin.lastname,
            etat: admin.etat,
            phone: admin.phone,
            login: admin.login,
            password: admin.password,
            longitude: admin.longitude,
            latitude: admin.latitude,
          },
          zones: admin.ZoneAdmins.map((zoneAdmin: { Zone: { name: any; }; }) => zoneAdmin.Zone.name),
          stations: admin.Stations.map((station:Station)=> ({id:station.id})),
          
        })),
        nbr: response.totalPages,
      }))
    );
  }
  getAllAdminF(numPage :number, email:string): Observable<AllAdmins> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };

    return this.http.get<{content:any[],totalPages:string}>(`${baseUrl}filtrageadmins?page=${numPage}&email=${email}`, {
      headers
    }).pipe(
      map(response => ({
        admins: response.content.map(admin => ({
          admin: {
            id: admin.id,
            firstname: admin.firstname,
            lastname: admin.lastname,
            etat: admin.etat,
            phone: admin.phone,
            login: admin.login,
            password: admin.password,
            longitude: admin.longitude,
            latitude: admin.latitude,
          },
          zones: admin.ZoneAdmins.map((zoneAdmin: { Zone: { name: any; }; }) => zoneAdmin.Zone.name),
          stations: admin.Stations.map((station:Station)=> ({id:station.id})),
          
        })),
        nbr: response.totalPages,
      }))
    );
  }

 /* getAllClient(numPage :number): Observable<Client[]> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };

    return this.http.get<{content:Client[]}>(`${baseUrl}clients?page=${numPage}`, {
      headers
    }).pipe(
      map((response: any) => response.content)
    );
  }
*/
getAllClient(numPage :number): Observable<AllClient> {
  const headers = {
    'Authorization': `Bearer ${this.cookies.get('token')}`
  };

  return this.http.get<{content:Client[],totalPages:string}>(`${baseUrl}filtrageclient?page=${numPage}`, {
    headers
  }).pipe(
    map(response => ({
      clients: response.content.map(client => ({
          id: client.id,
          firstname: client.firstname,
          lastname: client.lastname,
          password: client.password,
          email: client.email,
          login: client.login,
          image: client.image,
          phone: client.phone,
          loginType: client.loginType,
          codeVerif: client.codeVerif,
          etatVerif: client.etatVerif,
          connexion: client.connexion,
          BlackList: client.BlackList,
          createdAt: client.createdAt,
          updatedAt: client.updatedAt,
      }as Client)),
      nbr: response.totalPages,
    }as AllClient))
  );
}
getAllClientF(numPage :number,email:string): Observable<AllClient> {
  const headers = {
    'Authorization': `Bearer ${this.cookies.get('token')}`
  };

  return this.http.get<{content:Client[],totalPages:string}>(`${baseUrl}filtrageclient?page=${numPage}&email=${email}`, {
    headers
  }).pipe(
    map(response => ({
      clients: response.content.map(client => ({
          id: client.id,
          firstname: client.firstname,
          lastname: client.lastname,
          password: client.password,
          email: client.email,
          login: client.login,
          image: client.image,
          phone: client.phone,
          loginType: client.loginType,
          codeVerif: client.codeVerif,
          etatVerif: client.etatVerif,
          connexion: client.connexion,
          BlackList: client.BlackList,
          createdAt: client.createdAt,
          updatedAt: client.updatedAt,
      }as Client)),
      nbr: response.totalPages,
    }as AllClient))
  );
}


  getAllStation(numPage :number,confirmationAdmin:String): Observable<GetStationBorn> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };

    return this.http.get<{content:any[],totalPages:string}>(`${baseUrl}filtragestations?page=${numPage}&confirmation=`+confirmationAdmin, {
      headers
    }).pipe(
      map(response => ({
        stationborn: response.content.map(station => ({
          station: {
            id: station.id,
            registreNumber: station.registreNumber,
            adresse: station.adresse,
            prixKW: station.prixKW,
            longitude: station.longitude,
            latitude: station.latitude,
            stationType: station.stationType,
            name: station.name,
            telf: station.telf,
            confirmationAdmin: station.confirmationAdmin,
            etat: station.etat,
            AdminId: station.AdminId,
            ProprietaireId: station.ProprietaireId,
          },
          borns: station.Borns.map((born: Born) => ({id:born.id})),
        })),
        nbr: response.totalPages,
      }))
    );
  }
  getAllStationF(numPage :number,confirmationAdmin:String,name:string): Observable<GetStationBorn> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };

    return this.http.get<{content:any[],totalPages:string}>(`${baseUrl}filtragestations?page=${numPage}&name=${name}&confirmation=`+confirmationAdmin, {
      headers
    }).pipe(
      map(response => ({
        stationborn: response.content.map(station => ({
          station: {
            id: station.id,
            registreNumber: station.registreNumber,
            adresse: station.adresse,
            prixKW: station.prixKW,
            longitude: station.longitude,
            latitude: station.latitude,
            stationType: station.stationType,
            name: station.name,
            telf: station.telf,
            confirmationAdmin: station.confirmationAdmin,
            etat: station.etat,
            AdminId: station.AdminId,
            ProprietaireId: station.ProprietaireId,
          },
          borns: station.Borns.map((born: Born) => ({id:born.id})),
        })),
        nbr: response.totalPages,
      }))
    );
  }
  getByStationOwner(idowner:string,numPage :number,confirmationAdmin:String): Observable<GetStationBorn> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };

    return this.http.get<{content:any[],totalPages:string}>(`${baseUrl}stationsowners/${idowner}?page=${numPage}&confirmation=`+confirmationAdmin, {
      headers
    }).pipe(
      map(response => ({
        stationborn: response.content.map(station => ({
          station: {
            id: station.id,
            registreNumber: station.registreNumber,
            adresse: station.adresse,
            prixKW: station.prixKW,
            longitude: station.longitude,
            latitude: station.latitude,
            stationType: station.stationType,
            name: station.name,
            telf: station.telf,
            confirmationAdmin: station.confirmationAdmin,
            etat: station.etat,
            AdminId: station.AdminId,
            ProprietaireId: station.ProprietaireId,
          },
          borns: station.Borns.map((born: Born) => ({id:born.id})),
        })),
        nbr: response.totalPages,
      }))
    );
  }
  getAllOwners(numPage:Number): Observable<GetOwnerStation> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };

    return this.http.get<{content:any[],totalPages:string}>(`${baseUrl}filtrageowners?page=${numPage}`, { 
      headers
    }).pipe(
      map(response => ({
        ownerstation: response.content.map(owner => ({
          owner: {
            id: owner.id,
            firstname: owner.firstname,
            lastname: owner.lastname,
            login: owner.login,
            phone: owner.phone,
            email: owner.email,
            country: owner.country,
            city: owner.city,
            street: owner.street,
            codePostal: owner.codePostal,
            loginType: owner.loginType,
            etat: owner.etat,
          },
          stattions: owner.Stations.map((station: Station) => ({id:station.id})),
        })),
        nbr: response.totalPages,
      }))
    );
  }
  getAllOwnersF(numPage:Number,email:string): Observable<GetOwnerStation> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };

    return this.http.get<{content:any[],totalPages:string}>(`${baseUrl}filtrageowners?page=${numPage}&email=${email}`, { 
      headers
    }).pipe(
      map(response => ({
        ownerstation: response.content.map(owner => ({
          owner: {
            id: owner.id,
            firstname: owner.firstname,
            lastname: owner.lastname,
            login: owner.login,
            phone: owner.phone,
            email: owner.email,
            country: owner.country,
            city: owner.city,
            street: owner.street,
            codePostal: owner.codePostal,
            loginType: owner.loginType,
            etat: owner.etat,
          },
          stattions: owner.Stations.map((station: Station) => ({id:station.id})),
        })),
        nbr: response.totalPages,
      }))
    );
  }
 
  getZone(): Observable<ZoneAdmin[]> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<any[]>(`${baseUrl}adminzone`, {
      headers
    }).pipe(
      map(zones => zones.map(zone => ({ nbr: zone.nbr, name: zone.name })))
    );
  }// retour 2 parametres
  getZoneNoAdmin(): Observable<ZoneAdmin[]> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<any[]>(`${baseUrl}zonenoadmin`, {
      headers
    }).pipe(
      map(zones => zones.map(zone => ({ nbr: "0", name: zone.name })))
    );
  }
  deleteAdminId(id:any): Observable<any[]> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };

    return this.http.delete<any[]>(`${baseUrl}admin/${id}`, {
      headers
    });
  }
  deleteModerateur(idMod: number): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete(baseUrl+'moderateur/'+idMod,{headers});
  }
  getAllModerateur(numPage :number): Observable<AllMoedrateur> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };    
    return this.http.get<{content:any[],totalPages:string}>(`${baseUrl}moderateurs?page=${numPage}`, {
      headers
    }).pipe(
      map(response => ({
        moderateurs: response.content.map(moderateur => ({
            id: moderateur.id,
            firstname: moderateur.firstname,
            lastname: moderateur.lastname,
            password: moderateur.password,
            login: moderateur.login,
            image: moderateur.image,
            phone: moderateur.phone,
            etat: moderateur.etat,
            connexion: moderateur.connexion,
            stationId: moderateur.stationId,
            createdAt: moderateur.createdAt,
            updatedAt: moderateur.updatedAt,
            //stationName:moderateur.Station.map((station: Station) => ({name:station.name})),
            stationName:moderateur.Station.name,
      })),
        nbr: response.totalPages,
      }))
    );
  }
  getAllModerateurF(numPage :number,login:string): Observable<AllMoedrateur> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };    
    return this.http.get<{content:any[],totalPages:string}>(`${baseUrl}moderateurs?page=${numPage}&login=${login}`, {
      headers
    }).pipe(
      map(response => ({
        moderateurs: response.content.map(moderateur => ({
            id: moderateur.id,
            firstname: moderateur.firstname,
            lastname: moderateur.lastname,
            password: moderateur.password,
            login: moderateur.login,
            image: moderateur.image,
            phone: moderateur.phone,
            etat: moderateur.etat,
            connexion: moderateur.connexion,
            stationId: moderateur.stationId,
            createdAt: moderateur.createdAt,
            updatedAt: moderateur.updatedAt,
            //stationName:moderateur.Station.map((station: Station) => ({name:station.name})),
            stationName:moderateur.Station.name,
      })),
        nbr: response.totalPages,
      }))
    );
  }
  deleteReservation(idReserv: number): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete(baseUrl+'reservation/'+idReserv,{headers});
  }
  getAllReservation(numPage :number): Observable<ListeReservation> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
  
    return this.http.get<{content:any[],totalPages:string}>(`${baseUrl}reservations?page=${numPage}`, {
      headers
    }).pipe(
      map(response => ({
        listeResev: response.content.map(data => ({
          id: data?.id,
          reference: data?.reference,
          etat: data?.etat,
          typeCharge: data?.typeCharge,
          typeConnecteur: data?.typeConnecteur,
          dateReservation: data?.dateReservation,
          dateActuelle: data?.dateActuelle,
          period: data?.period,
          createdAt: data?.createdAt,
          updatedAt: data?.updatedAt,
          BornConnectId: data?.BornConnectId,
          ClientId: data?.ClientId,
          Client_id: data?.Client_id,
          firstname: data?.firstname,
          lastname: data?.lastname,
          login: data?.login,
          password: data?.password,
          email: data?.email,
          image: data?.image,
          phone: data?.phone,
          loginType: data?.loginType,
          codeVerif: data?.codeVerif,
          etatVerif: data?.etatVerif,
          connexion: data?.connexion,
          BlackList: data?.BlackList,
          Client_createdAt: data?.Client_createdAt,
          Client_updatedAt: data?.Client_updatedAt,
          BornConnect_id: data?.BornConnect_id,
          BornConnect_etat: data?.BornConnect_etat,
          BornConnect_createdAt: data?.BornConnect_createdAt,
          BornConnect_updatedAt: data?.BornConnect_updatedAt,
          BornConnect_BornId: data?.BornConnect_BornId,
          BornConnect_ConnecteurId: data?.BornConnect_ConnecteurId,
          Born_id: data?.Born_id,
          Born_serialNumber: data?.Born_serialNumber,
          Born_etatB: data?.Born_etatB,
          Born_proprietaire: data?.Born_proprietaire,
          Born_pourcentageP: data?.Born_pourcentageP,
          Born_NumeroTel: data?.Born_NumeroTel,
          Born_name: data?.Born_name,
          Born_createdAt: data?.Born_createdAt,
          Born_updatedAt: data?.Born_updatedAt,
          Born_StationId: data?.Born_StationId,
          Born_Station_id: data?.Born_Station_id,
          Born_Station_registreNumber: data?.Born_Station_registreNumber,
          Born_Station_adresse: data?.Born_Station_adresse,
          Born_Station_name: data?.Born_Station_name,
          Born_Station_etat: data?.Born_Station_etat,
          Born_Station_stationType: data?.Born_Station_stationType,
          Born_Station_confirmationAdmin: data?.Born_Station_confirmationAdmin,
          Born_Station_prixKW: data?.Born_Station_prixKW,
          Born_Station_telf: data?.Born_Station_telf,
          Born_Station_longitude: data?.Born_Station_longitude,
          Born_Station_latitude: data?.Born_Station_latitude,
          Born_Station_createdAt: data?.Born_Station_createdAt,
          Born_Station_updatedAt: data?.Born_Station_updatedAt,
          Born_Station_AdminId: data?.Born_Station_AdminId,
          Born_Station_ProprietaireId: data?.Born_Station_ProprietaireId,
      })),
        nbr: response.totalPages,
      }))
    );
  }
  deleteReclam(idreclam: number): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete(baseUrl+'reclamation/'+idreclam,{headers});
  }
  getAllReclamation(numPage :number): Observable<ListeReclamationSuper> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
  
    return this.http.get<{content:any[],totalPages:string}>(`${baseUrl}reclamations?page=${numPage}`, {
      headers
    }).pipe(
      map(response => ({
        listReclamSuper: response.content.map(reclam => ({
          reclamation:{
            id: reclam?.id,
            dateReclam: reclam?.dateReclam,
            description: reclam?.description,
            etat: reclam?.etat,
            createdAt: reclam?.createdAt,
            updatedAt: reclam?.updatedAt,
            AdminId: reclam?.AdminId,
            BornId: reclam?.BornId,
            ClientId: reclam?.ClientId,
            ModerateurId: reclam?.ModerateurId,
            ProprietaireId: reclam?.ProprietaireId,
          },
          born:{
            id: reclam?.Born?.id,
            name:reclam?.Born?.name,
            serialNumber:reclam?.Born?.serialNumber,
            etatB:reclam?.Born?.etatB,
            pourcentageP:reclam?.Born?.pourcentageP,
            proprietaire:reclam?.Born?.proprietaire,
            NumeroTel:reclam?.Born?.NumeroTel,
            createdAt:reclam?.Born?.createdAt,
            updatedAt:reclam?.Born?.updatedAt,
            StationId:reclam?.Born?.StationId,
          },
          client:{
            id:reclam?.Client?.id,
            firstname:reclam?.Client?.firstname,
            lastname:reclam?.Client?.lastname,
            login:reclam?.Client?.login,
            password:reclam?.Client?.password,
            email:reclam?.Client?.email,
            image:reclam?.Client?.image,
            phone:reclam?.Client?.phone,
            loginType:reclam?.Client?.loginType,
            codeVerif:reclam?.Client?.codeVerif,
            etatVerif:reclam?.Client?.etatVerif,
            connexion:reclam?.Client?.connexion,
            BlackList:reclam?.Client?.BlackList,
            createdAt:reclam?.Client?.createdAt,
            updatedAt:reclam?.Client?.updatedAt,

          }, 
          moderateur:{
            id:reclam?.Moderateur?.id,
            firstname:reclam?.Moderateur?.firstname,
            lastname:reclam?.Moderateur?.lastname,
            login:reclam?.Moderateur?.login,
            password:reclam?.Moderateur?.password,
            image:reclam?.Moderateur?.image,
            phone:reclam?.Moderateur?.phone,
            connexion:reclam?.Moderateur?.connexion,
            etat:reclam?.Moderateur?.etat,
            createdAt:reclam?.Moderateur?.createdAt,
            updatedAt:reclam?.Moderateur?.updatedAt,

          }, 
          station:{
            id:reclam?.Born?.Station?.id,
            registreNumber:reclam?.Born?.Station?.registreNumber,
            adresse:reclam?.Born?.Station?.adresse,
            name:reclam?.Born?.Station?.name,
            etat:reclam?.Born?.Station?.etat,
            stationType:reclam?.Born?.Station?.stationType,
            confirmationAdmin:reclam?.Born?.Station?.confirmationAdmin,
            prixKW:reclam?.Born?.Station?.prixKW,
            telf:reclam?.Born?.Station?.telf,
            longitude:reclam?.Born?.Station?.longitude,
            latitude:reclam?.Born?.Station?.latitude,
            createdAt:reclam?.Born?.Station?.createdAt,
            updatedAt:reclam?.Born?.Station?.updatedAt,
            AdminId:reclam?.Born?.Station?.AdminId,
            ProprietaireId:reclam?.Born?.Station?.ProprietaireId,
          } ,
          admin:{
            id:reclam?.Admin?.id,
            firstname:reclam?.Admin?.firstname,
            lastname:reclam?.Admin?.lastname,
            login:reclam?.Admin?.login,
            etat:reclam?.Admin?.etat,
            phone:reclam?.Admin?.phone,
            longitude:reclam?.Admin?.longitude,
            latitude:reclam?.Admin?.latitude,
          } ,
          owner:{
            id:reclam?.Proprietaire?.id,
            firstname:reclam?.Proprietaire?.firstname,
            lastname:reclam?.Proprietaire?.lastname,
            login:reclam?.Proprietaire?.login,
            email:reclam?.Proprietaire?.email,
            etat:reclam?.Proprietaire?.etat,
            phone:reclam?.Proprietaire?.phone,

          } ,
      })),
        nbr: response.totalPages,
      }))
    );
  }
  createZone(name: string): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    const data = {
      name: name
    };
    //console.log("aaaaaaaaaaaaaaaaaa "+data)
    return this.http.post(baseUrl+'createzone', data,{headers});
  }
  updateZone( ancienName: string,newName: string): Observable<any> {
    const data = {
      name: newName
    };
      const headers = {
        'Authorization': `Bearer ${this.cookies.get('token')}`,
        'Content-Type': 'application/json'
      };
    return this.http.put(baseUrl + 'zone/' + ancienName, data, {headers});
  }
  getonezone(name: string): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };

    return this.http.get(baseUrl+'zone/'+name,{headers});
  }
  deleteZone(name: string): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete(baseUrl+'zone/'+name,{headers});
  }
  
  getTodaysMoney(): Observable<string> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<{money: string}[]>(`${baseUrl}todaysmoneych`, {
      headers
    }).pipe(
      map(response => response[0].money) // Extracting the count from the response
    );
  }

  getNbrClient(): Observable<string> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<{count: string}>(`${baseUrl}clientnbr`, {
      headers
    }).pipe(
      map(response => response.count) // Extracting the count from the response
    );
  }
  getNbrOwner(): Observable<string> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<{count: string}>(`${baseUrl}ownernbr`, {
      headers
    }).pipe(
      map(response => response.count) // Extracting the count from the response
    );
  }
  getNbrStation(): Observable<string> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<{count: string}>(`${baseUrl}stationnbr`, {
      headers
    }).pipe(
      map(response => response.count) // Extracting the count from the response
    );
  }
  getConnecteurById(id:string): Observable<Connecteur> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<Connecteur>(`${baseUrl}connecteur/`+id, {
      headers
    }).pipe(
      map(connecteur => ({
        id:connecteur?.id,
        libelle:connecteur?.libelle,
        reference:connecteur?.reference,
        image:connecteur?.image,
        etat:connecteur?.etat,
        createdAt:connecteur?.createdAt,
        updatedAt:connecteur?.updatedAt,
      }))
    );
  }
  getChargeById(id:string): Observable<Chargetype> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<Chargetype>(`${baseUrl}charge/`+id, {
      headers
    });
  }
  getstationByRN(name: string): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };

    return this.http.get(baseUrl+'station/'+name,{headers});
  }
  createStation(station: Station): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    const createStationJson = JSON.stringify(station);
    //console.log("aaaaaaaaaaaaaaaaaa "+data)
    return this.http.post(baseUrl+'createstation', createStationJson,{headers});
  }
  UpdateStation(station: Station): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    const createStationJson = JSON.stringify(station);
    console.clear()
    console.log("aaaaaaaaaaaaaaaaaa "+station.telf)
    return this.http.put(baseUrl+'station/'+station.id, createStationJson,{headers});
  }
  getAllBorn(numPage :number, idStation:number): Observable<AllBorn> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
  
    return this.http.get<{content:any[],totalPages:string}>(`${baseUrl}bornbystationid/${idStation}?page=${numPage}`, {
      headers
    }).pipe(
      map(response => ({
        borns: response.content.map(born => ({
            id: born.id,
            name: born.name,
            serialNumber: born.serialNumber,
            proprietaire: born.proprietaire,
            etatB: born.etatB,
            pourcentageP: born.pourcentageP,
            NumeroTel: born.NumeroTel,
            StationId: born.StationId,
            createdAt: born.createdAt,
            updatedAt: born.updatedAt,
            
      })),
        nbr: response.totalPages,
      }))
    );
  }
  getAllModerateurbystation(numPage :number,idStation:number): Observable<AllMoedrateur> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
  
    return this.http.get<{content:any[],totalPages:string}>(`${baseUrl}moderateursbystation/${idStation}?page=${numPage}`, {
      headers
    }).pipe(
      map(response => ({
        moderateurs: response.content.map(moderateur => ({
            id: moderateur.id,
            firstname: moderateur.firstname,
            lastname: moderateur.lastname,
            password: moderateur.password,
            login: moderateur.login,
            image: moderateur.image,
            phone: moderateur.phone,
            etat: moderateur.etat,
            connexion: moderateur.connexion,
            stationId: moderateur.stationId,
            createdAt: moderateur.createdAt,
            updatedAt: moderateur.updatedAt,
            //stationName:moderateur.Station.map((station: Station) => ({name:station.name})),
            stationName:moderateur.Station.name,
      })),
        nbr: response.totalPages,
      }))
    );
  }
  getAdminById(id:string): Observable<Admin> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<Admin>(`${baseUrl}admin/`+id, {
      headers
    }).pipe(
      map(admin => ({
        id:admin?.id,
        firstname:admin?.firstname,
        lastname:admin?.lastname,
        login:admin?.login,
        phone:admin?.phone,
        etat:admin?.etat,
        longitude:admin?.longitude,
        latitude:admin?.latitude,
        connexion:admin?.connexion,
        createdAt:admin?.createdAt,
        updatedAt:admin?.updatedAt,
      }))
    );
  }
  getOwnerById(id:string): Observable<Owner> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<Owner>(`${baseUrl}owner/`+id, {
      headers
    });
  }
  getClientById(id:string): Observable<Client> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<Client>(`${baseUrl}client/`+id, {
      headers
    });
  }
  getModerateurById(id:string): Observable<Moderateur> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<Moderateur>(`${baseUrl}moderateur/`+id, {
      headers
    });
  }
  getAllConnecteurs(): Observable<Connecteur[]> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<{connecteurs:any[]}>(`${baseUrl}connecteurs/`, {
      headers
    }).pipe(
      map(response => response.connecteurs.map(conn => ({
          id: conn.id,
          libelle: conn.libelle,
          reference: conn.reference,
          image: conn.image,
          etat: conn.etat,
          createdAt: conn.createdAt,
          updatedAt: conn.updatedAt,
          
      })),
     )
    );
  }
  getBornbySerial(serialNumber:string): Observable<Born> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<Born>(`${baseUrl}bornbyserialn/`+serialNumber, {
      headers
    });
  }
  getBornbyId(idb:string): Observable<Born> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<Born>(`${baseUrl}born/`+idb, {
      headers
    });
  }
  UpdateBorn(born: Born): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    const createBornJson = JSON.stringify(born);
    //console.log("aaaaaaaaaaaaaaaaaa "+data)
    return this.http.put(baseUrl+'born/'+born.id, createBornJson,{headers});
  }
  getBornbyNameAndidStation(idStation:number,name:string): Observable<Born> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<Born>(`${baseUrl}bornbystationbornname/`+idStation+"/"+name, {
      headers
    });
  }
  createBorn(born:Born ): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    const createBornJson = JSON.stringify(born);
    return this.http.post(baseUrl+'createborn', createBornJson,{headers});
  }
  //createBornConnecteur(idb :string,idc:string ): Observable<any> {
  createBornConnecteur(bornconn:BornConnecteur): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    // var bornconn=new BornConnecteur()
    // bornconn.ConnecteurId=idc
    // bornconn.BornId=idb
    const createBornConnJson = JSON.stringify(bornconn);
    return this.http.post(baseUrl+'createbornconn', createBornConnJson,{headers});
  }
  getConnecteursChecked(idborn:string): Observable<Connecteur[]> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<{connecteurs:any[]}>(`${baseUrl}connecteurbyborn/${idborn}`, {
      headers
    }).pipe(
      map(response => response.connecteurs.map(conn => ({
        id: conn.id,
        libelle: conn.libelle,
        reference: conn.reference,
        image: conn.image,
        etat: conn.etat,
        createdAt: conn.createdAt,
        updatedAt: conn.updatedAt,
        
    })),
     )
    );
  }
  deleteStation(idStation: number): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete(baseUrl+'station/'+idStation,{headers});
  }
  deleteBorn(idborn: number): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete(baseUrl+'born/'+idborn,{headers});
  }
  deleteBornConn(idborn: number,idconn:number): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete(baseUrl+'bornconn/'+idborn+"/"+idconn,{headers});
  }
  getAdminByName(login:string): Observable<Admin> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<Admin>(`${baseUrl}adminbylogin/`+login, {
      headers 
    });
  }
  createAdmin(admin:Admin ): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    const createAdminJson = JSON.stringify(admin);
    return this.http.post(baseUrl+'registeradmin', createAdminJson,{headers});
  }
  UpdateAdmin(admin:Admin): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    const createAdminJson = JSON.stringify(admin);
    return this.http.put(baseUrl+'admin/'+admin.id, createAdminJson,{headers});
  }
  BloquerAdmin(admin:Admin): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };

    return this.http.delete(baseUrl+'bloqueradmin/'+admin.id, {headers});
  }
  UpdateOwner(owner:Owner): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    //const BlackList=true
   // const createClientJson = JSON.stringify(BlackList);
   const createOwnerJson ={ "etat": owner.etat };

    return this.http.put(baseUrl+'owner/'+owner.id, createOwnerJson,{headers});
  }
  BloquerOwner(owner:Owner): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };

    return this.http.delete(baseUrl+'bloquerowner/'+owner.id, {headers});
  }
  deleteOwner(idOwner: number): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete(baseUrl+'owner/'+idOwner,{headers});
  }
  UpdateClient(client:Client): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    //const BlackList=true
   // const createClientJson = JSON.stringify(BlackList);
   const createClientJson ={ "BlackList": client.BlackList };

    return this.http.put(baseUrl+'client/'+client.id, createClientJson,{headers});
  }
  // BloquerClient(client:Client): Observable<any> {
  //   const headers = {
  //     'Authorization': `Bearer ${this.cookies.get('token')}`,
  //     'Content-Type': 'application/json'
  //   };

  //   return this.http.delete(baseUrl+'bloquerclient/'+client.id, {headers});
  // }
  BloquerClient(client:Client): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    return new Observable<any>((observer) => {
      this.http.delete(baseUrl+'bloquerclient/'+client.id, {headers}).subscribe(
        (response) => {
          observer.next(response); // Émettre la réponse HTTP réussie à l'observateur

          // Émettre un événement Socket.IO après la mise à jour du client
          this.socket.emit('client_up', response);
        },
        (error) => {
          observer.error(error); // Émettre l'erreur à l'observateur en cas d'échec de la requête HTTP
        }
      );
    });
  }
  listenToClientUpdate(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('client_up', (data: any) => {
        observer.next(data);
      });
    });
  }
  deleteClient(idClient: number): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete(baseUrl+'client/'+idClient,{headers});
  }
  deleteHist(idHist: string): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete(baseUrl+'historique/'+idHist,{headers});
  }
 
  getAllStatHistorique(numPage :number): Observable<AllHistStat> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
  
    return this.http.get<{content:any[],totalPages:string,total:string}>(`${baseUrl}statistiqueHist?page=${numPage}`, {
      headers
    }).pipe(
      map(response => ({
        historyqs: response.content.map(hist => ({
          jour: hist?.jour,
          nombreHistoriques: hist?.nombreHistoriques,
      })),
      totalPages: response.totalPages,
      total:response.total,
      }))
      
    );
  }
}
