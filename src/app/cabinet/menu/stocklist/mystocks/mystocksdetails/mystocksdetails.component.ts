import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mystocksdetails',
  templateUrl: './mystocksdetails.component.html',
  styleUrls: ['./mystocksdetails.component.css']
})
export class MystocksdetailsComponent implements OnInit {

  constructor(public service:SharedService, private cookieService:CookieService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.IdStocks = this.cookieService.get('StockId'); 
    this.IdUser = this.cookieService.get('UserId');
    this.refresh();
    
  }

  userSold:any = {
    Id:0,
    IdStocks:0,
    IdUser:0,
    Amount:0,
    Fee:0,
    SellingDate: '',
    Value:0
  };
  Amount:number=0;
  Fee:number=0;
  Id:number=0;
  IdStocks:any;
  IdUser:any; 

  ActiveAddEditStockComp:boolean=false;

  maxsold:any = 100;

  addClick(){
    this.ActiveAddEditStockComp=true;
  }
  closeclick(){
    this.ActiveAddEditStockComp=false;
  }
  addUserSold(){
    if(this.Amount > this.maxsold){
      this.toastr.error("Can't sell more than "+this.maxsold+ " stocks. Please try again",'Error' );
    }
    else{
      var val= {
        Id:this.Id,
        IdStocks: this.IdStocks,
        IdUser: this.IdUser,
        Amount:this.Amount,
        Fee:this.Fee,
      };
      this.service.addUserSold(val).subscribe(res=>{
        this.toastr.info(res.toString(),'Result' )
      });
      this.refresh();
    }
  }

  refresh(){
    this.getHistory();
    this.getTotalBought();
    this.service.getLastValue(this.IdStocks);
    this.calculateProfit();
  }
  potentialProfit:any =0;
  MarketValue:any;
  stock:any;
  calculateProfit(){
    this.potentialProfit = this.maxsold* this.service.marketvalue;
  }
  HistoryTemp:any = [];
  HistoryList:any=[];

  getHistory(){
      this.service.getHistory(this.IdStocks, this.IdUser).subscribe(data=> {
      this.HistoryTemp =data;
      for (let i = 0; i < this.HistoryTemp.length; i++){
        var val= {
          Amount:this.HistoryTemp[i].Amount,
          Value: this.HistoryTemp[i].Value,
          Date: this.HistoryTemp[i].Date,
          Event:this.HistoryTemp[i].Event
        };
        this.HistoryList.push(val)
      }
      
    })
  }
  TotalBoughtTemp:any = [];
  TotalBoughtList:any=[];
  earnings:any;
  getTotalBought(){
    this.service.getTotalBought(this.IdStocks, this.IdUser).subscribe(data=> {
        this.TotalBoughtTemp =data;
        for (let i = 0; i < this.TotalBoughtTemp.length; i++){
          if(this.TotalBoughtTemp[i].Amount == null) {
            this.TotalBoughtTemp[i].Amount =0;
            this.TotalBoughtTemp[i].Value =0;
          }
          var val= {
            Res:this.TotalBoughtTemp[i].Res,
            Amount:this.TotalBoughtTemp[i].Amount,
            Value: this.TotalBoughtTemp[i].Value,
          };
          this.TotalBoughtList.push(val)
        }  
        this.maxsold = this.TotalBoughtList[0].Amount - this.TotalBoughtList[1].Amount;  
        this.earnings = this.TotalBoughtList[1].Value - this.TotalBoughtList[0].Value

    })

  }
  

}
