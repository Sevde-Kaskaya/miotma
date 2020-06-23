import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { ActivatedRoute } from '@angular/router';
import { Myapp } from 'src/app/models/myapp';
import { MyappService } from 'src/app/services/myapp.service';
import { Appprojects } from 'src/app/models/appprojects';
import { DeviceService } from 'src/app/services/device.service';
import {Device} from 'src/app/models/device'

@Component({
  selector: 'app-myappdetails',
  templateUrl: './myappdetails.page.html',
  styleUrls: ['./myappdetails.page.scss'],
})
export class MyappdetailsPage implements OnInit {

  my_app: Myapp;
  app_id: number;
  projects: Project[];
  devices:Device[];

  constructor(private navCtrl: NavController,
    private route: ActivatedRoute,
    private myAppService: MyappService,
    private devicesService: DeviceService) {

    this.my_app = new Myapp();
   /* this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.app_id = JSON.parse(params.special);
      }
    });*/
    this.app_id = Number(localStorage.getItem("app_id"))
  }
  ngOnInit() {  }

  ionViewWillEnter() {   
    this.getMyAppDetail();
  }
 
  async getMyAppDetail() : Promise<void> {
    this.my_app = await this.myAppService.getAppToAppID(this.app_id);
    this.projects = await this.myAppService.getAppProjects(this.app_id)
  }
  
  async getProjectDetails(project){
    this.devices = await this.devicesService.getDevices()
    localStorage.removeItem("device_id");
    await this.asyncForEach(this.devices, async (num) => {
      await this.waitFor(50)
      if (num.project_id == project.id) {
        localStorage.setItem("device_id",  String(num.id));
      }
    })
    localStorage.setItem("project_id", String(project.id));
    localStorage.setItem("lastPage","AppDetail");
    this.navCtrl.navigateRoot('/projectdetail');

  }

  waitFor = (ms) => new Promise(r => setTimeout(r, ms))

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }

  cancel() {
    this.navCtrl.navigateForward('/myapp');
  }
}
