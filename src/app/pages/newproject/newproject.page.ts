import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { MenuController } from '@ionic/angular';
import { DeviceService } from 'src/app/services/device.service';
import { Device } from 'src/app/models/device';

@Component({
  selector: 'app-newproject',
  templateUrl: './newproject.page.html',
  styleUrls: ['./newproject.page.scss'],
})
export class NewprojectPage implements OnInit {

  devices: Device[];
  enable_devices: Array<Device> = [];
  project: Project;
  user_id: number;
  choosen_device: number;
  all_devices: Device[];
  device: Device;

  constructor(
    private navCtrl: NavController,
    private projectService: ProjectService,
    private alertService: AlertService,
    private menuCtrl: MenuController,
    private deviceService: DeviceService
  ) {
    this.project = new Project();
    this.device = new Device();
    this.user_id = Number(localStorage.getItem("user_id"));

  }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.getDevices();
  }

  logOut() {
    this.alertService.showLogOutAlert();

  }

  waitFor = (ms) => new Promise(r => setTimeout(r, ms))
  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }

  async createProject() {
    this.project.user_id = this.user_id
    await this.projectService.createProject(this.project).then(async (response) => {
      this.alertService.presentToast("Project created..");
      this.projectService.created();
      this.setProjectToDevice(response.id);
    })

    this.navCtrl.navigateRoot('/home');
  }

  async setProjectToDevice(prj_id) {
    this.all_devices = await this.deviceService.getDevices();
    await this.asyncForEach(this.all_devices, async (num) => {
      await this.waitFor(50)
      if (num.id == this.choosen_device) {
        this.device.id = num.id
        this.device.name = num.name
        this.device.description = num.description
        this.device.api = num.api
        this.device.project_id = prj_id
        this.device.type_id = num.type_id
        await this.deviceService.updateDevice(this.device);
      }
    })
  }


  async getDevices() {
    console.log("get devices")
    this.devices = await this.deviceService.getDevices();
    await this.asyncForEach(this.devices, async (num) => {
      await this.waitFor(50)
      if (num.project_id == 0) {
        console.log("prj yok")
        this.enable_devices.push(num);
      }
    })
  }

  cancel() {
    this.navCtrl.navigateRoot('/home');
  }



}



