import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { CookieService } from 'ngx-cookie-service';
import { RouteConfigLoadEnd } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  constructor(private service:SharedService, private router: Router,
    private cookieService: CookieService) { }

  StocksList:any=[];

  ModalTitle:string = "";
  ActiveAddEditStockComp:boolean=false;
  stock:any;

  StockNameFilter:string="";
  StockListWithoutFilter:any=[];

  StockChangesVisible:boolean=false;
  StocksChangeList:any=[];

  ngOnInit(): void {
    this.refreshStocksList();
  }

  addClick(){
    this.stock={
      Id:0,
      Name:"",
      CompanyName:""
    }
    this.ModalTitle="Add stock";
    this.ActiveAddEditStockComp=true;
  }

  editClick(item:any){
    this.stock=item;
    this.ModalTitle="Edit stock";
    this.ActiveAddEditStockComp=true;

  }

  deleteClick(item:any){
    if(confirm('Are you sure?' )){
      this.service.deleteStock(item).subscribe(data=>{
        alert(data.toString());
        this.refreshStocksList();
      })
    }
  }

  closeclick(){
    this.ActiveAddEditStockComp=false;
    this.refreshStocksList();
  }

  refreshStocksList(){
    this.service.getStocksList().subscribe(data=>{
      this.StocksList=data;
      this.StockListWithoutFilter=data;
    })
  }

  FilterFn(){
    var StockNameFilter = this.StockNameFilter;

    this.StocksList = this.StockListWithoutFilter.filter(function(el:any){
      return el.Name.toString().toLowerCase().includes(
        StockNameFilter.toString().trim().toLowerCase()
      )
    });
  }

  sortResult(prop:any,asc:boolean){
    this.StocksList = this.StockListWithoutFilter.sort(function(a:any,b:any){
      if(asc){
        return (a[prop]>b[prop])?1 :((a[prop]<b[prop] ) ?-1 :0);
      }
      else {
        return (b[prop]>a[prop])?1 :((b[prop]<a[prop] ) ?-1 :0)
      }
    })
  }

  onChanges(StockId:any){
    //this.router.navigate(['StockChange']);
      this.cookieService.set('StockId', StockId);
      this.router.navigate(['StockChange']);

      
  }
  

}
