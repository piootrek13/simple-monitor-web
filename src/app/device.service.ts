import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService extends HttpService {
  getDevices(): Observable<Device[]>{
    return this.http.get<Device[]>("http://"+this.host+":8080/devices", this.getOptions());
  }
}

export class Device{
  id=0;
  name="";
  ip="";
  counter=0;
  state=0;
}