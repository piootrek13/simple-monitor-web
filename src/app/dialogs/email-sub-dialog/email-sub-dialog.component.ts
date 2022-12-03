import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmailSubscription } from 'src/app/services/email-subscription.service';

@Component({
  selector: 'app-email-sub-dialog',
  templateUrl: './email-sub-dialog.component.html',
  styleUrls: ['./email-sub-dialog.component.css']
})
export class EmailSubDialogComponent implements OnInit {
  title = "Nowa subscrypcja"
  emailSubscription = new EmailSubscription();
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,) {
    this.emailSubscription=data.emailSubscription;
   }

  ngOnInit(): void {
    if(this.emailSubscription.id>0) this.title = "Edytuj";
    else this.title = "Nowa subscrypcja";
  }
  confirm(){

  }
}
export interface DialogData {
  emailSubscription: EmailSubscription;
}
