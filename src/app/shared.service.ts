import { Injectable } from '@angular/core';
import { User } from './shared/user.module';
import {HttpClient} from "@angular/common/http";

import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http:HttpClient, private cookieService:CookieService) { }

  readonly ApiUrl="https://localhost:44327/api";

  updateUserinfo(val:any){
    return this.http.put(this.ApiUrl+'/User/'+val.Id,val);
  }
  getStocksList():Observable<any[]>{
    return this.http.get<any>(this.ApiUrl+'/Stocks');
  }

  addStock(val:any){
    return this.http.post(this.ApiUrl+'/Stocks',val);
  }
  updateStock(val:any){
    return this.http.put(this.ApiUrl+'/Stocks/'+val.Id,val);
  }
  deleteStock(val:any, ){
    return this.http.delete(this.ApiUrl+'/Stocks/'+val.Id);
  }
  getStock(id:string){
    return this.http.get(this.ApiUrl+'/Stocks/stock/'+id);
  }
  getMyStocks(IdUser:any){
    return this.http.get(this.ApiUrl+'/Stocks/user/'+IdUser)
  }
  getSimilar(stock:any){
    return this.http.put(this.ApiUrl+'/Stocks/Similar',stock);
  }
  getSimilarId(Id:any){
    return this.http.get(this.ApiUrl+'/Stocks/Similar/'+Id);
  }


  //UserStock
  getUserStockId(val:any){
    return this.http.get<any>(this.ApiUrl+'/UserStocks/'+val);
  }
  addUserStock(val:any){
    return this.http.post(this.ApiUrl+'/UserStocks',val);
  }
  updateUserStock(val:any){
    return this.http.put(this.ApiUrl+'/UserStocks/'+val.Id,val);
  }
  deleteUserStock(val:any, ){
    return this.http.delete(this.ApiUrl+'/UserStocks/'+val.Id);
  }
  //User sold stocks
  addUserSold(val:any){
    return this.http.post(this.ApiUrl+'/UserSold',val);
  }
  //StockChange
  getStocksChangeOne(val:any){
    return this.http.get<any>(this.ApiUrl+'/StocksChange/'+val);
  }
  getStocksChangeStock(val:any){
    return this.http.get<any>(this.ApiUrl+'/StocksChange/stock/'+val);
  }
  addStocksChange(val:any){
    return this.http.post(this.ApiUrl+'/StocksChange',val);
  }
  updateStocksChange(val:any){
    return this.http.put(this.ApiUrl+'/StocksChange/'+val.Id,val);
  }
  deleteStocksChange(val:any, ){
    return this.http.delete(this.ApiUrl+'/StocksChange/'+val.Id);
  }
  //notifications
  getNotificationList(val:any){
    return this.http.get(this.ApiUrl+'/Notifications/user/'+val);
  }
  deleteNotification(val:any){
    return this.http.delete(this.ApiUrl+'/Notifications/'+val);
  }
  seenNotifications(val:any){
    return this.http.put(this.ApiUrl+'/Notifications/seen/'+val.Id,val);
  }
  countNewNotifications(val:any){
    return this.http.get(this.ApiUrl+'/Notifications/count/'+val);
  }
  //functions
  getDateToday(){
    return this.http.get(this.ApiUrl+'/Functions/date')
  }
  getStockLastValue(val:any){
    return this.http.get(this.ApiUrl+'/Functions/StockValue/'+val)
  }
  getTypesStock(){
    return this.http.get(this.ApiUrl+'/Functions/TypesStock');
  }
  getHistory(IdStocks:any,IdUser:any){
    return this.http.get(this.ApiUrl+'/Functions/History/'+IdUser +'/'+IdStocks)
  }
  getTotalBought(IdStocks:any,IdUser:any){
    return this.http.get(this.ApiUrl+'/Functions/TotalBought/'+IdUser +'/'+IdStocks)
  }
  getMin(val:any){
    return this.http.get(this.ApiUrl+'/Functions/StockMin/'+val)
  }
  getMax(val:any){
    return this.http.get(this.ApiUrl+'/Functions/StockMax/'+val)
  }
  getAvg(val:any){
    return this.http.get(this.ApiUrl+'/Functions/StockAvg/'+val)
  }
  getNetSales(val:any){
    return this.http.get(this.ApiUrl+'/Functions/NetSales/'+val)
  }
  getPopularityList(){
    return this.http.get(this.ApiUrl+'/Functions/PopularityList')
  }
  getBalance(UserId:any){
    return this.http.get(this.ApiUrl+'/Functions/Balance/'+UserId)
  }
  getBalanceDay(UserId:any){
    return this.http.get(this.ApiUrl+'/Functions/BalanceByDay/'+UserId)
  }
  getRecomendations(UserId:any){
    return this.http.get(this.ApiUrl+'/Functions/Recomendations/'+UserId)
  }
  getValueAndAmount(UserId:any){
    return this.http.get(this.ApiUrl+'/Functions/ValueAndAmountList/'+UserId)
  }
  getPortfolioRisk(UserId:any){
    return this.http.get(this.ApiUrl+'/Functions/PortfolioRisk/'+UserId)
  }
  getEventList(){
    return this.http.get(this.ApiUrl+'/Functions/Events')
  }
  //Backup and restore in admin cabinet
  createBackup(){
    return this.http.get(this.ApiUrl+'/Backup');
  }
  //Analisys
  ResultAnalisys(Event:any){
    var tag = {
      Id:0,
      IdStocks:0,
      Tag: '',
      Type: Event
    }
    return this.http.put(this.ApiUrl+'/Analysis/Result', tag);
  }
  DataAnalisys(Event:any){
    var tag = {
      Id:0,
      IdStocks:0,
      Tag: '',
      Type: Event
    }
    return this.http.put(this.ApiUrl+'/Analysis/Data', tag);
  }
  

  //backupList: string [];
  backupList:any =[];

  backupListGet(){
    this.http.get(this.ApiUrl+'/Backup/list')
    .toPromise()
    .then(res => this.backupList = res as string[]);
    console.log(this.backupList);
  }
  restore(st:string){
    return this.http.get(this.ApiUrl+'/Backup/restore/'+st);
  }

  //tags
  getTagsStock(val:any){
    return this.http.get(this.ApiUrl+'/Tags/stock/'+val);
  }
  deleteTag(val:any){
    return this.http.delete(this.ApiUrl+'/Tags/'+val);
  }
  addTag(val:any){
    return this.http.post(this.ApiUrl+'/Tags',val);
  }
  //stock characteristics
  Stock:any ={
    Risk:'no data',
    Profitability:'no data'
  };
  StockInfoStats(id:any){
    this.getStock(id).subscribe(data=>{
      this.Stock=data;
      //count risk
      var count = (this.Stock.NetIncome - this.Stock.WeightedAverage)/this.marketvalue;
      this.Stock.Risk = Math.round(count * 100) / 100;
     //count profitability
     var temp = (this.Stock.NetIncome / this.netSales)* 100
     this.Stock.Profitability =  Math.round(temp * 100) / 100;
     //volatality (anual and daily)
     temp = Math.sqrt(252) * this.std;
     this.Stock.volatalityAnual = Math.round(temp * 100) / 100;
     temp = this.std;
     this.Stock.volatalityDaily = Math.round(temp * 100) / 100;
    })
    return this.Stock;
  }
  

  LastValue:any;
  marketvalue:any;
  Marketvalue:any = "no data yet";
  risk:any =0;
  std:any;
  getLastValue(id:number){
    this.getStockLastValue(id).subscribe(data=> {
      this.LastValue =data;
      if(this.LastValue.length == 0){
        this.marketvalue = "no data";
        this.std = 0;
      }
      else{
        this.marketvalue = this.LastValue[0].market_value;
        this.std = this.LastValue[0].standard_deviation;
      }
    })
  }
  min:any;
  dateMin:any = "no data";
  getMinValue(id:number){
    this.getMin(id).subscribe(data=> {
      this.LastValue =data;
      if(this.LastValue.length == 0){
        this.min= "no data";
      }
      else{
        this.min = this.LastValue[0].market_value;
        this.dateMin = this.LastValue[0].date.slice(0,-9);
      }
    })
  }
  max:any;
  dateMax:any ="no data";
  getMaxValue(id:number){
    this.getMax(id).subscribe(data=> {
      this.LastValue =data;
      if(this.LastValue.length == 0){
        this.max= "no data";
      }
      else{
        this.max = this.LastValue[0].market_value;
        this.dateMax = this.LastValue[0].date.slice(0,-9);
      }
    })
  }
  List:any = [];
  popularity:any ="no data";
  usersInSystem:any =0;
  getPopularity(id:number){
    this.getPopularityList().subscribe(data=> {
      this.List =data;
      this.popularity =" no data ";
      this.usersInSystem =0;
      for(var i = 0; i < this.List.length; i++){
        if(this.List[i].Id_stocks == id){
          this.usersInSystem = this.List[i].UsersCount;
          this.popularity = i+1;
        }
      }
    })
  }
  avg:any;
  changePercent:any;
  getChangePercentValue(id:number){
    this.getAvg(id).subscribe(data=> {
      this.LastValue = data;
      if(this.LastValue[0].average == null){
        this.avg= "no data";
        this.changePercent= "no data";
      }
      else{
        this.avg = this.LastValue[0].average;
        this.changePercent =  Math.round(((this.marketvalue - this.avg)/this.avg )*100);
      }

    })
  }
  //profitability
  netSales:any;
  getNetSalesValue(id:number){
    this.getNetSales(id).subscribe(data=> {
      this.LastValue = data;
      if(this.LastValue[0].Column1 == null){
        this.netSales= "no data";
      }
      else{
        this.netSales = this.LastValue[0].Column1;
      }
      //console.log('net sales'+ this.netSales)
    })
  }

  RiskList:any = [];


}
