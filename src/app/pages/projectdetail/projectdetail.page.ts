import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { NavController, MenuController, NavParams } from '@ionic/angular';
import { PropertiesService } from 'src/app/services/properties.service';
import { Properties } from 'src/app/models/properties';
import { DataService } from 'src/app/services/data.service';
import { Data } from 'src/app/models/data';
import { Chart } from 'chart.js';
import { Detail } from 'src/app/models/detail';
import { DetailService } from 'src/app/services/detail.service';

@Component({
  selector: 'app-projectdetail',
  templateUrl: './projectdetail.page.html',
  styleUrls: ['./projectdetail.page.scss'],
  providers: [NavParams]
})
export class ProjectdetailPage implements OnInit {
  
  prj_id: number;
  details: Detail[];

  labels: Array<string> = [];
  chart_data: Array<number> = [];
  lineChart: any;

  property: Properties;

  property_data: Array<Properties> = new Array<Properties>()
  variable_data: Array<Data> = new Array<Data>()
  public project_prop: Array<number> = []
  public project_var: Array<number> = []

  constructor(
    private alertService: AlertService,
    private navCtrl: NavController,
    public navParams: NavParams,
    private menuCtrl: MenuController,
    private detailService: DetailService,
    private dataService: DataService,
    private propertiesService: PropertiesService) {

    this.prj_id = Number(localStorage.getItem("project_id"));
    console.log("project id:" + this.prj_id)

  }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

  ionViewWillEnter() {
    this.showProjectDetail();
  }

  waitFor = (ms) => new Promise(r => setTimeout(r, ms))
  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }

  name : string;
  l:number =0;
  names: string[];
  async showProjectDetail(): Promise<void> {
    this.details = await this.detailService.getDetail(this.prj_id)
    console.log(this.details)
    await this.asyncForEach(this.details, async (num) => {
      await this.waitFor(50)
      if (num.properties_id != 0) {
        this.project_prop.push(num.properties_id)
        this.property_data = new Array<Properties>();
        for (let j = 0; j < this.project_prop.length; j++) {
          await this.propertiesService.getPropertywithId(this.project_prop[j])
          .then((result) =>  {
            this.property = result[0]
            this.property_data.push(this.property)
          })
        }
      }

      if (num.variable_id != 0) {
        this.project_var.push(num.variable_id)
        this.variable_data = new Array<Data>();
        this.variable_data = await this.dataService.getVariableData(num.variable_id)
        console.log(this.variable_data)
        this.labels = new Array<string>();
        this.chart_data = new Array<number>(); 
        for (let j = 0; j < this.variable_data.length; j++) {
          this.labels[j] = this.variable_data[j].created_at
          this.chart_data[j] = Number(this.variable_data[j].value)
        }
        this.names = ["a","b"]
        var ctx = document.getElementById(this.names[this.l]) //canvas
          console.log(ctx)
          var myChart = new Chart(ctx, {
                type: "line",
                data: {
                  labels: this.labels,
                  datasets: [
                    {
                      label: "variable "+num.variable_id,
                      fill: false,
                      lineTension: 0.1,
                      backgroundColor: "rgba(75,192,192,0.4)",
                      borderColor: "rgba(75, 192,192,1)",
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
      this.l++;
    }
    })
  }
  
  async toggleColor(property) {
    property.device_id = Number(localStorage.getItem("device_id"))
    var true_color = property.description
      if( property.value === 'true') { 
       property.description = 'light'
        property.value = "false"
        await this.propertiesService.updatePropertyValue(property)
        .then((result) => console.log(result))
        
      } else {
        property.description  = 'dark'
        property.value = "true"
        await this.propertiesService.updatePropertyValue(property)
        .then((result) => console.log(result))
      }
  }
     
    logOut() {
      this.alertService.showLogOutAlert();
    }
    cancel() {
      this.navCtrl.navigateForward('/home');
    }

}
