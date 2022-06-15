import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent implements OnInit {

  constructor(public service: SharedService,
    private toastr:ToastrService) { }

    ngOnInit(): void {
      this.service.backupListGet();
    }
  
    createBackup(){
      this.service.createBackup().subscribe(
        res =>{
          console.log(res);
          this.toastr.info('Backup created',res.toString())
        },
        err =>{
          console.log(err);
          this.toastr.error('Error',err.toString())
        }
        );
        this.service.backupListGet();
    }
    restore(st:string){
      this.service.restore(st).subscribe(
        res =>{
          console.log(res);
          this.toastr.info('DB restored',res.toString())
        },
        err =>{
          console.log(err);
          this.toastr.error('Error',err.toString())
        }
      );
    }
    ReloadList(){
      this.service.backupListGet();
    }
}
