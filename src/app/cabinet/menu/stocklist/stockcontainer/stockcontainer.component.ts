import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-stockcontainer',
  templateUrl: './stockcontainer.component.html',
  styles: [
  ]
})
export class StockcontainerComponent implements OnInit {

  constructor(private cookieService:CookieService) { }

  ngOnInit(): void {
    this.changetabs(Number(this.cookieService.get('subtab')));
  }

  i:number =0;
  tabs: boolean[] = [true,false,false]; 
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
  tab:number=1;

  onClick(n:number){
    this.tab=n;

    this.cookieService.set('subtab', n.toString());
    this.changetabs(n);
  }

}
