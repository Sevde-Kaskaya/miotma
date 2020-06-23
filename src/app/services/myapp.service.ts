import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { tap, retry, catchError } from 'rxjs/operators'
import { Myapp } from './../models/myapp'
import { Project } from '../models/project';
import { Appprojects } from 'src/app/models/appprojects';
@Injectable({
  providedIn: 'root'
})
export class MyappService {

  constructor(private http: HttpClient) { }

  api_appPath = "http://piot.diginova.com.tr/api/device/apps"
  api_appprojectsPath = "http://piot.diginova.com.tr/api/device/appprojects"

  getApps(): Observable<Myapp[]> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + ' ' + localStorage.getItem("user_token"),
      'Accept': 'application/json'
    });
    return this.http.get<Myapp[]>(this.api_appPath, { headers: reqHeader }).pipe(
      tap(data =>console.log(JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  async createApp(myapp){

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer' + ' ' + localStorage.getItem("user_token"),
      'Accept': 'application/json'
    });

   let body =  "name=" + myapp.name + "&user_id=" + localStorage.getItem("user_id");

    return this.http.post<Myapp>(this.api_appPath, body, { headers: reqHeader })
    .pipe(
      catchError(this.handleError)
    ).toPromise();

  }

  async createAppProjects(appprojects){

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer' + ' ' + localStorage.getItem("user_token"),
      'Accept': 'application/json'
    });

   let body =  "project_id=" + appprojects.project_id + "&app_id=" + appprojects.app_id + "&user_id=" + localStorage.getItem("user_id");

    return this.http.post<Appprojects>(this.api_appprojectsPath, body, { headers: reqHeader })
    .pipe(
      catchError(this.handleError)
    ).toPromise();
  }

  /*getApps1(user_id): Observable<Myapp[]> {
    return this.http
      .get<Myapp[]>(this.app_path + "?user_id=" + user_id)
      .pipe(
        catchError(this.handleError)
      )
  }*/

 /* async getApp(app_id){
    return this.http
      .get<Myapp>(this.app_path + "?id=" + app_id)
      .pipe(
        catchError(this.handleError)
      ).toPromise()
  }

  async getAppProjects(app_id){
    return this.http
      .get<Appprojects[]>(this.app_projects_PATH + "?app_id=" + app_id)
      .pipe(
        catchError(this.handleError)
      ).toPromise()
  }*/

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