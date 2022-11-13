import { HttpClient } from '@angular/common/http';
import { Conditional } from '@angular/compiler';
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
  alertCount = 0;
  alerting=false;
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
  checkDiffrence(ds: Device[]): boolean{
    if(ds.length!=this.devices.length) return false;
    for(let i=0; i<this.devices.length; i++){
      if(ds[i].name!=this.devices[i].name ||
        ds[i].counter!=this.devices[i].counter ||
        ds[i].id!=this.devices[i].id ||
        ds[i].ip!=this.devices[i].ip ||
        ds[i].active!=this.devices[i].active ||
        ds[i].silenced!=this.devices[i].silenced ||
        ds[i].state!=this.devices[i].state) return false;
    }
    return true; 
  }
  newData(data:Device[]){
    
    if(!this.checkDiffrence(data)){
      this.devices = data;
      this.setAlertCount();
    }
  }
  checkStates(){
    this.deviceService.getDevices().pipe(
      catchError(error => { 
        this.checkingStates=false;
        return throwError(error); 
      })
    ).subscribe(
      data=>{
        this.newData(data);
        this.checkingStates = false;
      }
    );
  }
  setAlertCount(){
    this.alertCount = 0;
    this.alerting=false;
    this.devices.forEach(d=>{
      if(d.state!=0){
        this.alertCount++;
        if(!d.silenced){
           this.alerting = true;
        }
      }
    });
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
        this.newData(data);
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
            this.newData(data);
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
    this.editedDevice.silenced = device.silenced;
    this.editedDevice.active = device.active;
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
        this.newData(data);
        this.setAlertCount();
        this.checkingStates = false;
      }
    );
  }
}
