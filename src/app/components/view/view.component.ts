import { Component ,Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
  @Input() adminDetails: any;
  @Output() sendEmail: EventEmitter<any> = new EventEmitter();
  @Output() call: EventEmitter<any> = new EventEmitter();
 

  constructor() { }
  onSendEmail() {
    this.sendEmail.emit();
  }

  onCall() {
    this.call.emit();
  }
}
