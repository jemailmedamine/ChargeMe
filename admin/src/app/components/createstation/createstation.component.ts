import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createstation',
  templateUrl: './createstation.component.html',
  styleUrl: './createstation.component.css'
})
export class CreatestationComponent {
  contactform:FormGroup |any;
  constructor(private formbuilder:FormBuilder,private router:Router){}
  ngOnInit(): void {
    this.contactform=this.formbuilder.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      phone:['',Validators.required],
      city:['',Validators.required]
     })
  }

}
