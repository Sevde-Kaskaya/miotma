import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'
import { Variable } from '../models/variable';


@Injectable({
  providedIn: 'root'
})
export class VariableService {

  constructor(private http: HttpClient) { }

  path = "http://localhost:3000/variable";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getVariable(device_id): Observable<Variable[]> {
    return this.http
    .get<Variable[]>(this.path + "?device_id="+ device_id) 
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
