import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { tap,retry, catchError } from 'rxjs/operators'
import { Project } from './../models/project'

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  isCreate = false;

  constructor(private http: HttpClient) { }

  path = "http://localhost:3000/projects";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  user_token : string;

  async getUserProjects(user_id){
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + ' ' + localStorage.getItem("user_token"),
      'Accept': 'application/json'
    });
    return this.http.get<Project[]>('http://piot.diginova.com.tr/api/device/projects?user_id='+user_id, { headers: reqHeader }).pipe(
      tap(data =>console.log(JSON.stringify(data))),
      catchError(this.handleError)
    ).toPromise();
  }

 /* createProject(project): Observable<Project>{
    return this.http
    .post<Project>(this.path, JSON.stringify(project), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }*/
  async createProject(project) {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer' + ' ' + localStorage.getItem("user_token"),
      'Accept': 'application/json'
    });

   let body =  "name=" + project.name + "&app_config=" + "wifi" + "&user_id=" + project.user_id;

    return this.http.post<Project>('http://piot.diginova.com.tr/api/device/projects', body, { headers: reqHeader })
    .pipe(
      catchError(this.handleError)
    ).toPromise();
  }

  updateProject(prj): Observable<Project> {
    return this.http
      .put<Project>(this.path + '/' + prj.id, JSON.stringify(prj), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  created(){
      this.isCreate = true;
      localStorage.setItem("isCreated", "true");
  }

  isCreated() {
    return this.created;
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
