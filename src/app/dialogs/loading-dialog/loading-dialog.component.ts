import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-loading-dialog',
  templateUrl: './loading-dialog.component.html',
  styleUrls: ['./loading-dialog.component.css']
})
export class LoadingDialogComponent implements OnInit {
  loadingData = new LoadingData();
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
   this.loadingData = data.loadingData;
  }

  ngOnInit(): void {
  }

}
export interface DialogData {
  loadingData: LoadingData;
}
export class LoadingData{
  title="";
  text="";
  state = 0;
}