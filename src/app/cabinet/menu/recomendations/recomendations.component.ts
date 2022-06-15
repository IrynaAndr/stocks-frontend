import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recomendations',
  templateUrl: './recomendations.component.html',
  styleUrls: ['./recomendations.component.css']
})
export class RecomendationsComponent implements OnInit {

  constructor(private service:SharedService, private cookieService:CookieService,private router: Router) { }

  ngOnInit(): void {
    this.UserId= this.cookieService.get('UserId'); 
    this.getMyStocksList();
    this.getRecomendations();
  }

  openInfo(Id:any){
    this.cookieService.set('StockId', Id);
      this.router.navigate(['StockDetails']);
  }
  setCookie(Id:any){
    this.cookieService.set('StockId', Id);
  }
  UserId:any;
  myStockstemp:any=[];
  myStocks:any=[];

  getMyStocksList(){
    this.service.getMyStocks(this.UserId).subscribe(data=>{
      this.myStockstemp=data;
      for (let i = 0; i < this.myStockstemp.length; i++){
        this.myStocks.push(this.myStockstemp[i]);
        
        //find similar
        this.getSimilarList(this.myStocks[i].Id)
      }
      //console.log(this.myStocks)
      //console.log(this.Similar)
    })
  }

  Similar:any = []
  getSimilarList( id:number){
    this.service.getSimilarId(id).subscribe(data=>{
      this.Similar[id] = data;
      //console.log(data);
    })
  }


  List:any = [];
  Recomendations:any = [];
  getRecomendations(){
    this.service.getRecomendations(this.UserId).subscribe(data=> {
      this.Recomendations =data;
    })
  }

}
