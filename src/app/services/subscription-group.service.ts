import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionGroupService extends HttpService {
  getGroups(): Observable<SubscriptionGroup[]>{
    return this.http.get<SubscriptionGroup[]>("http://"+this.host+":8080/subscriptiongroup", this.getOptions());
  }
  postGroup(group: SubscriptionGroup): Observable<SubscriptionGroup[]>{
    return this.http.post<SubscriptionGroup[]>("http://"+this.host+":8080/subscriptiongroup", group, this.getOptions());
  }
}

export class SubscriptionGroup{
  id = 0;
  name = "";
}