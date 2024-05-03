// notification.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // Importez les modules RxJS si nécessaire

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  getNotifications(): Observable<any[]> {
    // Logique pour récupérer les notifications depuis un serveur ou une source de données simulée
    // Ici, nous utilisons une source de données simulée avec des notifications statiques
    const notifications = [
      { id: 1, title: 'reclamation client', body: 'Description de la notification 1' },
      { id: 2, title: 'request', body: 'Description de la notification 2' },
      { id: 3, title: 'request', body: 'Description de la notification 3' }
    ];
    return of(notifications); // Utilisez 'of' pour retourner les notifications sous forme d'Observable
  }
}
