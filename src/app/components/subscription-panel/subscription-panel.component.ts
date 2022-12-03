import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EmailSubscription } from '../../services/email-subscription.service';
import { SubscriptionGroup } from '../../services/subscription-group.service';

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
  @Output() addSubscriptionEmitter = new EventEmitter<EmailSubscription>();
  @Output() removeSubscriptionEmitter = new EventEmitter<EmailSubscription>();
  @Output() editSubscriptionEmitter = new EventEmitter<EmailSubscription>();
  @Output() closeEmitter = new EventEmitter();
  @Output() refreshEmailSubs = new EventEmitter<number>();
  selGroup = new SubscriptionGroup();

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['subscriptionGroups']){
      if(this.subscriptionGroups.length>0){
        this.selGroup = this.subscriptionGroups[0];
        this.onGroupSelect();
      }
    }
  }

  ngOnInit(): void {
    this.refreshGroup.emit();
  }

  onGroupSelect(){
    this.refreshEmailSubs.emit(this.selGroup.id);
  }
  addSubscription(groupId: number){    
    let es = new EmailSubscription();
    es.groupId = groupId;
    this.addSubscriptionEmitter.emit(es);
  }

}
