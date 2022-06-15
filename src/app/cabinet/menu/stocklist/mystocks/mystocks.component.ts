import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mystocks',
  templateUrl: './mystocks.component.html',
  styleUrls: ['./mystocks.component.css']
})
export class MystocksComponent implements OnInit {

  constructor(private service:SharedService, private cookieService:CookieService, private router:Router) { }

  ngOnInit(): void {
    this.UserId= this.cookieService.get('UserId'); 
    this.getMyStocksList();
  }

  UserId:any;
  myStockstemp:any=[];
  myStocks:any=[];

  getMyStocksList(){
    this.service.getMyStocks(this.UserId).subscribe(data=>{
      this.myStockstemp=data;
      //console.log(this.myStockstemp) ;
      for (let i = 0; i < this.myStockstemp.length; i++){
        this.myStocks.push(this.myStockstemp[i]);
      }
      //console.log(this.myStocks[0]);
    })
  }

  openInfo(Id:any){
    this.cookieService.set('StockId', Id);
    //change that to Mystockdatails which have stockdetails inside
      this.router.navigate(['MyStocksDetails']);
  }
}
