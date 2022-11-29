import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class EmailSubscriptionService extends HttpService  {
  getSubs(): Observable<EmailSubscription[]>{
    return this.http.get<EmailSubscription[]>("http://"+this.host+":8080/subscription", this.getOptions());
  }
  postSub(email: EmailSubscription): Observable<EmailSubscription[]>{
    return this.http.post<EmailSubscription[]>("http://"+this.host+":8080/subscription", email, this.getOptions());
  }
}

export class EmailSubscription{
  id = 0;
  name = "";
  email = "";
  groupId = -1;
}