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
  constructor() { }

  ngOnInit(): void {
    
  }

  editEmit(){
    this.editEmitter.emit(this.device);
  }
}
