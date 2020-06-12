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

  getDetail2(prj_id): Observable<Detail[]> {
    return this.http
    .get<Detail[]>(this.path + "?project_id="+ prj_id)
    .pipe(
      tap(data =>console.log(JSON.stringify)),
      catchError(this.handleError)
    )
  }

  async getDetail(prj_id){
    return this.http
      .get<Detail[]>(this.path + "?project_id=" + prj_id)
      .pipe(
        catchError(this.handleError)
      ).toPromise()
  }


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
