import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService extends HttpService {

  post(email: Email): Observable<Email>{
    return this.http.post<Email>("http://"+this.host+":8080/sendemail", email, this.getOptions());
  }
}

export class Email{
  to = "";
  subject = "";
  text = "";
}
