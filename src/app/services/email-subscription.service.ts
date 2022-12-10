import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class EmailSubscriptionService extends HttpService  {
  getSubs(): Observable<EmailSubscription[]>{
    return this.http.get<EmailSubscription[]>("http://"+this.host+":"+this.port+"/subscription", this.getOptions());
  }
  getSubsByGroup(groupId: number): Observable<EmailSubscription[]>{
    return this.http.get<EmailSubscription[]>("http://"+this.host+":"+this.port+"/subscription/?groupId="+groupId, this.getOptions());
  }
  post(email: EmailSubscription): Observable<EmailSubscription[]>{
    return this.http.post<EmailSubscription[]>("http://"+this.host+":"+this.port+"/subscription", email, this.getOptions());
  }
  put(email: EmailSubscription): Observable<EmailSubscription[]>{
    return this.http.put<EmailSubscription[]>("http://"+this.host+":"+this.port+"/subscription", email, this.getOptions());
  }
  delete(emailId: number): Observable<EmailSubscription[]>{
    return this.http.delete<EmailSubscription[]>("http://"+this.host+":"+this.port+"/subscription/"+emailId, this.getOptions());
  }
}

export class EmailSubscription{
  id = 0;
  name = "<NOWA>";
  email = "";
  groupId = -1;
}