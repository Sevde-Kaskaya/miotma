import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { NavController, MenuController, NavParams } from '@ionic/angular';
import { Detail } from 'src/app/models/detail';
import { PropertiesService } from 'src/app/services/properties.service';
import { Properties } from 'src/app/models/properties';
import { VariableService } from 'src/app/services/variable.service';
import { Variable } from 'src/app/models/variable';
import { DetailService } from 'src/app/services/detail.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.page.html',
  styleUrls: ['./widget.page.scss'],
})
export class WidgetPage implements OnInit {

  prj_id: number;
  device_id: number;
  title: string;
  detail: Detail;
  data: any;
  i: number = 0;

  variables: Variable[];
  properties: Properties[];
  property: Properties;
  choose_prop : number;
  choose_var: number;
  choose_color: string;
  prop:boolean = false;
  var:boolean = false;

  constructor(
    public navParams: NavParams,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private alertService: AlertService,
    private variableService: VariableService,
    private propertiesService: PropertiesService,
    private detailService: DetailService,
    private route: ActivatedRoute,
    private router: Router) {

    this.prj_id = Number(localStorage.getItem("project_id"));
    this.device_id = Number(localStorage.getItem("device_id"));

    localStorage.setItem("led_id", String(1))
    localStorage.setItem("graphic_id", String(2))

    console.log("widget page device id:" + this.device_id)
  }

  ngOnInit() {
    this.menuCtrl.enable(true)
  }

  ionViewWillEnter() {
    this.route.queryParams.subscribe(async params => {
      if (params && params.widget) {
        this.data = JSON.parse(params.widget);
      }
      if (this.data == Number(localStorage.getItem("led_id"))) { //LED
        this.var = false
        this.prop = true
        this.properties = await this.propertiesService.getProperty(this.device_id)
      }
      if (this.data == Number(localStorage.getItem("graphic_id"))) { //GRAPHIC
        this.prop = false
        this.var = true
        this.variables = await this.variableService.getVariable(this.device_id)
      }
    });
  }


  async selectProp() {
      this.property = await this.propertiesService.getPropertywithId(this.choose_prop);
    //  this.property[0].description = this.choose_color
      console.log(this.property)
    //  this.data = await this.propertiesService.updateProperty(this.property[0])
      //  console.log(this.data)
    
    this.addDetail(Number(localStorage.getItem("led_id")), 0, this.choose_prop);
    console.log("id: " + this.choose_prop + ", color: "+ this.choose_color)
    this.router.navigate(['projectdetail']);
  }

  selectVariable() {
    this.addDetail(Number(localStorage.getItem("graphic_id")), this.choose_var, 0);
    this.router.navigate(['projectdetail']);
  }

  async addDetail(widget_id, var_id, prop_id) {
    this.detail = new Detail();
    this.detail.variable_id = Number(var_id);
    this.detail.properties_id = Number(prop_id);
    this.detail.widget_id = widget_id;
    this.detail.project_id = this.prj_id;
    console.log(this.detail)
    await this.detailService.createDetail(this.detail)
  }

  logOut() {
    this.alertService.showLogOutAlert();
  }
  cancel() {
    this.navCtrl.navigateForward('/home');
  }
}
