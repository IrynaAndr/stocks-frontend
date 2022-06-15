import { Component, OnInit,Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-stockschange',
  templateUrl: './edit-stockschange.component.html',
  styleUrls: ['./edit-stockschange.component.css']
})
export class EditStockschangeComponent implements OnInit {

  constructor(private service:SharedService,private cookieService: CookieService) { 
   
  }

  
  @Input() stockChange:any;
  Id:number =0;
  IdStocks:any = this.cookieService.get('StockId'); 
  Weight:number=0.0;
  MarketValue:number=0.0;
  StandardDeviation:number=0.0;
  Date:any='05-05-2022';

  today:boolean=false;
  myDate:any;


  ngOnInit(): void {
    this.Id= this.stockChange.Id;
    this.IdStocks =this.stockChange.IdStocks;
    this.Weight=this.stockChange.Weight;
    this.MarketValue=this.stockChange.MarketValue;
    this.StandardDeviation=this.stockChange.StandardDeviation;
    this.Date=this.stockChange.Date;

  }

  addStockChange(){
    this.addStock2Change();
  }
  updateStockChange(){
    this.updateStock2Change();
  }

  checkboxtoday(value:boolean){
      this.today=value;
  }
  iftoday(){
      
      if(this.today){
      this.myDate = new Date(); 
      this.Date=this.myDate;
    }
  }
  addStock2Change(){
    this.iftoday();
    var val= {
      Id:this.Id,
      IdStocks:this.IdStocks,
      Weight:this.Weight,
      MarketValue:this.MarketValue,
      StandardDeviation:this.StandardDeviation,
      Date:this.Date
    };
    this.service.addStocksChange(val).subscribe(res=>{alert(res.toString())});
  }
  updateStock2Change(){
    this.iftoday();
    var val= {
      Id:this.Id,
      IdStocks:this.IdStocks,
      Weight:this.Weight,
      MarketValue:this.MarketValue,
      StandardDeviation:this.StandardDeviation,
      Date:this.Date
    };
    this.service.updateStocksChange(val).subscribe(res=>{alert('updated');
    console.log(res.toString())});
    console.log(this.today +" bool");
  }

}
