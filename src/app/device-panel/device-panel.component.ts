import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Device } from '../device.service';

@Component({
  selector: 'app-device-panel',
  templateUrl: './device-panel.component.html',
  styleUrls: ['./device-panel.component.css']
})
export class DevicePanelComponent implements OnInit {
  @Input() device = new Device();
  @Output() editEmitter = new EventEmitter<Device>();
  @Output() removeEmitter = new EventEmitter<Device>();
  @Output() setSilencedEmitter = new EventEmitter<Device>();
  constructor() { }

  ngOnInit(): void {
    
  }

  editEmit(){
    this.editEmitter.emit(this.device);
  }
  removeEmit(){
    this.removeEmitter.emit(this.device);
  }
  setSilencedEmit(){
    this.device.silenced = !this.device.silenced;
    this.setSilencedEmitter.emit(this.device);
  }
}
