import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { NavController } from '@ionic/angular';
import { MyappService } from 'src/app/services/myapp.service';
import { Myapp } from '../../models/myapp';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myapp',
  templateUrl: './myapp.page.html',
  styleUrls: ['./myapp.page.scss'],
})
export class MyappPage implements OnInit {

  app: Myapp[];

  constructor(private alertService: AlertService,
    private navCtrl: NavController,
    private MyappService: MyappService,
    private router: Router) {
  }

  ngOnInit() {
    this.appLoad();
  }

  appLoad() {
    this.MyappService.getApps().subscribe((data) => {
      this.app = data;
    })
  }

  goAppDetail(app_id) {
    localStorage.setItem("app_id", app_id)
    this.router.navigate(['/myappdetails']);
  }

  logOut() {
    console.log("MyAppLogOut")
    this.alertService.showLogOutAlert();
  }

  cancel() {
    this.navCtrl.navigateForward('/home');
  }

  createApp() {
    this.navCtrl.navigateForward('/createapp');
  }
}