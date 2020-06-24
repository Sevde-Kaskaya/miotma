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

  user_id: number;
  projects: Project[];
  devices: Device[];

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

  ionViewWillEnter() {
    this.getUserProjects();
  }

  logOut() {
    this.alertService.showLogOutAlert();
  }

  async getUserProjects() {
    this.projects = await this.projectService.getUserProjects(this.user_id)
  }
  waitFor = (ms) => new Promise(r => setTimeout(r, ms))

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }

  createProject() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        user_id: JSON.stringify(this.user_id)
      }
    };
    this.router.navigate(['/newproject'], navigationExtras);
  }

  async goProject(prj) {
    this.devices = await this.deviceService.getDevices()
    localStorage.removeItem("device_id");
    await this.asyncForEach(this.devices, async (num) => {
      await this.waitFor(50)
      if (num.project_id == prj.id) {
        localStorage.setItem("device_id", String(num.id));
      }
    })
    console.log(localStorage.getItem("device_id"))
    localStorage.setItem("project_id", String(prj.id));
    localStorage.setItem("lastPage", "Home");
    this.navCtrl.navigateRoot('/projectdetail');
  }

  goApp() {
    this.navCtrl.navigateRoot('/myapp');
  }
}




