import { Component, OnInit, ɵLocaleDataIndex } from '@angular/core';
import { Platform, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DeviceService } from './services/device.service';
import { Router, NavigationExtras } from '@angular/router';
import { Widget } from './models/widget';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [DeviceService, NavParams]
})
export class AppComponent implements OnInit {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {

  }

  selectLed(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        widget: JSON.stringify(1)
      }
    };
    this.router.navigate(['widget'], navigationExtras);
  }

  selectGraph(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        widget: JSON.stringify(2)
      }
    };
    this.router.navigate(['widget'], navigationExtras);
}

}