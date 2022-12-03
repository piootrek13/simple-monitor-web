import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubscriptionGroup } from 'src/app/services/subscription-group.service';

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.css']
})
export class GroupDialogComponent implements OnInit {
  title = "Nowa grupa"
  group = new SubscriptionGroup();
  nameExistError = false;
  emptyFieldError = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private dialogRef: MatDialogRef<GroupDialogComponent>) { }

  ngOnInit(): void {
    this.nameExistError = false;
    this.emptyFieldError = false;

  }
  checkExist():boolean{

    return false;
  }
  confirm(){
    
    this.nameExistError = false;
    this.emptyFieldError = false;
    if(this.group.name.length<1){
      this.emptyFieldError = true;
      return;
    }
    for(let g of this.data.groups){
      if(g.name === this.group.name){
         this.nameExistError = true;
         return;
      }
    }
    this.dialogRef.close(this.group);
  }
}
export interface DialogData {
  groups: SubscriptionGroup[];
}