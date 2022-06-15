import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginregisterService } from 'src/app/loginregister.service';
import { User } from 'src/app/shared/user.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private toastr:ToastrService,private router: Router,
    private cookieService: CookieService, public service:LoginregisterService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    this.onSubmitpart1(form);
    
  }
  

  onSubmitpart1(form:NgForm){
    this.service.postRegister().subscribe(
      res =>{
        console.log(res);
        this.resetForm(form);
        this.toastr.success('Submitted successfully','Register details');
        this.router.navigate(['login']);
      },
      err => {
        console.log(err);
      }
    );
  }
  

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData= new User();
  }

}
