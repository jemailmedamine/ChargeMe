import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { AuthOwner } from '../models/auth-owner';
import { Owner } from '../models/owner';
import { Born } from '../models/born';
import { GetStationBorn } from '../models/get-station-born';
import { Moderateur } from '../models/moderateur';
import { AllMoedrateur } from '../models/all-moedrateur';
import { ListBigReclamation } from '../models/list-big-reclamation';
import { baseUrl } from './../URL/urls';
import { Admin } from '../models/admin';
import { AllBorn } from '../models/all-born';
import { Station } from '../models/station';
@Injectable({
  providedIn: 'root'
})
export class OwnerService { 

  constructor(private http: HttpClient,private cookies: CookieService) { }

  login(data: AuthOwner): Observable<any> {
    //return this.http.post(apiUrl, data);
    return this.http.post(baseUrl+'loginprop', data);
  }
  logout(): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete(baseUrl+'logoutprop/'+this.cookies.get('token'),{headers});
  }
  getIdOwner(): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<any>(`${baseUrl}tokenowner/${this.cookies.get('token')}`, {
      headers
    });
  }
  getOwner(id:any): Observable<Owner> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };

    return this.http.get<Owner>(`${baseUrl}owner/${id}`, {
      headers
    });
  }
  getOwnerByLog(log:string): Observable<Owner> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };

    return this.http.get<Owner>(`${baseUrl}ownerlog/${log}`, {
      headers
    });
  }
  createOwner(owner:Owner ): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    const createOwnerJson = JSON.stringify(owner);
    return this.http.post(baseUrl+'registerprop', createOwnerJson,{headers});
  }//regenerateCode
  regenerateCode(owner:Owner): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    const createOwnerJson = JSON.stringify(owner);
    return this.http.put(baseUrl+'reverif', createOwnerJson,{headers});
  }
  verifier(owner:Owner): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    const createOwnerJson = JSON.stringify(owner);
    return this.http.put(baseUrl+'propverif', createOwnerJson,{headers});
  }
  UpdateOwner(owner:Owner): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    const createOwnerJson = JSON.stringify(owner);
    return this.http.put(baseUrl+'owner/'+owner.id, createOwnerJson,{headers});
  }
  getAllStation(numPage :number, id:string): Observable<GetStationBorn> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json' 
    };
    /*const params = {
      idowner: id
    };*/
    //const params = new HttpParams({fromObject: data});
    const params = new HttpParams().set('idowner', id); 
    
    return this.http.get<{content:any[],totalPages:string}>(`${baseUrl}filtragestations?page=${numPage}`,{
      params,
      headers,
      
    }).pipe(
      map(response => ({
        stationborn: response.content.map(station => ({
          station: {
            id: station.id,
            registreNumber: station.registreNumber,
            adresse: station.adresse,
            prixKW: station.prixKW,
            name: station.name,
            telf: station.telf,
            confirmationAdmin: station.confirmationAdmin,
            etat: station.etat,
            AdminId: station.AdminId,
          },
          borns: station.Borns.map((born: Born) => ({id:born.id})),
          moderteurs: station.Moderateurs.map((moderateur: Moderateur) => ({id:moderateur.id})),
        })),
        nbr: response.totalPages,
      }))
    );
  }
  getAllStationF(numPage :number, id:string,name:string): Observable<GetStationBorn> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json' 
    };
    /*const params = {
      idowner: id
    };*/
    //const params = new HttpParams({fromObject: data});
    const params = new HttpParams().set('idowner', id); 
    
    return this.http.get<{content:any[],totalPages:string}>(`${baseUrl}filtragestations?page=${numPage}&name=${name}`,{
      params,
      headers,
      
    }).pipe(
      map(response => ({
        stationborn: response.content.map(station => ({
          station: {
            id: station.id,
            registreNumber: station.registreNumber,
            adresse: station.adresse,
            prixKW: station.prixKW,
            name: station.name,
            telf: station.telf,
            confirmationAdmin: station.confirmationAdmin,
            etat: station.etat,
            AdminId: station.AdminId,
          },
          borns: station.Borns.map((born: Born) => ({id:born.id})),
          moderteurs: station.Moderateurs.map((moderateur: Moderateur) => ({id:moderateur.id})),
        })),
        nbr: response.totalPages,
      }))
    );
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
            StationId: moderateur.StationId,
            createdAt: moderateur.createdAt,
            updatedAt: moderateur.updatedAt,
            //stationName:moderateur.Station.map((station: Station) => ({name:station.name})),
            stationName:moderateur.Station.name,
      })),
        nbr: response.totalPages,
      }))
    );
  }
  getAllModerateur(numPage :number,id:string): Observable<AllMoedrateur> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
  
    return this.http.get<{content:any[],totalPages:string}>(`${baseUrl}moderateurs/${id}?page=${numPage}`, {
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
            StationId: moderateur.StationId,
            createdAt: moderateur.createdAt,
            updatedAt: moderateur.updatedAt,
            //stationName:moderateur.Station.map((station: Station) => ({name:station.name})),
            stationName:moderateur.Station.name,
      })),
        nbr: response.totalPages,
      }))
    );
  }
  getAllModerateurF(numPage :number,id:string,login:string): Observable<AllMoedrateur> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
  
    return this.http.get<{content:any[],totalPages:string}>(`${baseUrl}moderateurs/${id}?page=${numPage}&login=${login}`, {
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
            StationId: moderateur.StationId,
            createdAt: moderateur.createdAt,
            updatedAt: moderateur.updatedAt,
            //stationName:moderateur.Station.map((station: Station) => ({name:station.name})),
            stationName:moderateur.Station.name,
      })),
        nbr: response.totalPages,
      }))
    );
  }
  getModerateurByLogin(login: any): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };

    return this.http.get(baseUrl+'moderateurlog/'+login,{headers});
  }
  createModerateur(moddrateur: Moderateur): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
   
    const createModerateurJson = JSON.stringify(moddrateur);
    //console.log("aaaaaaaaaaaaaaaaaa "+data)
    return this.http.post(baseUrl+'registermoderateur', createModerateurJson,{headers});
  }
  BloquerModerateur(moderateur:Moderateur): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };

    return this.http.delete(baseUrl+'bloquermod/'+moderateur.id, {headers});
  }
  UpdateModerateur(moderateur:Moderateur): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    const createModerateurJson = JSON.stringify(moderateur);
    return this.http.put(baseUrl+'moderateur/'+moderateur.id, createModerateurJson,{headers});
  }
  getTodaysMoney(id:string): Observable<string> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<{moneyownerday: string}[]>(`${baseUrl}todaysmoneyowner/${id}`, {
      headers
    }).pipe(
      map(response => response[0].moneyownerday) // Extracting the count from the response
    );
  }
  getMonthsMoney(id:string): Observable<string> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<{moneyownermonth: string}[]>(`${baseUrl}monthsmoneyowner/${id}`, {
      headers
    }).pipe(
      map(response => response[0].moneyownermonth) // Extracting the count from the response
    );
  }

  getNbrModerateur(id:string): Observable<string> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<{count: string}>(`${baseUrl}moderateurownernbr/${id}`, {
      headers
    }).pipe(
      map(response => response.count) // Extracting the count from the response
    );
  }
  getNbrStation(id:string): Observable<string> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<{count: string}>(`${baseUrl}stationownernbr/${id}`, {
      headers
    }).pipe(
      map(response => response.count) // Extracting the count from the response
    );
  } 


  getAllReclamation(numPage :number,id:string): Observable<ListBigReclamation> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
  
    return this.http.get<{content:any[],totalPages:string}>(`${baseUrl}reclamationsbyowner/${id}?page=${numPage}`, {
      headers
    }).pipe(
      map(response => ({
        bigReclam: response.content.map(reclam => ({
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
            id: reclam?.Born_id,
            name:reclam?.Born_name,
            serialNumber:reclam?.Born_serialNumber,
            etatB:reclam?.Born_etatB,
            pourcentageP:reclam?.Born_pourcentageP,
            proprietaire:reclam?.Born_proprietaire,
            NumeroTel:reclam?.Born_NumeroTel,
            createdAt:reclam?.Born_createdAt,
            updatedAt:reclam?.Born_updatedAt,
            StationId:reclam?.Born_StationId,
          },
          client:{
            id:reclam?.Client_id,
            firstname:reclam?.Client_firstname,
            lastname:reclam?.Client_lastname,
            login:reclam?.Client_login,
            password:reclam?.Client_password,
            email:reclam?.Client_email,
            image:reclam?.Client_image,
            phone:reclam?.Client_phone,
            loginType:reclam?.Client_loginType,
            codeVerif:reclam?.Client_codeVerif,
            etatVerif:reclam?.Client_etatVerif,
            connexion:reclam?.Client_connexion,
            BlackList:reclam?.Client_BlackList,
            createdAt:reclam?.Client_createdAt,
            updatedAt:reclam?.Client_updatedAt,

          }, 
          moderateur:{
            id:reclam?.Moderateur_id,
            firstname:reclam?.Moderateur_firstname,
            lastname:reclam?.Moderateur_lastname,
            login:reclam?.Moderateur_login,
            password:reclam?.Moderateur_password,
            image:reclam?.Moderateur_image,
            phone:reclam?.Moderateur_phone,
            connexion:reclam?.Moderateur_connexion,
            etat:reclam?.Moderateur_etat,
            createdAt:reclam?.Moderateur_createdAt,
            updatedAt:reclam?.Moderateur_updatedAt,

          }, 
          station:{
            id:reclam?.Born_Station_id,
            registreNumber:reclam?.Born_Station_registreNumber,
            adresse:reclam?.Born_Station_adresse,
            name:reclam?.Born_Station_name,
            etat:reclam?.Born_Station_etat,
            stationType:reclam?.Born_Station_stationType,
            confirmationAdmin:reclam?.Born_Station_confirmationAdmin,
            prixKW:reclam?.Born_Station_prixKW,
            telf:reclam?.Born_Station_telf,
            longitude:reclam?.Born_Station_longitude,
            latitude:reclam?.Born_Station_latitude,
            createdAt:reclam?.Born_Station_createdAt,
            updatedAt:reclam?.Born_Station_updatedAt,
            AdminId:reclam?.Born_Station_AdminId,
            ProprietaireId:reclam?.Born_Station_ProprietaireId,
          } ,
      })),
        nbr: response.totalPages,
      }))
    );
  }
}
