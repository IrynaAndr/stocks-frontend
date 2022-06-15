import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Packer } from 'docx';
import { saveAs } from 'file-saver';



import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, ChartConfiguration, LineController, Chart, CategoryScale,
   BarController, BarElement, BorderRadius, BarControllerChartOptions, BarProps, BarOptions,
   PieController, PieControllerChartOptions, PieDataPoint, PieAnimationOptions, PieControllerDatasetOptions,
   ArcElement, ArcBorderRadius, ArcOptions, ArcProps
  } from 'chart.js';
  import * as Crt from 'chart.js'
  

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarController, BarElement,  
    PieController, ArcElement, 
    Title,
    Tooltip,
    Legend,
    
    LineController, 
    );

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  constructor(private service:SharedService, private cookieService:CookieService, private router:Router) { }

  ngOnInit(): void {
    this.UserId= this.cookieService.get('UserId'); 
    this.getMyStocksList();
    this.getBalanceGraph();
    //this.GetBalancedaily();
    this.getAmountAndValue();
    //this.calcRisk();
    this.Risk();
  }

  UserId:any;
  myStockstemp:any=[];
  myStocks:any=[];

  LastValue:any =[];
  Value:any =[];
  marketvalue:any;
  avg:any;
  changePercent:any;
  getMyStocksList(){
    this.service.getMyStocks(this.UserId).subscribe(data=>{
      this.myStockstemp=data;
      for (let i = 0; i < this.myStockstemp.length; i++){
        this.myStocks.push(this.myStockstemp[i]);
      }
      
    })
  }

  /*risk(i:number){
    //calc risk portfolio
        //this.service.getLastValue(this.myStockstemp[i].Id);
        this.service.getStockLastValue(this.myStockstemp[i].Id).subscribe(data=> {
          this.LastValue =data;
          this.marketvalue = this.LastValue[0].market_value;
          //
          this.service.getAvg(this.myStockstemp[i].Id).subscribe(data=> {
            this.Value = data;
            this.avg = this.Value[0].average;
            this.changePercent =  Math.round(((this.marketvalue - this.avg)/this.avg )*100);
            console.log(this.changePercent)
          })
          
        })

  }
  */

  openInfo(Id:any){
    this.cookieService.set('StockId', Id);
      this.router.navigate(['MyStocksDetails']);
  }
  chartAmount:any= [];
  chartValue:any= [];
  stockNamearr:any=[];
  stockValuearr:any =[];
  stockAmountarr:any=[];

  sumrisk:any ;
  FinalRisk:any = 0;
  sumamount:any;
  stock:any;
  Stock:any =[];

  Risk(){
    this.service.getPortfolioRisk(this.UserId).subscribe(data=>{
      this.data = data;
      var count =0;
      for(var i = 0; i<this.data.length; i++){
        var temp = this.data[i].risk;
        count++;
        this.FinalRisk += temp;
      }
      this.FinalRisk = Math.round((this.FinalRisk/count) * 100) / 100;
    })
  }
  calcRisk(){
    //console.log(this.service.RiskList)
    //console.log(this.AmountList)

    //console.log(this.service.RiskList.length) // shows 0 (
    for( var i = 0; i <this.AmountList.length; i++){
      console.log(this.AmountList[0].Amount +"test")
      this.sumamount += this.AmountList[i].Amount;
      for (var y = 0; y< this.service.RiskList.length; y++){
        if(this.AmountList[i].Id = this.service.RiskList[y].Id){
          this.sumrisk+=this.AmountList[i].Amount* this.service.RiskList[y].Risk;
          break;
        }
      }
    }
    this.FinalRisk= this.sumrisk/this.sumamount;
    //console.log(this.FinalRisk)
  }

  AmountList:any = [];

  getAmountAndValue(){
    this.service.getValueAndAmount(this.UserId).subscribe(data=>{
      this.data = data;
      for(let i =0; i<this.data.length; i++){
        this.stockNamearr.push(this.data[i].Name)
        this.stockAmountarr.push(this.data[i].Amount);
        this.stockValuearr.push(this.data[i].Value);

        var amount = {
          Id : this.data[i].Id_stock,
          Amount: this.data[i].Amount
        }
        this.AmountList.push(amount);
        
      }
      
      //chart Amount
      this.chartAmount = new Chart('barChart',{
        type:'bar',
        data: {
          labels: this.stockNamearr,
          datasets: [
            {
              label: 'All time profit from different stocks',
              data: this.stockValuearr,
              borderColor:  [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 205, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(201, 203, 207,1 )'
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderWidth: 1
            },
            
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
      //end of chart amount
      
      //chart value - number of stocks
      this.chartValue = new Chart('pieChart',{
        type:'pie',
        data: {
          labels: this.stockNamearr,
          datasets: [
            {
              label: 'Number of stocks',
              data: this.stockAmountarr,
              backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 205, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(201, 203, 207,1 )'
              ],
            },
            
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
      //end of chart value


    })
  }

  Daily:boolean =  false;
  balnceTransactions(){
    this.Daily= true;
  }
  balnceDaily(){
    this.Daily= false;
  }
  data:any =[];
  alldates:any =[];
  allBalance:any=[];
  allzeros:any =[];
  alldates2:any =[];
  allBalance2:any=[];
  allzeros2:any =[];
  getBalanceGraph(){
    this.service.getBalance(this.UserId).subscribe(res=>{
      this.data = res;
      for(let i =0; i<this.data.length; i++){
        this.allBalance.push(this.data[i].CurrentBalance)
        this.allzeros.push(0)
        let jsdate = new Date(this.data[i].Date);
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
              label: 'balance',
              data: this.allBalance,
              borderColor:  '#005aff',
              fill: false
            },
            {
              label: 'midline',
              data: this.allzeros,
              borderColor:  '#afafaf',
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
  chart2:any= [];
  GetBalancedaily(){
    this.service.getBalanceDay(this.UserId).subscribe(res=>{
      this.data = res;
      for(let i =0; i<this.data.length; i++){
        this.allBalance2.push(this.data[i].balance)
        this.allzeros2.push(0)
        let jsdate = new Date(this.data[i].date);
        this.alldates2.push(jsdate.toLocaleDateString('en', {year: 'numeric', month : 'numeric', day: 'numeric'}))
      }
      this.chart2 = new Chart('canvas2',{
        type:'line',
        data: {
          labels: this.alldates2,
          datasets: [
            {
              label: 'balance',
              data: this.allBalance2,
              borderColor:  '#005aff',
              fill: false
            },
            {
              label: 'midline',
              data: this.allzeros2,
              borderColor:  '#afafaf',
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
    })
  }


  TotalBoughtTemp:any = [];
  TotalBoughtList:any=[];

  getTotalBought(IdStocks:number, IdUser:number){
    this.service.getTotalBought(IdStocks, IdUser).subscribe(data=> {
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
        //amount user have - TotalBoughtList[0].Amount - TotalBoughtList[1].Amount
        //earnings - TotalBoughtList[1].Value - TotalBoughtList[0].Value 
        //this.maxsold = this.TotalBoughtList[0].Amount - this.TotalBoughtList[1].Amount;  

    })

  }

}
