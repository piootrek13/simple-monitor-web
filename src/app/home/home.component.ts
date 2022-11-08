import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map, Subscription, throwError, timer } from 'rxjs';
import { Device, DeviceService } from '../device.service';
import { RemoveDialogComponent } from '../remove-dialog/remove-dialog.component';

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
  constructor(private httpClient: HttpClient, private dialog: MatDialog) {
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
    );
  }
  save(device: Device){
    this.checkingStates = true;

    let request;
    if(device.id>0) request = this.deviceService.editDevice(device);
    else request = this.deviceService.addDevice(device);
    request.pipe(
      catchError(error => { 
        this.checkingStates=false;
        return throwError(error); 
      })
    ).subscribe(
      data=>{
        this.devices = data
        this.checkingStates = false;
      }
    );
    this.setNoneMode();
  }
  remove(device: Device){
    const dialogRef = this.dialog.open(RemoveDialogComponent, {data:{name: device.name}});
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.checkingStates = true;
        this.deviceService.removeDevice(device.id).pipe(
          catchError(error => { 
            this.checkingStates=false;
            return throwError(error); 
          })
        ).subscribe(
          data=>{
            this.devices = data
            this.checkingStates = false;
          }
        );
        this.setNoneMode();
      }
    });
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
  setSilenced(device: Device){
    this.checkingStates=true;
    this.deviceService.setSilenced(device.id, device.silenced).pipe(
      catchError(error => { 
        this.checkingStates=false;
        return throwError(error); 
      })
    ).subscribe(
      data=>{
        this.devices = data
        this.checkingStates = false;
      }
    );
  }
}
