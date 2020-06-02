import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { NavController } from '@ionic/angular';
import { MyappService } from 'src/app/services/myapp.service';
import { Myapp } from '../../models/myapp';
import { Router } from '@angular/router';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-myapp',
  templateUrl: './myapp.page.html',
  styleUrls: ['./myapp.page.scss'],
})
export class MyappPage implements OnInit {

  user_id: number;
  app: Myapp[];

  constructor(private alertService: AlertService,
    private navCtrl: NavController,
    private MyappService: MyappService,
    private router: Router,
    private transferService: TransferService) {

    this.user_id = Number(localStorage.getItem("user_id"));
  }

  ngOnInit() {
    this.appLoad();
  }

  appLoad() {
    //console.log(this.user_id)
    this.MyappService.getApps(this.user_id).subscribe((data) => {
     // console.log(data);
      this.app = data;
    })
    //console.log(this.app);
  }

  goAppDetail(app_id) {
    this.transferService.setId(app_id);
    let url = '/myappdetails/' + app_id
    this.router.navigateByUrl(url);

    /*let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(app_id)
      }
    };
    this.router.navigate(['/myappdetails'], navigationExtras);*/

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