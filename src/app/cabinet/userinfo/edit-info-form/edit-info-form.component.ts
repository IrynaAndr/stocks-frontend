import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginregisterService } from 'src/app/loginregister.service';



@Component({
  selector: 'app-edit-info-form',
  templateUrl: './edit-info-form.component.html',
  styleUrls: ['./edit-info-form.component.css']
})
export class EditInfoFormComponent implements OnInit {

  constructor(private service:SharedService, private cookieService:CookieService, private service2: LoginregisterService) { 
   
  }

  @Input() user:any;
  Id:number =0;
  Name:string ="";
  Login:string="";
  Password:string="";
  Email:string="";
  Type:number=1;
  


  ngOnInit(): void {
    //console.log(' user from last form')
    //console.log(this.user);
    this.Id= this.user.Id;
    this.Name = this.user.Name;
    this.Email = this.user.Email;
    this.Login =this.user.Login;
    this.Password =this.user.Password;
    this.Type = this.user.Type;
    
  }

  UserInfo:any ;
  getUserInfo(){
    this.service2.getUserInfo(this.cookieService.get('UserId')).subscribe(data=>{
      this.UserInfo=data;})
  }
  updateUserInfo(){
    
    /* */
    var val= {
      Id:this.user.Id,
      Login:this.Login,
      Password:this.user.Password,
      Name:this.Name,
      Email:this.Email,
      Type:this.user.Type
      
    };
    
    this.service.updateUserinfo(val).subscribe(res=>{alert("information was successfully changed")});
    /* 
    */
    
  }
  

}
