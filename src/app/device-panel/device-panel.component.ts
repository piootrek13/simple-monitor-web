import { Component, Input, OnInit } from '@angular/core';
import { Device } from '../device.service';

@Component({
  selector: 'app-device-panel',
  templateUrl: './device-panel.component.html',
  styleUrls: ['./device-panel.component.css']
})
export class DevicePanelComponent implements OnInit {
  @Input() device = new Device();
  constructor() { }

  ngOnInit(): void {
    
  }

}
