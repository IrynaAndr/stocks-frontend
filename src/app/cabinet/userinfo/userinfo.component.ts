import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginregisterService } from 'src/app/loginregister.service';
import { SharedService } from 'src/app/shared.service';
import { User } from 'src/app/shared/user.module';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  constructor(public service:LoginregisterService, private cookieService:CookieService,
    private service2:SharedService) { }

  ngOnInit(): void {
    
    this.refreshPersonalInfo();
    this.CountNotif();
  }
  UserInfo:any = {
    Name:''
  };
  UserInfo2:any;
  UserInfoarr:any=[];
  testStr:string="test";


  refreshPersonalInfo(){
    if(this.cookieService.check('UserId')){
      
      this.cookieService.get('UserId')
  
      this.service.getUserInfo(this.cookieService.get('UserId')).subscribe(data=>{
        this.UserInfo=data;
        this.UserInfo2=data;
        //console.log(this.UserInfo);
      })
    }

   
  }
 
  user:any;
  EditInfo(item:any){
    this.user=item;
  }
  
  closeclick(){
    //this.ActiveAddEditStockComp=false;
    this.refreshPersonalInfo();
  }

  countNotif:any ='';
  CountNotif(){
    this.service2.countNewNotifications(this.cookieService.get('UserId')).subscribe( res=> {this.countNotif =res});
    
  }
}
