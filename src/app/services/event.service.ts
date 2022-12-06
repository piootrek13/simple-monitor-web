import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class EventService extends HttpService {

  getEventsByDevice(device: number): Observable<DeviceEvent[]>{
    return this.http.get<DeviceEvent[]>("http://"+this.host+":8080/events?device="+device, this.getOptions());
  }

}

export class DeviceEvent{
  id=0;
  date = Date.now();
  eventText ="";
  eventCode =0;
  deviceId=0;
  deviceName="";
}