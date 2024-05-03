import { Component } from '@angular/core';
//import { NotificationService } from '../notification.service';
@Component({
  selector: 'app-notification-popup',
  templateUrl: './notification-popup.component.html',
  styleUrl: './notification-popup.component.css'
})
export class NotificationPopupComponent {
  isNotificationPopupOpen: boolean = false;
notifications: any;

  toggleNotificationPopup(): void {
    this.isNotificationPopupOpen = !this.isNotificationPopupOpen;
  }
}// app.component.ts

