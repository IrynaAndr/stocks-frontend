import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-technical',
  templateUrl: './technical.component.html',
  styleUrls: ['./technical.component.css']
})
export class TechnicalComponent implements OnInit {

  constructor(private service:SharedService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  Date:any='';
  populateStockChange(){
    console.log(this.Date);
    
    this.toastr.info('temp', this.Date.toString());

  }

}
