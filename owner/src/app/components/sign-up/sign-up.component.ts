import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerService } from '../../services/owner.service';
import { CookieService } from 'ngx-cookie-service';
import { Owner } from '../../models/owner';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  @ViewChild('submitButton') submitButton!: ElementRef;
  image = './assets/charge.png';
  createOwnerForm:FormGroup
  owner=new Owner()
  constructor(private ownerservice:OwnerService,private formBuilder: FormBuilder,private cookies:CookieService,private router:Router) 
  {
    this.createOwnerForm = this.formBuilder.group({});
  }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  navigateToLoginOwner(): void {
    this.router.navigate(['/loginowner']);
  }
  isFormValid(): boolean {
    // Vérifier si le formulaire est valide en utilisant la propriété valid de FormGroup
    return this.createOwnerForm.valid;
  }
async signIn(event: Event) {
    // Implement your sign-in logic here
    console.log("ffnfcnfcnfcnfc")
    var labelE = document.getElementById("alertexistmailup");
    if(labelE)
    {
      labelE.style.display = "none";
    }
    var label = document.getElementById("alertprob");
    if(label)
    {
      label.style.display = "none";
    }
    var labelE2 = document.getElementById("alertmajuscr");
    if(labelE2)
      {
        labelE2.style.display = "none";
      }
    event.preventDefault();
    if (this.isFormValid())
    {this.owner.loginType="N"
    this.submitButton.nativeElement.disabled = false;
        if(this.owner.login)
        { 
          if(this.owner.login!=this.owner.login.toLowerCase())
            {
              if(labelE2)
                    {
                      labelE2.style.display = "block";
                      //
                      
                    }
            }
         else
          {
            var res= await this.ownerservice.getOwnerByLog(this.owner.login).toPromise();
          if(res && res.createdAt)
          {
            if(labelE)
            {
              labelE.style.display = "block";
              this.submitButton.nativeElement.disabled = false;
              // console.clear()
              // console.log("===>>> "+this.owner.loginType)
            }
          }
          else{
            try {
              var rest= await this.ownerservice.createOwner(this.owner).toPromise();
              if(rest && rest.createdAt)
              {
                this.navigateToLoginOwner();
             // location.reload();
              }
            } catch (error) {
              if(label)
              {
                label.style.display = "block";
                
              }
            }
          }
          }

   

        }
    }

  }
}
