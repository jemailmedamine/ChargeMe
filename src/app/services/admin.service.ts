import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, forkJoin, map, of } from 'rxjs';
import { AuthAdmin } from '../models/auth-admin';
import { Admin } from '../models/admin';
import { AllAdmins } from '../models/all-admins';
import { Station } from '../models/station';
import { GetStationBorn } from '../models/get-station-born';
import { Born } from '../models/born';
import { GetOwnerStation } from '../models/get-owner-station';
import { StatAdmin } from '../models/stat-admin';
import { ZoneAdmin } from '../models/zone-admin';
import { Client } from '../models/client';
import { AllClient } from '../models/all-client';
import { baseUrl } from './../URL/urls';
import { Socket, io } from 'socket.io-client';
import { Owner } from '../models/owner';
import { AllMoedrateur } from '../models/all-moedrateur';
import { AllBorn } from '../models/all-born';
import { Connecteur } from '../models/connecteur';
import { BornConnecteur } from '../models/born-connecteur';
import { AllHistStat } from '../models/all-hist-stat';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  //private socket: SocketIOClient.Socket; 
  private socket: Socket
  constructor(private http: HttpClient,private cookies: CookieService)
  { 
   this.socket = io('http://localhost:3000'); 
  }

  login(data: AuthAdmin): Observable<any> {
    //return this.http.post(apiUrl, data);
    return this.http.post(baseUrl+'loginadmin', data);
  }
  logout(): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete(baseUrl+'logoutadmin/'+this.cookies.get('token'),{headers});
  }
  getIdAdmin(): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };

    return this.http.get<any>(`${baseUrl}tokenadmin/${this.cookies.get('token')}`, {
      headers
    });
  }
  getAdmin(id:any): Observable<Admin> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };

    return this.http.get<Admin>(`${baseUrl}admin/${id}`, {
      headers
    });
  }
  UpdateAdmin(admin:Admin): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    const createAdminJson = JSON.stringify(admin);
    return this.http.put(baseUrl+'admin/'+admin.id, createAdminJson,{headers});
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
getOwnerById(id:string): Observable<Owner> {
  const headers = {
    'Authorization': `Bearer ${this.cookies.get('token')}`
  };
  return this.http.get<Owner>(`${baseUrl}owner/`+id, {
    headers
  });
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
deleteStation(idStation: number): Observable<any> {
  //return this.http.post(apiUrl, data);
  const headers = {
    'Authorization': `Bearer ${this.cookies.get('token')}`,
    'Content-Type': 'application/json'
  };
  return this.http.delete(baseUrl+'station/'+idStation,{headers});
}
UpdateStation(station: Station): Observable<any> {
  //return this.http.post(apiUrl, data);
  const headers = {
    'Authorization': `Bearer ${this.cookies.get('token')}`,
    'Content-Type': 'application/json'
  };
  const createStationJson = JSON.stringify(station);
  //console.log("aaaaaaaaaaaaaaaaaa "+data)
  return this.http.put(baseUrl+'station/'+station.id, createStationJson,{headers});
}
getstationByRN(name: string): Observable<any> {
  //return this.http.post(apiUrl, data);
  const headers = {
    'Authorization': `Bearer ${this.cookies.get('token')}`,
    'Content-Type': 'application/json'
  };

  return this.http.get(baseUrl+'station/'+name,{headers});
}
deleteBornConn(idborn: number,idconn:number): Observable<any> {
  //return this.http.post(apiUrl, data);
  const headers = {
    'Authorization': `Bearer ${this.cookies.get('token')}`,
    'Content-Type': 'application/json'
  };
  return this.http.delete(baseUrl+'bornconn/'+idborn+"/"+idconn,{headers});
}
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
getBornbySerial(serialNumber:string): Observable<Born> {
  const headers = {
    'Authorization': `Bearer ${this.cookies.get('token')}`
  };
  return this.http.get<Born>(`${baseUrl}bornbyserialn/`+serialNumber, {
    headers
  });
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
getBornbyId(idb:string): Observable<Born> {
  const headers = {
    'Authorization': `Bearer ${this.cookies.get('token')}`
  };
  return this.http.get<Born>(`${baseUrl}born/`+idb, {
    headers
  });
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
createBorn(born:Born ): Observable<any> {
  const headers = {
    'Authorization': `Bearer ${this.cookies.get('token')}`,
    'Content-Type': 'application/json'
  };
  const createBornJson = JSON.stringify(born);
  return this.http.post(baseUrl+'createborn', createBornJson,{headers});
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
deleteBorn(idborn: number): Observable<any> {
  //return this.http.post(apiUrl, data);
  const headers = {
    'Authorization': `Bearer ${this.cookies.get('token')}`,
    'Content-Type': 'application/json'
  };
  return this.http.delete(baseUrl+'born/'+idborn,{headers});
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

  getStatAdmin(): Observable<StatAdmin> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };

    return forkJoin({
      nbrclient: this.http.get<{count: string}>(`${baseUrl}clientnbr`, { headers }),
      nbrowners: this.http.get<{count: string}>(`${baseUrl}ownernbr`, { headers }),
      //nbrstation: of("0"),  // Utilisation de la fonction of pour créer un Observable à partir d'une valeur
      nbrstation:  this.http.get<{count: string}>(`${baseUrl}stationnbr`, { headers }),
      todaysmoney: this.http.get<{money: string}[]>(`${baseUrl}todaysmoney`, { headers }),
    }).pipe(
      map((results: any) => { 
        const statadmin = new StatAdmin();
        statadmin.nbrclient = results.nbrclient.count.toString();
        statadmin.nbrowners = results.nbrowners.count.toString();;
        statadmin.nbrstation = results.nbrstation.count.toString();
       // statadmin.todaysmoney = results.todaysmoney.money.toString();
       statadmin.todaysmoney = results.todaysmoney[0].money.toString() ;
        return statadmin;
      })
    );
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


  /*getZone(): Observable<String[]> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<any[]>(`${baseUrl}zones`, {
      headers
    }).pipe(
      map(zones => zones.map(zone => zone.name))
    );
  }*/// retour 1 seul parametre (selement les nom des zone)

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
  // UpdateClient(client: Client): Observable<any> {
  //   const headers = {
  //        'Authorization': `Bearer ${this.cookies.get('token')}`,
  //        'Content-Type': 'application/json'
  //      };
   
  //      const createClientJson = { "BlackList": client.BlackList };
   
  //      return new Observable<any>((observer) => {
  //        this.http.put(baseUrl + 'client/' + client.id, createClientJson, { headers }).subscribe(
  //          (response) => {
  //            observer.next(response); // Émettre la réponse HTTP réussie à l'observateur
   
  //            // Émettre un événement Socket.IO après la mise à jour du client
  //            this.socket.emit('client_up', response);
  //          },
  //          (error) => {
  //            observer.error(error); // Émettre l'erreur à l'observateur en cas d'échec de la requête HTTP
  //          }
  //        );
  //      });
  //    }
   listenToClientUpdate(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('client_up', (data: any) => {
        observer.next(data);
      });
    });
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
  deleteClient(idClient: number): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete(baseUrl+'client/'+idClient,{headers});
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


