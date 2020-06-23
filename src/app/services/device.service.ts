import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { tap,retry, catchError } from 'rxjs/operators'
import { Device } from './../models/device'

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient) { }

  path = "http://localhost:3000/device";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getDevice(device_id): Observable<Device[]> {
    return this.http
    .get<Device[]>(this.path + "?id="+ device_id)
    .pipe(
      tap(data =>console.log(JSON.stringify)),
      catchError(this.handleError)
    )
  }
  
  async getDevices(){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + ' ' + localStorage.getItem("user_token"),
      'Accept': 'application/json'
    });
    return this.http.get<Device[]>('http://piot.diginova.com.tr/api/device/devices/1', { headers: reqHeader }).pipe(
      tap(data =>console.log(JSON.stringify(data))),
      catchError(this.handleError)
    ).toPromise();
  }

  async updateDevice(dev_id, project_id) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer' + ' ' + localStorage.getItem("user_token"),
      'Accept': 'application/json'
    });

   let body = "id=" + dev_id + "&project_id=" + project_id;

    return this.http.put<Device>('http://piot.diginova.com.tr/api/device/devices/'+dev_id, body, { headers: reqHeader })
    .pipe(
      catchError(this.handleError)
    ).toPromise();
  }

  /*getDevices(): Observable<Device[]> {
    return this.http
    .get<Device[]>(this.path)
    .pipe(
      tap(data =>console.log(JSON.stringify)),
      catchError(this.handleError)
    )
  }
*/
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
