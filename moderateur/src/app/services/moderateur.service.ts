import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { AuthAdmin } from '../models/auth-admin';

import { ListBigReclamation } from '../models/list-big-reclamation';
import { ListeReservation } from '../models/liste-reservation';
import { baseUrl } from './../URL/urls';
import { AllBorn } from '../models/all-born';
import { Socket, io } from 'socket.io-client';
import { Reservation } from '../models/reservation';
import { Admin } from '../models/admin';
import { Born } from '../models/born';
@Injectable({
  providedIn: 'root'
})
export class ModerateurService {
  private socket: Socket
  constructor(private http: HttpClient,private cookies: CookieService)
   { 
    this.socket = io('http://localhost:3000'); 
   }

  listenToBornUpdate(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('born_up', (data: any) => {
        observer.next(data);
      });
    });
  }
  login(data: AuthAdmin): Observable<any> {
    //return this.http.post(apiUrl, data);
    return this.http.post(baseUrl+'loginmoderateur', data);
  }
  logout(): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete(baseUrl+'logoutmoderateur/'+this.cookies.get('token'),{headers});
  }
  UpdateModerateur(moderateur:Admin): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    const createModerateurJson = JSON.stringify(moderateur);
    return this.http.put(baseUrl+'moderateur/'+moderateur.id, createModerateurJson,{headers});
  }
  getIdModerateur(): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<any>(`${baseUrl}tokenmoderateur/${this.cookies.get('token')}`, {
      headers
    });
  }
  getModerateur(id:any): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };

    return this.http.get<any>(`${baseUrl}moderateur/${id}`, {
      headers
    });
  }
  getAllReclamation(numPage :number,id:number): Observable<ListBigReclamation> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
  
    return this.http.get<{content:any[],totalPages:string}>(`${baseUrl}reclamationsbymoderateur/${id}?page=${numPage}`, {
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
            phone: reclam?.phone,
            AdminId: reclam?.AdminId,
            BornId: reclam?.BornId,
            ClientId: reclam?.ClientId,
            ModerateurId: reclam?.ModerateurId,
          },
          born:{
            id: reclam.Born?.id,
            name:reclam.Born?.name,
            serialNumber:reclam.Born?.serialNumber,
            etatB:reclam.Born?.etatB,
            proprietaire:reclam.Born?.proprietaire,
            pourcentageP:reclam.Born?.pourcentageP,
            NumeroTel:reclam.Born?.NumeroTel,
            createdAt:reclam.Born?.createdAt,
            updatedAt:reclam.Born?.updatedAt,
            StationId:reclam.Born?.StationId,
          },
          client:{
            id:reclam.Client?.id,
            firstname:reclam.Client?.firstname,
            lastname:reclam.Client?.lastname,
            login:reclam.Client?.login,
            password:reclam.Client?.password,
            email:reclam.Client?.email,
            image:reclam.Client?.image,
            phone:reclam.Client?.phone,
            loginType:reclam.Client?.loginType,
            codeVerif:reclam.Client?.codeVerif,
            etatVerif:reclam.Client?.etatVerif,
            connexion:reclam.Client?.connexion,
            BlackList:reclam.Client?.BlackList,
            createdAt:reclam.Client?.createdAt,
            updatedAt:reclam.Client?.updatedAt,

          }, 
          moderateur:{
            id:reclam.Moderateur?.id,
            firstname:reclam.Moderateur?.firstname,
            lastname:reclam.Moderateur?.lastname,
            login:reclam.Moderateur?.login,
            password:reclam.Moderateur?.password,
            image:reclam.Moderateur?.image,
            phone:reclam.Moderateur?.phone,
            connexion:reclam.Moderateur?.connexion,
            etat:reclam.Moderateur?.etat,
            createdAt:reclam.Moderateur?.createdAt,
            updatedAt:reclam.Moderateur?.updatedAt,

          }, 
          
      })),
        nbr: response.totalPages,
      }))
    );
  }
  
  getAllReservation(numPage :number,id:number,etat:string): Observable<ListeReservation> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
  
    return this.http.get<{content:any[],totalPages:string}>(`${baseUrl}reservationsbymoderateur/${id}/${etat}?page=${numPage}`, {
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
  UpdateReserv(reserv:Reservation): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    const createReservJson ={ "etat": reserv.etat };
    return this.http.put(baseUrl+'reservation/'+reserv.id, createReservJson,{headers});
  }
  getAllBorn( idStation:number): Observable<AllBorn> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
  
    return this.http.get<{content:any[]}>(`${baseUrl}bornbystation/${idStation}`, {
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
        //nbr: response?.totalPages,
      }))
    );
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
}
