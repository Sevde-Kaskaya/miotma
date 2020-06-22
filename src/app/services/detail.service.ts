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

  path = "http://localhost:3000/detail";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  strToken2 : string = "4sI2lYd7Q3IWP1yEc960k7enkaWdRgHR"
  strToken1: string = "80RdynqVVemsS2F7rwGOoAGFfXJBN8nm"
  user_token : string;

  async getDetail(prj_id){
    if(localStorage.getItem("user_id") == "1") { //frat57
      this.user_token = this.strToken1
    }
    if(localStorage.getItem("user_id") == "2") { //test_ha
      this.user_token = this.strToken2
    }
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + ' ' + this.user_token,
      'Accept': 'application/json'
    });
    return this.http.get<Detail[]>('http://piot.diginova.com.tr/api/device/details/'+prj_id, { headers: reqHeader }).pipe(
      tap(data =>console.log(JSON.stringify(data))),
      catchError(this.handleError)
    ).toPromise()
  }
/*
  async getDetail(prj_id){
    return this.http
      .get<Detail[]>(this.path + "?project_id=" + prj_id)
      .pipe(
        catchError(this.handleError)
      ).toPromise()
  }*/

  createDetail(detail): Observable<Detail>{
    return this.http
    .post<Detail>(this.path, JSON.stringify(detail), this.httpOptions)
    .pipe(
      retry(2),
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
