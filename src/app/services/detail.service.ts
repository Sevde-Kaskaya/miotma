import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { tap,retry, catchError } from 'rxjs/operators'
import { Detail } from '../models/detail'
@Injectable({
  providedIn: 'root'
})
export class DetailService {

  constructor(private http: HttpClient) { }

  async getDetail(prj_id){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + ' ' + localStorage.getItem("user_token"),
      'Accept': 'application/json'
    });
    return this.http.get<Detail[]>('http://piot.diginova.com.tr/api/device/details?project_id='+prj_id, { headers: reqHeader }).pipe(
      tap(data =>console.log(JSON.stringify(data))),
      catchError(this.handleError)
    ).toPromise()
  }

  async createDetail(detail) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer' + ' ' + localStorage.getItem("user_token"),
      'Accept': 'application/json'
    });

   let body =  "variable_id=" + detail.variable_id + "&properties_id=" + detail.properties_id + "&widget_id=" + detail.widget_id + "&project_id=" + detail.project_id;

    return this.http.post<Detail>('http://piot.diginova.com.tr/api/device/details?project_id=' + detail.project_id, body, { headers: reqHeader })
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
