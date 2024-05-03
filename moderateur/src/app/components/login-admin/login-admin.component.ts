import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthAdmin } from '../../models/auth-admin';
import { ModerateurService } from '../../services/moderateur.service';


@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent implements OnInit {

  constructor(private moderateurservice:ModerateurService,private cookies:CookieService,private router:Router) { }
  admin=new AuthAdmin()
  space=""
  currentURL = window.location.href; 
  
  ngOnInit(): void {
    
      this.space="Moderator"
      if(this.cookies.get('token'))
      { 
        this.router.navigate(['/home-mod'])
      }
   

  
  }

  async login()
{
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

  
     try{
      var res= await this.moderateurservice.login(this.admin).toPromise();   
      if(res["token"])
      {
        console.log(res["token"])
      this.cookies.set("token",res['token'])
      this.router.navigate(['/home-mod'])
      }
      else if(res && res.msg)
        {
          if(label2)
          {
            label2.style.display = "block";
          }
        }
    }
    catch{
      var label = document.getElementById("alert");
      if(label)
      {
        label.style.display = "block";
      }
      console.log("pas de token bro ooooooooooooooooooooo")

        }

    
 
}
image='./assets/charge.png';
}
