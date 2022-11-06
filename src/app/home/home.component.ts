import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, map, Subscription, throwError, timer } from 'rxjs';
import { Device, DeviceService } from '../device.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  static readonly MODE_NONE = 0;
  static readonly MODE_NEW = 1;
  static readonly MODE_EDIT = 2;
  mode = HomeComponent.MODE_NONE;
  editedDevice = new Device();
  deviceService: DeviceService;
  checkSubscription: Subscription = new Subscription;
  devices: Device[] = [];
  checkingStates = false;
  constructor(private httpClient: HttpClient) {
    this.deviceService = new DeviceService(httpClient);
   }
  ngOnDestroy(): void {
    this.checkSubscription.unsubscribe();
  }
  ngOnInit(): void {
    // for(let i=0; i<10; i++){
    //   this.names.push("NUMER: "+i.toString())
    // }
    this.checkSubscription = timer(0, 1000).pipe( 
      map(() => { 
        if(!this.checkingStates) this.checkStates(); 
        this.checkingStates = true;
      }) 
    ).subscribe();
  }
  checkStates(){
    this.deviceService.getDevices().pipe(
      catchError(error => { 
        this.checkingStates=false;
        return throwError(error); 
      })
    ).subscribe(
      data=>{
        this.devices = data
        this.checkingStates = false;
      }
    )
  }
  save(device: Device){
    console.log(device);
  }
  setNoneMode(){
    this.mode = HomeComponent.MODE_NONE;

  }
  setNewMode(){
    this.mode = HomeComponent.MODE_NEW;
    this.editedDevice = new Device();
  }
  setEditMode(device: Device){
    this.mode = HomeComponent.MODE_EDIT;
    this.editedDevice = new Device();
    this.editedDevice.id = device.id;
    this.editedDevice.counter = device.counter;
    this.editedDevice.ip = device.ip;
    this.editedDevice.name = device.name;
    this.editedDevice.state = device.state;
  }
}
