import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { NavController, MenuController, NavParams } from '@ionic/angular';
import { PropertiesService } from 'src/app/services/properties.service';
import { Properties } from 'src/app/models/properties';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Data } from 'src/app/models/data';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-projectdetail',
  templateUrl: './projectdetail.page.html',
  styleUrls: ['./projectdetail.page.scss'],
  providers: [NavParams]
})
export class ProjectdetailPage implements OnInit {
  @ViewChild("lineCanvas",  {static: false}) lineCanvas: ElementRef;
  
  user_id: number;
  prj_id: number;
  device_id: number;
  prop_id: number;
  var_id: number;

  property_data: Properties[];
  property: Properties;

  property_id: number;

  variable_data: Data[];
  data: Data;

  data2:any;
  data3:any

  labels: string[] = [];
  chart_data:number[] =[];
  private lineChart: Chart;

  graph: boolean;
  led: boolean;

  constructor(
    private alertService: AlertService,
    private navCtrl: NavController,
    public navParams: NavParams,
    private menuCtrl: MenuController,
    private propertiesService: PropertiesService,
    private dataService: DataService,
    private route: ActivatedRoute, 
    private router: Router) {

    this.user_id = Number(localStorage.getItem("user_id"));
    this.prj_id = Number(localStorage.getItem("project_id"));
    this.device_id = Number(localStorage.getItem("device_id"));

    console.log("project id:" + this.prj_id)
    console.log("detay device id:" + this.device_id)

  }


  ngOnInit() {
    this.menuCtrl.enable(true);
  }
  
  ionViewWillEnter() {
    this.variableData()

    this.route.queryParams.subscribe(params => {
      if (params && params.prop_id) {
        this.data3 = JSON.parse(params.prop_id);
      }
      if(this.data3) {
        this.led = true
      }
      })
  }

  variableData() {
 
    this.route.queryParams.subscribe(params => {
      if (params && params.var_id) {
        this.data2 = JSON.parse(params.var_id);
      }
      
      if (this.data2 != null) {
        this.dataService.getVariableData(this.data2).subscribe((data) => {
          this.graph = true
          this.variable_data = data;
          console.log(this.variable_data)
          for(let i=0; i<this.variable_data.length; i++){
            this.labels[i] = String(this.variable_data[i].created_at)
            this.chart_data[i] = Number(this.variable_data[i].value) 
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
        })
         
      
      }
    })
  
      
  }

  logOut() {
    this.alertService.showLogOutAlert();
  }

  cancel() {
    this.navCtrl.navigateForward('/home');
  }


}
