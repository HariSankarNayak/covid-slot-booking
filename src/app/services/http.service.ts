/* eslint-disable @typescript-eslint/naming-convention */
import { environment } from './../../environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  httpOptions: any = {headers: new HttpHeaders({Authorization: ''})};
  BASEURL =  environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  get(url: string): Observable<any> {
    return this.http.get<any>(this.BASEURL + url, this.httpOptions);
  }

  post(url: string, model: any): Observable<any> {
    return this.http.post<any>(this.BASEURL + url, model, this.httpOptions);
  }

  put(url: string, model: any): Observable<any> {
    return this.http.put<any>(this.BASEURL + url, model, this.httpOptions);
  }

  delete(url: string): Observable<any> {
    return this.http.delete<any>(this.BASEURL + url, this.httpOptions);
  }



}
