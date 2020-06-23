import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { ActivatedRoute } from '@angular/router';
import { Myapp } from 'src/app/models/myapp';
import { MyappService } from 'src/app/services/myapp.service';
import { Appprojects } from 'src/app/models/appprojects';

@Component({
  selector: 'app-myappdetails',
  templateUrl: './myappdetails.page.html',
  styleUrls: ['./myappdetails.page.scss'],
})
export class MyappdetailsPage implements OnInit {

  app: any[];
  my_app: Myapp;
  current_app: any;
  app_id: number;

  projects: Project[];
  user_id: Number;
  app_projects: Appprojects[];
  projects1: Array<Project> = new Array<Project>()
  app_name: string;

  constructor(private navCtrl: NavController,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private myAppService: MyappService) {

    this.user_id = Number(localStorage.getItem("user_id"));
    this.my_app = new Myapp();
    this.app_id = this.route.snapshot.data['app'];
  }

  sliderConfig = {
  }

  ngOnInit() {
      this.getApp();
      this.getProjects();
  }

  
  async getApp() {
   // this.my_app = await this.myAppService.getApp(this.app_id)
  }

  async getProjects() {
  /*  this.app_projects = await this.myAppService.getAppProjects(this.app_id);
    console.log(this.app_projects)
    for (let i = 0; i < this.app_projects.length; i++) {
      await this.myAppService.getProject(this.app_projects[i].project_id)
        .then((result) => this.projects1.push(result))
    }
    console.log(this.projects1)*/
  }

  cancel() {
    this.navCtrl.navigateForward('/myapp');
  }
}
