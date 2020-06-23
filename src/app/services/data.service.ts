import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'
import { Data } from '../models/data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  async getVariableData(variable_id){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + ' ' + localStorage.getItem("user_token"),
      'Accept': 'application/json'
    });
    return this.http.get<Data[]>('http://piot.diginova.com.tr/api/device/datas?variable_id='+variable_id, { headers: reqHeader }).pipe(
      tap(data =>console.log(JSON.stringify(data))),
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
