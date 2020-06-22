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

  strToken2 : string = "4sI2lYd7Q3IWP1yEc960k7enkaWdRgHR"
  strToken1: string = "80RdynqVVemsS2F7rwGOoAGFfXJBN8nm"
  user_token : string;

  getUserProjects(user_id): Observable<Project[]> {
    if(user_id == 1) { //frat57
      this.user_token = this.strToken1
    }
    if(user_id == 2) { //test_ha
      this.user_token = this.strToken2
    }
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + ' ' + this.user_token,
      'Accept': 'application/json'
    });
    return this.http.get<Project[]>('http://piot.diginova.com.tr/api/device/projects?user_id='+user_id, { headers: reqHeader }).pipe(
      tap(data =>console.log(JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  getProject(prj_id): Observable<Project[]> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + ' ' + this.strToken2,
      'Accept': 'application/json'
    });

    return this.http.get<Project[]>('http://piot.diginova.com.tr/api/device/projects?id=' + prj_id, { headers: reqHeader }).pipe(
      tap(data =>console.log(JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  /*getProject(prj_id): Observable<Project[]> {
    return this.http
    .get<Project[]>(this.path + "?id="+ prj_id) 
    .pipe(
      tap(data =>console.log(JSON.stringify)),
      catchError(this.handleError)
    )
  }
*/
  createProject(project): Observable<Project>{
    return this.http
    .post<Project>(this.path, JSON.stringify(project), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
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
