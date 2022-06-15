import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private cookieService:CookieService) { }

  ngOnInit(): void {
    this.changetabs(Number(this.cookieService.get('tab')));
  }

  i:number =0;
  tabs: boolean[] = [false,false,true,false,false]; 
  test:boolean=true;
  changetabs(n:number){
    for( this.i=0; this.i<this.tabs.length;this.i++){
      if(this.i==n-1){
        this.tabs[this.i]=true;
      }
      else{
        this.tabs[this.i]=false;
      }
    }
  }
  tabclick(n:number){
    //console.log('tab '+n);
    this.cookieService.set('tab', n.toString());
    this.changetabs(n);
  }

}
