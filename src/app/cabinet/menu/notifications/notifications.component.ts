import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private service:SharedService, private cookieService:CookieService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getNotificationList();
    //console.log(this.Notif);
  }

  Notif:any = [];
  getNotificationList(){
    this.service.getNotificationList(this.cookieService.get('UserId')).subscribe(data=>{
      this.Notif=data;
    })
  }
  Seen(notif:any){
    this.service.seenNotifications(notif).subscribe(res=>console.log(res));
    this.getNotificationList();
    window.location.reload();
  }
  Delete(Id:number){
    this.service.deleteNotification(Id).subscribe(res=>this.toastr.info('Notification','was deleted'));
    this.getNotificationList();
    window.location.reload();
  }

}
