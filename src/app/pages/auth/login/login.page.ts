import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { User } from './../../../models/user'
import { AccountService } from 'src/app/services/account.service';
import { NavController, MenuController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User;
  check_user: User[]
  user_id: number;

  constructor(
    private accountService: AccountService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private router: Router,
    private menuCtrl: MenuController
  ) {
    this.user = new User();
  }

  ngOnInit() { 
    this.menuCtrl.enable(false);

  }

  login(user) {
    this.accountService.getUser(this.user).subscribe(data => {
      this.check_user = data;
      if (this.check_user.length == 0) {
        this.alertService.presentToast("This user not found!");
      } else {
        this.accountService.logIn();
        this.user_id = this.check_user[0].id
        localStorage.setItem("user_id", String(this.user_id))
       this.navCtrl.navigateRoot('/home');
      }
    })
  }

  cancel() {
    this.navCtrl.navigateRoot('/app');
  }
}
