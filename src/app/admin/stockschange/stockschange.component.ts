import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { CookieService } from 'ngx-cookie-service';
import { RouteConfigLoadEnd } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stockschange',
  templateUrl: './stockschange.component.html',
  styleUrls: ['./stockschange.component.css']
})
export class StockschangeComponent implements OnInit {

  constructor(private service:SharedService, private router: Router,
    private cookieService: CookieService) { }

  ModalTitle:any='';
  ActiveAddEditStockComp:boolean=false;
  stockChange:any;
  
  StockChangesVisible:boolean=false;
  StocksChangeList:any=[];
  StockId:any;

  Stock:any;

  ngOnInit(): void {
    this.StockId= this.cookieService.get('StockId');  
    console.log(this.StockId);
    this.getStockInfo();
    this.getList();
    this.getTagsList();
  }

  getStockInfo(){
    this.service.getStock(this.StockId).subscribe(data=>{this.Stock=data; })
    //this.service.getStock(this.StockId).subscribe(res =>{console.log(res);});
  }
  getBack(){
    //this.cookieService.delete('StockId');
    this.router.navigate(['admin']);
  }
  getList(){  
    this.service.getStocksChangeStock(this.StockId).subscribe(data=>{
      this.StocksChangeList=data;
      
    })
    console.log(this.StocksChangeList);
  }
  addClick(){
    this.stockChange={
      Id:0,
      IdStocks:this.StockId,
      Weight:1.0,
      MarketValue:0,
      StandardDeviation:0
    }
    this.ModalTitle="Add stock change";
    this.ActiveAddEditStockComp=true;
  }

  editClick(item:any){
    this.stockChange=item;
    this.ModalTitle="Edit stock change";
    this.ActiveAddEditStockComp=true;

  }

  deleteClick(item:any){
    if(confirm('Are you sure?' )){
      this.service.deleteStocksChange(item).subscribe(data=>{
        this.getList();
      })
    }
  }

  closeclick(){
    this.ActiveAddEditStockComp=false;
    this.getList();
    this.getTagsList();
  }

  tagsList:any=[];
  getTagsList(){
    this.service.getTagsStock(this.StockId).subscribe(data=>{
      this.tagsList=data; 
    })
  }
  deleteClickTag(item:any){
    if(confirm('Are you sure?' )){
      this.service.deleteTag(item).subscribe(data=>{
        this.getTagsList();})
    }
  }
  addClickTag(){
    this.ModalTitle="Add tag to stock";
    this.ActiveAddEditStockComp=false;
  }
}
