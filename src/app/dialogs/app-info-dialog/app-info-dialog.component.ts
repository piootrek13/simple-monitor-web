import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-app-info-dialog',
  templateUrl: './app-info-dialog.component.html',
  styleUrls: ['./app-info-dialog.component.css']
})
export class AppInfoDialogComponent implements OnInit {
  apiVersion = ""
  appVersion = ""
  autor = ""
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,) {
    this.apiVersion = data.apiVersion;
    this.appVersion = data.appVersion;
    this.autor = data.autor;
   }

  ngOnInit(): void {
  }

}
export interface DialogData {
  apiVersion: string;
  appVersion: string;
  autor: string;
}
