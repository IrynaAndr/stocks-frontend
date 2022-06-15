import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stocklist',
  templateUrl: './stocklist.component.html',
  styleUrls: ['./stocklist.component.css']
})
export class StocklistComponent implements OnInit {

  constructor(private service:SharedService, private cookieService:CookieService,private router: Router) { }

  ngOnInit(): void {
    this.refreshStocksList();
    this.getTypesList();
  }

  StocksList:any=[];

  ModalTitle:string = "";
  ActiveAddEditStockComp:boolean=false;
  stock:any;

  StockNameFilter:string="";
  StockMarketScopeFilter:string="";
  StockListWithoutFilter:any=[];

  
  deleteClick(item:any){
    if(confirm('Are you sure?' )){
      this.service.deleteStock(item).subscribe(data=>{
        alert(data.toString());
        this.refreshStocksList();
      })
    }
  }

  openInfo(Id:any){
    this.cookieService.set('StockId', Id);
      this.router.navigate(['StockDetails']);
  }

  closeclick(){
    this.ActiveAddEditStockComp=false;
    this.refreshStocksList();
  }

  refreshStocksList(){
    this.service.getStocksList().subscribe(data=>{
      this.StocksList=data;
      this.StockListWithoutFilter=data; 
 
      //asign value
      for (let i = 0; i < this.StocksList.length; i++){
        this.getLastValueList(this.StocksList[i].Id, i);
      }
      
    })
    
  }


  LastValue:any  =[];
  
  
  Marketvalue:any = "no data yet";
  getLastValueList(StockId:any, i:number){
    this.service.getStockLastValue(StockId).subscribe(data=> {
      this.LastValue =data;
      //console.log( StockId +' length '+ this.LastValue.length);
      if(this.LastValue.length == 0){
        this.StocksList[i].MarketValue  = "no data";
      }
      else{
        this.StocksList[i].MarketValue = this.LastValue[0].market_value;
      }
      //calculate and get risk for every stock
      var count = (this.StocksList[i].NetIncome - this.StocksList[i].WeightedAverage)/this.StocksList[i].MarketValue;
      this.StocksList[i].Risk = Math.round(count * 100) / 100;
      //console.log( this.StocksList[i].Name + " risk is "+ this.StocksList[i].Risk)

      var risk = {
        Id : this.StocksList[i].Id,
        Risk: this.StocksList[i].Risk
      }
      this.service.RiskList.push(risk);
    })
  }

  
  FilterFn(){
    var StockNameFilter = this.StockNameFilter;
    var StockMarketScopeFilter = this.StockMarketScopeFilter;
    var StockTypeFilter = this.Type;

    this.StocksList = this.StockListWithoutFilter.filter(function(el:any){
      return el.Name.toString().toLowerCase().includes(
        StockNameFilter.toString().trim().toLowerCase()
      ) &&
      el.MarketScope.toString().toLowerCase().includes(
        StockMarketScopeFilter.toString().trim().toLowerCase()
      ) &&
      el.Type.toString().toLowerCase().includes(
        StockTypeFilter.toString().trim().toLowerCase())
    });
    
  }
  Type:string ="";
  typesListTemp:any = [];
  typesList:any=[];
  all:string ="all";

  getTypesList(){
    this.service.getTypesStock().subscribe(data=> {
      this.typesListTemp =data;
      for (let i = 0; i < this.typesListTemp.length; i++){
        this.typesList.push(this.typesListTemp[i].Type)
        //console.log(this.typesListTemp[i].Type)
      }
      //console.log(this.typesList)
    })
  }
  

  sortResult(prop:any,asc:boolean){
      this.StocksList = this.StocksList.sort(function(a:any,b:any){
      if(asc){
        return (a[prop]>b[prop])?1 :((a[prop]<b[prop] ) ?-1 :0);
      }
      else {
        return (b[prop]>a[prop])?1 :((b[prop]<a[prop] ) ?-1 :0)
      }
    })
  }

}
