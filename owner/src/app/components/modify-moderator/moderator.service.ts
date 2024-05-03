import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeratorService {
  private moderators = [
    { id: 1, firstname: 'John', lastname: 'Doe', phone: '123456789', address: '123 Main St', zone: 'Zone A', status: 'Active', stationnum: 5 },
    { id: 2, firstname: 'Jane', lastname: 'Smith', phone: '987654321', address: '456 Elm St', zone: 'Zone B', status: 'Inactive', stationnum: 3 },
    // Ajoutez plus de modérateurs si nécessaire
  ];

  constructor() { }

  getModeratorById(id: number): Observable<any> {
    const moderator = this.moderators.find(m => m.id === id);
    return of(moderator); // Simuler une requête HTTP pour récupérer le modérateur par son ID
  }

  updateModerator(moderator: any): Observable<any> {
    const index = this.moderators.findIndex(m => m.id === moderator.id);
    if (index !== -1) {
      this.moderators[index] = moderator;
    }
    return of({ success: true }); // Simuler une requête HTTP pour mettre à jour le modérateur
  }
}
