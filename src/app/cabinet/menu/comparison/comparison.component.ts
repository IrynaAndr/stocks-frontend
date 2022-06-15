import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {

  constructor(public service:SharedService, private cookieService:CookieService) { }

  ngOnInit(): void {
    this.refreshStocksList();
  }

  calc:boolean = false;


  StocksList1:any=[];
  StocksList2:any=[];
  Stock1:any;
  Stock2:any;
  StockListWithoutFilter:any=[];


  refreshStocksList(){
    this.service.getStocksList().subscribe(data=>{
      this.StocksList1=data;
      this.StocksList2=data;
      this.StockListWithoutFilter=data; 
    })
  }

  getStats(Id:any){
    this.service.getLastValue(Id);
    this.service.getNetSalesValue(Id);
    this.service.StockInfoStats(Id);
    this.service.getMinValue(Id);
     this.service.getMaxValue(Id);
    this.service.getPopularity(Id);
    this.service.getChangePercentValue(Id);
  }
  Id1:any;
  Name1:any="Name of first stock";
  CompanyName1:any = "CName of first stock";
  NetIncome1:any =0;
  pop1:any;
  changePercent1:any;
  current1:any;
  min1:any;
  max1:any;
  prof1:any;
  volat1:any;
  

  Id2:any;
  Name2:any="Name ";
  CompanyName2:any = "CName of second stock";
  NetIncome2:any =0;
  pop2:any;
  changePercent2:any;
  current2:any;
  min2:any;
  max2:any;
  prof2:any;
  volat2:any;
  
  Pick1(){
    this.getStats(this.Stock1);

    this.Name1 = this.service.Stock.Name;
    this.CompanyName1 = this.service.Stock.CompanyName;
    this.NetIncome1 = this.service.Stock.NetIncome;
    this.Id1 = this.service.Stock.Id;
    this.pop1 = this.service.popularity;
    this.changePercent1= this.service.changePercent;
    this.current1 = this.service.marketvalue;
    this.min1= this.service.min;
    this.max1= this.service.max;
    this.prof1 = this.service.Stock.Profitability;
    this.volat1 = this.service.Stock.volatalityDaily;
  }
  Pick2(){
    this.getStats(this.Stock2);

    this.Name2 = this.service.Stock.Name;
    this.CompanyName2 = this.service.Stock.CompanyName;
    this.NetIncome2 = this.service.Stock.NetIncome;
    this.Id2 = this.service.Stock.Id;
    this.pop2 = this.service.popularity;
    this.changePercent2= this.service.changePercent;
    this.current2 = this.service.marketvalue;
    this.min2= this.service.min;
    this.max2= this.service.max;
    this.prof2 = this.service.Stock.Profitability;
    this.volat2 = this.service.Stock.volatalityDaily;
  }
  Compare(){
    this.calc = true;
    this.Pick1();
    
  }
  Compare2(){
    this.calc = true;
    this.Pick2();
  }
}
