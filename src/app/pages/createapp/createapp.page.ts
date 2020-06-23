import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { NavController, MenuController } from '@ionic/angular';
import { Myapp } from '../../models/myapp';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { MyappService } from 'src/app/services/myapp.service';
import { Appprojects } from 'src/app/models/appprojects';
@Component({
  selector: 'app-createapp',
  templateUrl: './createapp.page.html',
  styleUrls: ['./createapp.page.scss'],
})
export class CreateappPage implements OnInit {

  app: Myapp;
  projects: Project[];
  user_id: number;
  app_id: number = 0;
  app_projects: Appprojects[];
  selected_projects: Array<Project> = new Array<Project>();

  constructor(
    private alertService: AlertService,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private projectService: ProjectService,
    private myappService: MyappService) {

    this.app = new Myapp();
    this.user_id = Number(localStorage.getItem("user_id"));

  }

  ngOnInit() {
    this.getProjects();
  }

  select_eventOption(detail: boolean, index: number) {
    if (detail) {
      this.selected_projects.push(this.projects[index]);
    } else {
      const ind = this.selected_projects.findIndex((i: Project) => {
        return (i.id === this.projects[index].id);
      });
      if (-1 != ind) {
        this.selected_projects.splice(ind, 1);
      }
    }
  }

  getProjects() {
    /*this.projectService.getUserProjects(this.user_id).subscribe((data) => {
      this.projects = data;
      console.log(this.projects)
    })*/
  }

  async createApp() {
    if (this.selected_projects.length == 0)
      return;
    if (this.app.name == undefined)
      return;

    this.app.user_id = this.user_id;
    let createdapp = await this.myappService.createApp(this.app);
    if (createdapp == undefined || createdapp.id == undefined)
      return;

    let app_id = createdapp.id;
    for (let i = 0; i < this.selected_projects.length; i++) {
      let appProject = new Appprojects()
      appProject.app_id = app_id
      appProject.project_id = this.selected_projects[i].id
      let createdproject = await this.myappService.createAppProjects(appProject);
    }
    this.alertService.presentToast("App created..");
   this.navCtrl.navigateForward('/myapp');
  }

  cancel() {
    this.navCtrl.navigateForward('/myapp');
  }
}