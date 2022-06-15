import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { LoginregisterService } from 'src/app/loginregister.service';

import { Document, Paragraph, Packer, TextRun } from 'docx';
import * as fs from "fs";
import { saveAs } from 'file-saver';
//import { saveAs } from "file-saver/FileSaver";

//import { experiences, education, skills, achievements } from "./cv-data";
import { DocumentCreator } from "./cv-generator";

@Component({
  selector: 'app-analisys',
  templateUrl: './analisys.component.html',
  styleUrls: ['./analisys.component.css']
})
export class AnalisysComponent implements OnInit {

  constructor(private service:SharedService, private cookieService:CookieService,
    private toastr:ToastrService, private service2:LoginregisterService) { }

  ngOnInit(): void {
    this.UserId= this.cookieService.get('UserId'); 
    this.getUserInfo();
    this.getAmountAndValue();
    this.getEventsList();
  }
  Event:any;
  event:any ="";
  resultVisible:boolean = false;
  dataVisible:boolean=false;
  result:any;
  PickEvent(){
    this.event = this.Event;
  }
  Analis(){
    this.service.ResultAnalisys(this.event).subscribe(data=>{
      this.result = data;
      this.resultVisible =true;
      this.dataVisible = true;
    }, err  => (console.log(err)
    ));
    this.DataUsedVisible();
  }

  dataUsed:any = [];
  DataUsedVisible(){
    this.service.DataAnalisys(this.event).subscribe(data=>{
      this.dataUsed = data;
      //console.log(data);
    });
  }

  EventsList:any=[];
  getEventsList(){
    this.service.getEventList().subscribe(data=>{
      this.EventsList=data;
    })
  }


  UserId:any;
  name = "Angular";
  UserName:any;
  Data:any;

  public download(): void {
    const documentCreator = new DocumentCreator();
    const doc = documentCreator.create(
      this.data,
       this.UserInfo
    );

    Packer.toBlob(doc).then(blob => {
      console.log(blob);
      saveAs(blob, "report.docx");
      this.toastr.info('Report', "Document created successfully");
    });
  }

  UserInfo:any;
  getUserInfo(){
    this.service2.getUserInfo(this.cookieService.get('UserId')).subscribe(data=>{
      this.UserInfo=data;
      this.UserName = this.UserInfo.Name;
    })
  }
  stockAmountarr:any = [];
  stockNamearr:any =[];
  data:any;
  stockValuearr:any=[];
 
  getAmountAndValue(){
    this.service.getValueAndAmount(this.UserId).subscribe(data=>{
      this.data = data;
      for(let i =0; i<this.data.length; i++){
        this.stockNamearr.push(this.data[i].Name)
        this.stockAmountarr.push(this.data[i].Amount);
        this.stockValuearr.push(this.data[i].Value);
      }
    })}

  

}
