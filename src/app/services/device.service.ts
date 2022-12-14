import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService extends HttpService {
  getDevices(): Observable<Device[]>{
    return this.http.get<Device[]>("http://"+this.host+":"+this.port+"/devices", this.getOptions());
  }
  editDevice(device: Device): Observable<Device[]>{
    return this.http.put<Device[]>("http://"+this.host+":"+this.port+"/devices",device, this.getOptions());
  }
  addDevice(device: Device): Observable<Device[]>{
    return this.http.post<Device[]>("http://"+this.host+":"+this.port+"/devices",device, this.getOptions());
  }
  removeDevice(id: number): Observable<Device[]>{
    return this.http.delete<Device[]>("http://"+this.host+":"+this.port+"/devices/"+id, this.getOptions());
  }
  setSilenced(id: number, silenced: boolean): Observable<Device[]>{
    return this.http.get<Device[]>("http://"+this.host+":"+this.port+"/devices/silenced/?id="+id+"&silenced="+silenced, this.getOptions());
  }
}

export class Device{
  id=0;
  name="";
  ip="";
  counter=0;
  state=0;
  silenced = false;
  active = true;
  subscriptionGroup = 0;
}