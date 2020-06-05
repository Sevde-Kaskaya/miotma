import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { NavController, MenuController, NavParams } from '@ionic/angular';
import { Detail } from 'src/app/models/detail';
import { Project } from 'src/app/models/project';
import { PropertiesService } from 'src/app/services/properties.service';
import { Properties } from 'src/app/models/properties';
import { VariableService } from 'src/app/services/variable.service';
import { Variable } from 'src/app/models/variable';
import { DetailService } from 'src/app/services/detail.service';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.page.html',
  styleUrls: ['./widget.page.scss'],
})
export class WidgetPage implements OnInit {

  user_id: number;
  prj_id: number;
  device_id: number;
  //projects: Project[];

  properties: Properties[];
  variables: Variable[];

  title: string;
  detail: Detail;
  data: any;
  i: number = 0;

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

    this.user_id = Number(localStorage.getItem("user_id"));
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
    this.route.queryParams.subscribe(params => {
      if (params && params.widget) {
        this.data = JSON.parse(params.widget);
      }
      if (this.data == Number(localStorage.getItem("led_id"))) { //LED
        this.title = "Property"
        this.propertiesService.getProperty(this.device_id).subscribe((data) => {
          this.properties = data;
        })
      }
      if (this.data == Number(localStorage.getItem("graphic_id"))) { //GRAPHIC
        this.title = "Variable"
        this.variableService.getVariable(this.device_id).subscribe((data) => {
          this.variables = data;
        })
      }
    });
  }

  selectProp(prop_id) {
    this.addDetail(Number(localStorage.getItem("led_id")), 0, prop_id);
    localStorage.setItem("prop_id", prop_id)
    this.router.navigate(['projectdetail']);
  }

  selectVariable(var_id) {
    this.addDetail(Number(localStorage.getItem("graphic_id")), var_id, 0);
    this.router.navigate(['projectdetail']);
  }

  addDetail(widget_id, var_id, prop_id) {
    this.detail = new Detail();
    this.detail.variable_id = var_id;
    this.detail.properties_id = prop_id;
    this.detail.widget_id = widget_id;
    this.detail.prj_id = this.prj_id; //normalde bu yok
    console.log(this.detail)

    this.detailService.createDetail(this.detail).subscribe((data) => { //DETAY TABLOSUNA DETAYI KAYDETMEK
      console.log(data)
    });

       /* PROJE TABLOSUNA DETAYI KAYDETMEK (TAM ÇALIŞMIYOR)
       this.detailService.createDetail(this.detail).subscribe((response) => {

      this.projectService.getProject(this.prj_id).subscribe((data) => {
        this.projects = data
    
        this.projects[0].detail[this.i] = response
        console.log("i: " + this.i)
        this.i = this.i+1;
        this.projectService.updateProject(this.projects[0]).subscribe((data) => {
          console.log(data)
        })
  
      });
    })
*/
  }

  logOut() {
    this.alertService.showLogOutAlert();
  }
  cancel() {
    this.navCtrl.navigateForward('/home');
  }
}
