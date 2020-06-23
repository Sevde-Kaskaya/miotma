import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { tap, retry, catchError } from 'rxjs/operators'
import { Project } from './../models/project'
import { Properties } from '../models/properties';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  constructor(private http: HttpClient) { }

  async getProperty(device_id) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + ' ' + localStorage.getItem("user_token"),
      'Accept': 'application/json'
    });
    return this.http.get<Properties[]>('http://piot.diginova.com.tr/api/device/properties?device_id=' + device_id, { headers: reqHeader })
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    ).toPromise();
  }

  async getPropertywithId(prop_id) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + ' ' + localStorage.getItem("user_token"),
      'Accept': 'application/json'
    });
    return this.http.get<Properties>('http://piot.diginova.com.tr/api/device/properties/' + prop_id, { headers: reqHeader })
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    ).toPromise();
  }

  async updatePropertyValue(prop) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer' + ' ' + localStorage.getItem("userToken1"),
      'Accept': 'application/json'
    });

   let body =  "value=" + prop.value ;
    return this.http.put<Properties>('http://piot.diginova.com.tr/api/device/properties/' + prop.id, body, { headers: reqHeader })
    .pipe(
      catchError(this.handleError)
    ).toPromise();
  }

  handleError(err: HttpErrorResponse) {
    let errMessage = "";
    if (err.error instanceof ErrorEvent) {
      errMessage = "Error" + err.error.message;
    } else {
      errMessage = "System error";
    }

    console.log(errMessage);
    return throwError(errMessage);
  }

}
