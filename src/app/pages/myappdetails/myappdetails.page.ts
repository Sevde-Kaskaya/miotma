import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { ActivatedRoute } from '@angular/router';
import { Myapp } from 'src/app/models/myapp';
import { MyappService } from 'src/app/services/myapp.service';
import { Appprojects } from 'src/app/models/appprojects';
import { Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';

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

  projects: Project[] = [];
  user_id: Number;
  app_projects: Appprojects[];
  projectsArray: Array<Project> = new Array<Project>()
  app_name: string;


  constructor(private navCtrl: NavController,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private myAppService: MyappService,
    private menuCtrl: MenuController) {

    this.user_id = Number(localStorage.getItem("user_id"));
    this.my_app = new Myapp();
    // this.app_id = this.route.snapshot.data['app']; 
    this.route.queryParams.subscribe(params => {
      if (params && params.myApp) {
        this.my_app = JSON.parse(params.myApp);
      }
    });


  }

  sliderConfig = {
    pager: true
  }

  ngOnInit() {
    this.menuCtrl.enable(false);

  }

  ionViewWillEnter() {
    this.getAppProjects();
  }

  test: Project[] = []
  getAppProjects() {

    this.myAppService.getAppProjects(this.my_app.id).then((result) => {

      this.app_projects = result
      console.log(this.app_projects)

      const wait = (ms) => new Promise(res => setTimeout(res, ms));

      const start = async () => {
        await this.asyncForEach(this.app_projects, async (num) => {
        //  await wait(1000);
          await this.myAppService.getProject(num.project_id).then(
            (result) => {
              this.projectsArray.push(result)
              
           }
         );
         
          console.log(num.project_id);
          //await wait(1000);
        });
        console.log(this.projectsArray)
        console.log('Done');
        
      }
      start();

    })

  }

  
  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  getProject() {

    for (let i = 0; i < this.app_projects.length; i++) {

      this.myAppService.getProject(this.app_projects[i].project_id).then(
         (result) => {
          this.projects[i] = result
        }
      );

    }
    console.log(this.projects)
  }

  getProject2() {

    for (let i = 0; i < this.app_projects.length; i++) {

      this.myAppService.getProject1(this.app_projects[i].project_id).subscribe(
         async (result) => {
          this.projects[i] = result
        }
      );

    }
    console.log(this.projects)
  }

  getProjectTest(): Observable<Project[]> {

    return new Observable(observer => {
      let pro: Project[] = [];
      for (let i = 0; i < this.app_projects.length; i++) {
        this.myAppService.getProject1(this.app_projects[i].project_id).subscribe(
          (result) => {
            pro[i] = result
          }
        );
      }
      console.log(pro)
      observer.next(pro);
    });

  }

  getProject1(): Promise<Project[]> {

    return new Promise((data) => {
      let pro: Project[] = [];
      for (let i = 0; i < this.app_projects.length; i++) {
        this.myAppService.getProject1(this.app_projects[i].project_id).subscribe(
          async (result) => {
            pro[i] = result
          }
        );
      }
      data(pro);
    })
  }




  /*
  ionViewCanEnter() {
    console.log("1")
  }
  ionViewDidLoad() {
    console.log("2")
  }
  ionViewWillEnter() {
    console.log("3")
  }
  ionViewDidEnter() {
    console.log("4")
  }
  ionViewCanLeave() {
    console.log("5")
  }
  ionViewWillLeave() {
    console.log("6")
  }
  ionViewWillUnload() {
    console.log("7")
  }
  */

  cancel() {
    this.navCtrl.navigateForward('/myapp');
  }
}
