import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Device } from '../device.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-device-edit-panel',
  templateUrl: './device-edit-panel.component.html',
  styleUrls: ['./device-edit-panel.component.css']
})
export class DeviceEditPanelComponent implements OnInit {

  @Input() mode =HomeComponent.MODE_NEW;
  @Input() device = new Device();
  @Output() saveEmitter = new EventEmitter<Device>();
  @Output() cancelEmitter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  saveEmit(){
    this.saveEmitter.emit(this.device);
  }
  cancelEmit(){
    this.cancelEmitter.emit();
  }
}
