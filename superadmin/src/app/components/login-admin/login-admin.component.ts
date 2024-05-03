import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthAdmin } from '../../models/auth-admin';
import { SuperadminService } from '../../services/superadmin.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent implements OnInit {

  constructor(private superadminservice:SuperadminService,private cookies:CookieService,private router:Router) { }
  admin=new AuthAdmin()
  space=""
  currentURL = window.location.href; 
  
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
   
      this.space="SuperAdmin"
      if(this.cookies.get('token'))
      { 
        this.router.navigate(['/dashboard'])
      }
  }

  async login()
{
  var label = document.getElementById("alert");
        if(label)
        {
          label.style.display = "none";
        }
  
       try{
        var res= await this.superadminservice.login(this.admin).toPromise();
        if(res["token"])
        {
          this.cookies.set("token",res['token'])
        console.log("we have a token !!!!!")
        this.router.navigate(['/dashboard'])
        }
        
      }catch
      {
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
