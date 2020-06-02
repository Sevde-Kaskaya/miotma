import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { tap,retry, catchError } from 'rxjs/operators'
import { Project } from './../models/project'
import { Properties } from '../models/properties';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  constructor(private http: HttpClient) { }

  path = "http://localhost:3000/properties";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getProperty(device_id): Observable<Properties[]> {
    return this.http
    .get<Properties[]>(this.path + "?device_id="+ device_id) 
    .pipe(
      tap(data =>console.log(JSON.stringify)),
      catchError(this.handleError)
    )
  }

  getPropertywithId(prop_id): Observable<Properties[]> {
    return this.http
    .get<Properties[]>(this.path + "?id="+ prop_id) 
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
