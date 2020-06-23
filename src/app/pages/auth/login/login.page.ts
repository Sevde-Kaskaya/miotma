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
    this.accountService.getUsers().subscribe(data => {
      for(let i=0; i<data.length;i++){
      if (data[i].username == this.user.username) {
        console.log(data[i].username)
        this.accountService.logIn();
        localStorage.setItem("user_id", String(data[i].id))
        localStorage.setItem("user_token", String(data[i].access_token))
       this.navCtrl.navigateRoot('/home');
      } 
    }
    })

  }

  cancel() {
    this.navCtrl.navigateRoot('/app');
  }
}
