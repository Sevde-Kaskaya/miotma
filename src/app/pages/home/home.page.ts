import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, NavParams, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { Router, NavigationExtras } from '@angular/router';
import { DeviceService } from 'src/app/services/device.service';
import { Device } from 'src/app/models/device';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [NavParams]
})
export class HomePage implements OnInit {

  title = "Projects"
  user_id: number;
  prj_id: number;
  projects: Project[];
  data: any;
  device_name:string;
  device_id:number;
  device:Device;
  id:number

  constructor(public loadingCntrl: LoadingController,
    private alertService: AlertService,
    private projectService: ProjectService,
    private menuCtrl: MenuController,
    private router: Router,
    private navCtrl: NavController,
    private deviceService: DeviceService) {

    this.user_id = Number(localStorage.getItem("user_id"));
  }
  
  ngOnInit() {

    this.menuCtrl.enable(false);
    
  }

  ionViewWillEnter(){
    this.getUserProjects();
  }

  logOut() {
    this.alertService.showLogOutAlert();
  }

  getUserProjects() {
    this.projectService.getUserProjects(this.user_id).subscribe((data) => {
      this.projects = data;
    })
  }

  createProject() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        user_id: JSON.stringify(this.user_id)
      }
    };
    this.router.navigate(['/newproject'], navigationExtras);
  }

  goProject(prj) {
    localStorage.setItem("device_id",  String(prj.device))
    localStorage.setItem("project_id", String(prj.id))
    this.navCtrl.navigateRoot('/projectdetail');
  }

}




