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
  
  getDevices(): Observable<Device[]> {
    return this.http
    .get<Device[]>(this.path)
    .pipe(
      tap(data =>console.log(JSON.stringify)),
      catchError(this.handleError)
    )
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
