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
}
