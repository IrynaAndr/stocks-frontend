import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-tags-edit',
  templateUrl: './tags-edit.component.html',
  styles: [
  ]
})
export class TagsEditComponent implements OnInit {

  constructor(private service:SharedService,private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  Id:number =0;
  IdStocks:any = this.cookieService.get('StockId'); 
  Tag:string ="";
  Type:string="";
  Value:number=0.0;
  
  addTag(){
    var val= {
      Id:this.Id,
      IdStocks:this.IdStocks,
      Tag:this.Tag,
      Type:this.Type,
      Value:this.Value
      
    };
    this.service.addTag(val).subscribe(res=>{alert(res.toString())});
  }

}
