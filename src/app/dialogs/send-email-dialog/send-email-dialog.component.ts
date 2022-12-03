import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Email } from 'src/app/services/email.service';

@Component({
  selector: 'app-send-email-dialog',
  templateUrl: './send-email-dialog.component.html',
  styleUrls: ['./send-email-dialog.component.css']
})
export class SendEmailDialogComponent implements OnInit {
  email = new Email();
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.email.to = data.to;
    this.email.subject = "Wiadomość testowa";
    this.email.text = "Jest to wiadomość testowa aplikacji Simple Monitor.";
   }

  ngOnInit(): void {
  }

}
export interface DialogData {
  to: string;
}