import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User;
  
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private accountService: AccountService,
    private menuCtrl: MenuController
  ) {
    this.user = new User();
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  create() {
    this.accountService.createUser(this.user).subscribe((response) => {
      this.alertService.presentToast("Acount created..");
      this.accountService.logIn();
      this.navCtrl.navigateRoot('/login');
    })
  }
  cancel() {
    this.navCtrl.navigateRoot('/app');
  }

}
