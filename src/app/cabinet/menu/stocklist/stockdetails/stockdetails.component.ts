import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { CookieService } from 'ngx-cookie-service';
import {Location} from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, ChartConfiguration, LineController, Chart, CategoryScale
  } from 'chart.js';
  

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    LineController, 
    );


@Component({
  selector: 'app-stockdetails',
  templateUrl: './stockdetails.component.html',
  styleUrls: ['./stockdetails.component.css']
})
export class StockdetailsComponent implements OnInit {

  constructor(private router:Router,public service:SharedService,
     private cookieService:CookieService, private _location: Location, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.IdStock=this.cookieService.get('StockId');  
    this.getStockInfo(); 
    this.getDate();
    this.getTagsList();
    this.getStats();
    this.getStockChange()

  }

  IdStock:any;
  stock:any = {
    Id:0,
    Name:'',
    CompanyName:'',
    Symbol:'',
    MarketScope:'',
    Type:'',
    Info:''
  };

  userStock:any;
  ActiveAddEditStockComp:boolean=false;
  Amount:number=0;
  Fee:number=0;
  PurchaseDate:any='2022-01-01'; 
  Id:number=0;
  
  getDate(){
    this.service.getDateToday().subscribe(data=>{this.PurchaseDate=data; });
    
  }
  getBack(){
    //this.router.navigate(['StockContainer']);
    this._location.back();
  }
  getStockInfo(){
    this.service.getStock(this.IdStock).subscribe(data=>{this.stock=data;
      this.getSimilarList();
    });
  }
  addClick(){
    this.ActiveAddEditStockComp=true;
  }
  closeclick(){
    this.ActiveAddEditStockComp=false;
  }
  addUserStock(){
    var val= {
      Id:this.Id,
      IdStocks:this.IdStock,
      IdUser:this.cookieService.get('UserId'),
      Amount:this.Amount,
      Fee:this.Fee,
      PurchaseDate:this.PurchaseDate
    };
    this.service.addUserStock(val).subscribe(res=>{
      this.toastr.info(res.toString(),'Result' )
    });
  }
  getStats(){
    this.service.getLastValue(this.IdStock);
    this.service.getNetSalesValue(this.IdStock);
    this.service.StockInfoStats(this.IdStock);
    this.service.getMinValue(this.IdStock);
     this.service.getMaxValue(this.IdStock);
    this.service.getPopularity(this.IdStock);
    this.service.getChangePercentValue(this.IdStock);

  }
  
  test:any = 'test default text'
  tagsList:any=[];
  getTagsList(){
    this.service.getTagsStock(this.IdStock).subscribe(data=>{
      this.tagsList=data; 

    })
  }
  Similar:any = []
  getSimilarList(){
    this.service.getSimilar(this.stock).subscribe(data=>{
      this.Similar = data;
    })
  }
  openInfo(Id:any){
    this.cookieService.set('StockId', Id);
      this.router.navigate(['StockDetails']);
      window.location.reload();
  }


  changedata:any =[];
  alldates:any =[];
  allMV:any=[];
  getStockChange(){
    this.service.getStocksChangeStock(this.IdStock).subscribe(res=>{
      this.changedata = res;
      //console.log(this.changedata)
      for(let i =0; i<this.changedata.length; i++){
        this.allMV.push(this.changedata[i].MarketValue)
        let jsdate = new Date(this.changedata[i].Date);
        this.alldates.push(jsdate.toLocaleDateString('en', {year: 'numeric', month : 'numeric', day: 'numeric'}))
      }
      //console.log(this.alldates)
      //console.log(this.allMV)
      this.chart = new Chart('canvas',{
        type:'line',
        data: {
          labels: this.alldates,
          datasets: [
            {
              label: 'price',
              data: this.allMV,
              borderColor:  '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          scales:{
            xAxes: {
              display:true
            },
            yAxes:{
              display:true
            }
          }
        }
      })
      //console.log(this.chart)
    })
  }
  chart:any = [];

}
