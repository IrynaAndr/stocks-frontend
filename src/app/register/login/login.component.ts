import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginregisterService } from 'src/app/loginregister.service';
import { User } from 'src/app/shared/user.module';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private toastr:ToastrService,private router: Router,
    private cookieService: CookieService, public service:LoginregisterService) { }

  ngOnInit(): void {
    this.service.formData.login ='';
  }

  LogUser:User = new User(); 
  parselogin:any;
  x:any;
  type:any;

  
  //test
  testonSubmit(form:NgForm) {
    this.service.postLogin()
      .subscribe(res=>{
        this.parselogin = JSON.parse(JSON.stringify(res));  
      this.x = this.parselogin["Password"];
      console.log('Pass:'+this.x)
      }
        );
  }

  onSubmit(form:NgForm){
    this.service.postLogin().subscribe(
      res =>{
        console.log(res);
        this.parselogin = JSON.parse(JSON.stringify(res));  
        
        this.type = this.parselogin["Type"];
        if(this.type == 2){
        this.router.navigate(['admin']);
        this.cookieService.set('UserId',this.parselogin["Id"]);
        }
        else if (this.type == 1){
          console.log('regular user');
          this.router.navigate(['cabinet']);
          this.cookieService.set('UserId',this.parselogin["Id"]);
        }
        else {
          form.form.reset();
          this.toastr.error('Login Error', res.toString())
        }
      }
    );
  }

}
