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
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.page.html',
  styleUrls: ['./widget.page.scss'],
})
export class WidgetPage implements OnInit {

  property: Properties;
  properties: Properties[];
  projects: Project[];
  prj: Project;

  user_id: number;
  prj_id: number;
  device_id: number;
  widget: number;
  var: boolean = false;
  prop: boolean = false;
  variables: Variable[];

  properties_id: number;
  title: string;
  a: number;
  b: number;

  sDetail: Detail;
  strDetail: string;
  detail: Detail;
  var_id: number;

  data: any;

  constructor(
    public navParams: NavParams,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private alertService: AlertService,
    private variableService: VariableService,
    private propertiesService: PropertiesService,
    private detailService: DetailService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router) {

    this.detail = new Detail();
    this.user_id = Number(localStorage.getItem("user_id"));
    this.prj_id = Number(localStorage.getItem("project_id"));
    this.device_id = Number(localStorage.getItem("device_id"));

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

      if (this.data == 1) {
        this.title = "Property"
        this.propertiesService.getProperty(this.device_id).subscribe((data) => {
          this.properties = data;
        })
      }
      if (this.data == 2) {
        this.title = "Variable"
        this.variableService.getVariable(this.device_id).subscribe((data) => {
          this.variables = data;
        })
      }
    });
  }

  selectProp(prop_id) {
    this.properties_id = prop_id

    this.projectService.getProject(this.prj_id).subscribe((data) => {
      this.projects = data

      this.detail.device_id = this.device_id;
      //this.detail.id = 2;
      this.detail.properties_id = prop_id;
      this.detail.widget_id = 1;

      this.strDetail = JSON.stringify(this.detail)
      this.projects[0].detail = this.strDetail

      this.projectService.updateProject(this.prj_id, this.projects[0]).subscribe((data) => {
        console.log(data)
      })

    });

    let navigationExtras: NavigationExtras = {
      queryParams: {
        prop_id: JSON.stringify(prop_id)
      }
    };
    this.router.navigate(['projectdetail'], navigationExtras);
  }

  selectVariable(var_id) {
    this.var_id = var_id
    console.log("selected variable id= " + var_id)

    let navigationExtras: NavigationExtras = {
      queryParams: {
        var_id: JSON.stringify(var_id)
      }
    };
    this.router.navigate(['projectdetail'], navigationExtras);
  }

  logOut() {
    this.alertService.showLogOutAlert();
  }

  cancel() {
    this.navCtrl.navigateForward('/home');
  }


}
