import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { OwnerService } from '../../services/owner.service';
import { AuthOwner } from '../../models/auth-owner';

@Component({
  selector: 'app-login-owner',
  templateUrl: './login-owner.component.html',
  styleUrls: ['./login-owner.component.css']
})
export class LoginOwnerComponent implements OnInit {
  constructor(private authOwnerService: OwnerService, private cookies: CookieService, private router: Router) { }
  owner = new AuthOwner();
  verificationCode: string = '';
  showVerificationPopup: boolean = false;

  ngOnInit(): void {
    if (this.cookies.get('token')) {
      this.router.navigate(['/home']);
    }
  }

  async login() {
    var label = document.getElementById("alert");
    var label2 = document.getElementById("blocked");
          if(label)
          {
            label.style.display = "none";
          }
          if(label2)
          {
            label2.style.display = "none";
          }
    try {
      this.owner.loginType = "N";
      var res = await this.authOwnerService.login(this.owner).toPromise();
    
      if(res["token"])
      {
        console.log(res["token"])
      this.cookies.set("token",res['token'])
      this.router.navigate(['/home']);
      }
      else if(res && res.msg)
        {
          if(label2)
          {
            label2.style.display = "block"; 
          }
        }
        else if(res && res.msgk)
        {
          this.showVerificationPopup = true;
        }
    } catch {
      var label = document.getElementById("alert");
      if(label)
      {
        label.style.display = "block";
      }
      console.log("pas de token bro ooooooooooooooooooooo")
      
       
     // this.showVerificationPopup = true;
    }
  }

  closePopup() {
    this.showVerificationPopup = false;
  }

 async regenerate() {
  var label = document.getElementById("alertreg");
    var label2 = document.getElementById("alertival");
          if(label)
          {
            label.style.display = "none";
          }
          if(label2)
          {
            label2.style.display = "none";
          }
    if(this.owner.login)
    var res = await this.authOwnerService.regenerateCode(this.owner).toPromise();
    if(res && res == "ok")
    {
      if(label)
      {
        label.style.display = "block";
      }
    }
  }

 async confirm() {
    //this.showVerificationPopup = false;
    var label = document.getElementById("alertreg");
    var label2 = document.getElementById("alertival");
          if(label)
          {
            label.style.display = "none";
          }
          if(label2)
          {
            label2.style.display = "none";
          }
          this.owner.codeVerif=this.verificationCode
          var res = await this.authOwnerService.verifier(this.owner).toPromise();
          if(res && (res.msgrg||res.msgnv))
          {
            if(label2)
            {
              label2.style.display = "block";
            }
          }else if(res && (res.msgrg||res.msgv))
          {
            this.showVerificationPopup = false;
          }
  }

  image = './assets/charge.png';
  facebook = './assets/facebook.png';
  apple = './assets/apple.png';
  google = './assets/google.png';
  twitter = './assets/twitter.png';
}
