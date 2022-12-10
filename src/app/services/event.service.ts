import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class EventService extends HttpService {

  getEventsByDevice(device: number, range: string): Observable<DeviceEvent[]>{
    return this.http.get<DeviceEvent[]>("http://"+this.host+":"+this.port+"/events?device="+device+"&range="+range, this.getOptions());
  }

}

export class DeviceEvent{
  id=0;
  date = "";
  eventText ="";
  eventCode =0;
  deviceId=0;
  deviceName="";
}