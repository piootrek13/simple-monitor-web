import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EmailSubscription } from '../email-subscription.service';
import { SubscriptionGroup } from '../subscription-group.service';

@Component({
  selector: 'app-subscription-panel',
  templateUrl: './subscription-panel.component.html',
  styleUrls: ['./subscription-panel.component.css']
})
export class SubscriptionPanelComponent implements OnInit, OnChanges {

  @Input() subscriptionGroups: SubscriptionGroup[] = [];
  @Input() subscriptions: EmailSubscription[] = [];
  @Output() refreshGroup = new EventEmitter();
  @Output() addGroup = new EventEmitter();
  @Output() closeEmitter = new EventEmitter();
  selGroup = new SubscriptionGroup();

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['subscriptionGroups']){
      if(this.subscriptionGroups.length>0){
        this.selGroup = this.subscriptionGroups[0];
      }
    }
  }

  ngOnInit(): void {
    this.refreshGroup.emit();
  }

}
