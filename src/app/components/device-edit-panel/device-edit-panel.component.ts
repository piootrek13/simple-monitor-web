import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SubscriptionGroup } from 'src/app/services/subscription-group.service';
import { Device } from '../../services/device.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-device-edit-panel',
  templateUrl: './device-edit-panel.component.html',
  styleUrls: ['./device-edit-panel.component.css']
})
export class DeviceEditPanelComponent implements OnInit, OnChanges {

  @Input() mode =HomeComponent.MODE_NEW;
  @Input() device = new Device();
  @Input() subscriptionGroups: SubscriptionGroup[] = [];
  @Output() saveEmitter = new EventEmitter<Device>();
  @Output() cancelEmitter = new EventEmitter();
  selectedGroup = new SubscriptionGroup();
  emptySubscriptionGroup = new SubscriptionGroup();

  constructor() {
    this.emptySubscriptionGroup.name = "<Brak>";
    this.emptySubscriptionGroup.id = 0;
   }
  ngOnChanges(changes: SimpleChanges): void {
    this.selectedGroup = this.emptySubscriptionGroup;
    if(changes['subscriptionGroups'] || changes['device']){
      for(let sg of this.subscriptionGroups){
        if(sg.id == this.device.subscriptionGroup){
          this.selectedGroup = sg;
          break;
        } 
      }
    }
  }

  ngOnInit(): void {
  }

  onGroupSelect(){
    this.device.subscriptionGroup = this.selectedGroup.id;
  }
}
