import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ApiVersionService extends HttpService {

  getVersion(): Observable<ApiVersion>{
    return this.http.get<ApiVersion>("http://"+this.host+":"+this.port+"/version", this.getOptions());
  }

}
export class ApiVersion{
  version="";
}