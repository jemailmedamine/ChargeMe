// notification.service.ts

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications: Subject<string[]> = new Subject<string[]>();

  constructor() { }

  getNotifications(): Subject<string[]> {
    return this.notifications;
  }

  showNotification(message: string): void {
    this.notifications.next([message]);
  }
}
