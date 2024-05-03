import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  private station = [
    { id: 1, name: 'John',  phone: '123456789', address: '123 Main St', zone: 'Zone A', status: 'Active', bornenum: 5 },
    { id: 2, name: 'Jane', phone: '987654321', address: '456 Elm St', zone: 'Zone B', status: 'Inactive', bornenum: 3 },
    // Ajoutez plus de modérateurs si nécessaire
  ];

  constructor() { }

  getModeratorById(id: number): Observable<any> {
    const moderator = this.station.find(m => m.id === id);
    return of(moderator); // Simuler une requête HTTP pour récupérer le modérateur par son ID
  }

  updateModerator(moderator: any): Observable<any> {
    const index = this.station.findIndex(m => m.id === moderator.id);
    if (index !== -1) {
      this.station[index] = moderator;
    }
    return of({ success: true }); // Simuler une requête HTTP pour mettre à jour le modérateur
  }
}
