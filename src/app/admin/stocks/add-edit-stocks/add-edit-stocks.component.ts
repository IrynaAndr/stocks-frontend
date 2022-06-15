import { Component, OnInit,Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-stocks',
  templateUrl: './add-edit-stocks.component.html',
  styleUrls: ['./add-edit-stocks.component.css']
})
export class AddEditStocksComponent implements OnInit {

  constructor(private service:SharedService) { }

  
  //stock:any;
  @Input() stock:any;
  Id:number =0;
  Name:string ="";
  CompanyName:string="";
  Symbol:string="";
  MarketScope:string="";
  MarketScope2:string="";
  Type:string="";
  Type2:string="";
  Info:string="";
  NetIncome:number =0;
  WeightedAverage:number =0;


  ngOnInit(): void {
    this.Id= this.stock.Id;
    this.Name = this.stock.Name;
    this.CompanyName=this.stock.CompanyName;
    this.Symbol = this.stock.Symbol;
    this.MarketScope = this.stock.MarketScope;
    this.Type = this.stock.Type;
    this.Info = this.stock.Info;
    this.NetIncome = this.stock.NetIncome;
    this.WeightedAverage =this.stock.WeightedAverage;
  }

  addStock(){
    this.addStock2();
  }
  updateStock(){
    this.updateStock2();
  }
  addStock2(){
    var val= {
      Id:this.Id,
      Name:this.Name,
      CompanyName:this.CompanyName,
      Symbol:this.Symbol,
      MarketScope:this.MarketScope2,
      Type:this.Type2,
      Info:this.Info,
      NetIncome:this.NetIncome,
      WeightedAverage:this.WeightedAverage
    };
    this.service.addStock(val).subscribe(res=>{alert(res.toString())});
  }
  updateStock2(){
    
    var val= {
      Id:this.Id,
      Name:this.Name,
      CompanyName:this.CompanyName,
      Symbol:this.Symbol,
      MarketScope:this.MarketScope2,
      Type:this.Type2,
      Info:this.Info,
      NetIncome:this.NetIncome,
      WeightedAverage:this.WeightedAverage
    };
    this.service.updateStock(val).subscribe(res=>{alert(res.toString())});
  }


}
