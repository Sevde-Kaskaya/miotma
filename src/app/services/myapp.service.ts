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

  app_path = "http://localhost:3000/app";
  app_projects_PATH = "http://localhost:3000/app_projects";
  project_path = "http://localhost:3000/projects";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getApps(user_id): Observable<Myapp[]> {
    return this.http
      .get<Myapp[]>(this.app_path + "?user_id=" + user_id)
      .pipe(
        catchError(this.handleError)
      )
  }

  async getApp(app_id){
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
  }

  async createApp(myapp){
    return this.http
      .post<Myapp>(this.app_path, JSON.stringify(myapp), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      ).toPromise();
  }

  async createAppProjects(appprojects){
    return this.http
      .post<Appprojects>(this.app_projects_PATH, JSON.stringify(appprojects), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      ).toPromise();
  }

  async getProject(project_id){
    return this.http
    .get<Project>(this.project_path + "?id="+ project_id) 
    .pipe(
      catchError(this.handleError)
    ).toPromise();
  }


  getProject1(prj_id): Observable<Project> {
    return this.http
    .get<Project>(this.project_path + "?id="+ prj_id) 
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