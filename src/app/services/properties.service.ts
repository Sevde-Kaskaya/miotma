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

  async getProperty(device_id){
    return this.http
    .get<Properties[]>(this.path + "?device_id="+ device_id) 
    .pipe(
      catchError(this.handleError)
    ).toPromise();
  }

  async getPropertywithId(prop_id){
    return this.http
    .get<Properties>(this.path + "?id="+ prop_id) 
    .pipe(
      catchError(this.handleError)
    ).toPromise();
  }
  async updateProperty(prop) {
    return this.http
      .put<Properties>(this.path + '/' + prop.id, JSON.stringify(prop), this.httpOptions)
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
