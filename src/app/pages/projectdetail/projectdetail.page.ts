import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { NavController, MenuController, NavParams } from '@ionic/angular';
import { PropertiesService } from 'src/app/services/properties.service';
import { Properties } from 'src/app/models/properties';
import { DataService } from 'src/app/services/data.service';
import { Data } from 'src/app/models/data';
import { Chart } from 'chart.js';
import { DetailService } from 'src/app/services/detail.service';
import { Detail } from 'src/app/models/detail'

@Component({
  selector: 'app-projectdetail',
  templateUrl: './projectdetail.page.html',
  styleUrls: ['./projectdetail.page.scss'],
  providers: [NavParams]
})
export class ProjectdetailPage implements OnInit {
  @ViewChild("lineCanvas", { static: false }) lineCanvas: ElementRef;

  user_id: number;
  prj_id: number;
  details: Detail[];
  labels: string[] = [];
  chart_data: number[] = [];
  private lineChart: Chart;

  property_data: Properties[];
  public project_prop: Array<number> = []

  variable_data: Data[];
  public project_var: Array<number> = []

  constructor(
    private alertService: AlertService,
    private navCtrl: NavController,
    public navParams: NavParams,
    private menuCtrl: MenuController,
    private detailService: DetailService,
    private dataService: DataService,
    private propertiesService: PropertiesService) {

    this.user_id = Number(localStorage.getItem("user_id"));
    this.prj_id = Number(localStorage.getItem("project_id"));
    console.log("project id:" + this.prj_id)
  }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

  ionViewWillEnter() {
    this.showProjectDetail();
  }

  showProjectDetail() {
    this.detailService.getDetail(this.prj_id).subscribe((data) => {
      this.details = data
      console.log(this.details)
      for (let i = 0; i < this.details.length; i++) {
        if (this.details[i].properties_id != 0) { //property
          this.project_prop.push(this.details[i].properties_id)
          for (let j = 0; j < this.project_prop.length; j++) {
            this.propertiesService.getPropertywithId(this.project_prop[j]).subscribe((veri) => {
              this.property_data = veri
            });
          }
        }
        if (this.details[i].properties_id == 0) { //variable
          this.project_var.push(this.details[i].variable_id)
          console.log(this.project_var)
        }
      }
      for (let i = 0; i < this.project_var.length; i++) {
        this.drawChart(Number(this.project_var[i]))
      }
    });
  }

  drawChart(var_id) {
    this.dataService.getVariableData(var_id).subscribe((data) => {
      this.variable_data = data;
      console.log(this.variable_data)
      for (let j = 0; j < this.variable_data.length; j++) {
        this.labels[j] = String(this.variable_data[j].created_at)
        this.chart_data[j] = Number(this.variable_data[j].value)
      }
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: "line",
        data: {
          labels: this.labels,
          datasets: [
            {
              label: "Device Data",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.chart_data,
              spanGaps: false
            }
          ]
        }
      });
    });
  }

  /* DRAW CHART ESKI 
      for (let j = 0; j < project_var.length; j++) {
        this.dataService.getVariableData(project_var[j]).subscribe((data) => {
          this.variable_data = data;
          console.log(this.variable_data)
          for (let k = 0; k < this.variable_data.length; k++) {
            this.labels[k] = String(this.variable_data[k].created_at)
            this.chart_data[k] = Number(this.variable_data[k].value)
          }
          console.log(this.labels)
          console.log(this.chart_data)
          this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: "line",
            data: {
              labels: this.labels,
              datasets: [
                {
                  label: "Device Data",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: "butt",
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: "miter",
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: this.chart_data,
                  spanGaps: false
                }
              ]
            }
          });
    
        })
      }*/

  logOut() {
    this.alertService.showLogOutAlert();
  }
  cancel() {
    this.navCtrl.navigateForward('/home');
  }
}
