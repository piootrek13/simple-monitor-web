import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  protected getOptions(){

    return{
      headers: new HttpHeaders({
        'Content-Type':  'application/json',

        Authorization: "Basic "+btoa(localStorage.getItem('USERNAME')+':'+localStorage.getItem('PASSWORD'))
      })
    };
  }
  protected getOptionsUndefined(){

    return{
      headers: new HttpHeaders({
        Authorization: "Basic "+btoa(localStorage.getItem('USERNAME')+':'+localStorage.getItem('PASSWORD'))
      })
    };
  }

  host: string;
  port: string;

  constructor(protected http: HttpClient) {
    this.host=window.location.hostname;
    this.port="8081";
   // this.host="192.168.31.85";
   }
}
