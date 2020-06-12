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
  @ViewChild("lineCanvas", { static: false }) lineCanvas: ElementRef;

  user_id: number;
  prj_id: number;
  details: Detail[];

  labels: Array<string> = [];
  chart_data: Array<number> = [];
  private lineChart: Chart;

  property_data: Properties;
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
    this.detailService.getDetail2(this.prj_id).subscribe((data) => {
      this.details = data
      console.log(this.details)
      for (let i = 0; i < this.details.length; i++) {
        if (this.details[i].properties_id != 0) { //property
          this.project_prop.push(this.details[i].properties_id)
          for (let j = 0; j < this.project_prop.length; j++) {
            this.propertiesService.getPropertywithId2(this.project_prop[j]).subscribe((veri) => {
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
    // this.variable_data = await this.dataService.getVariableData(var_id)
    // console.log(this.variable_data)
    this.dataService.getVariableData2(var_id).subscribe((data) => {
      this.variable_data = data
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

  logOut() {
    this.alertService.showLogOutAlert();
  }
  cancel() {
    this.navCtrl.navigateForward('/home');
  }
  /*-------------------------------------------------------------------------

   property_data: Array<Properties> = new Array<Properties>()
    draw(label,cdata){
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
              type: "line",
              data: {
                labels: label,
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
                    data: cdata,
                    spanGaps: false
                  }
                ]
              }
            });
   
    }
     
    delay(milliseconds: number, count: number): Promise<number> {
      return new Promise<number>(resolve => {
        setTimeout(() => {
          resolve(count);
        }, milliseconds);
      });
    }
  
    waitFor = (ms) => new Promise(r => setTimeout(r, ms))
    async asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
      }
    }
  
    async showProjectDetail(): Promise<void> {
  
      this.details = await this.detailService.getDetail(this.prj_id)
      console.log(this.details)
  
      await this.asyncForEach(this.details, async (num) => {
        await this.waitFor(50)
        if (num.properties_id != 0) {
          console.log("prop")
          await this.propertiesService.getPropertywithId(Number(num.properties_id))
            .then((result) => this.property_data.push(result))
          await console.log(this.property_data)
        }
  
        if (num.variable_id != 0) {
          console.log("var")
          console.log(num.variable_id)
          this.variable_data = await this.dataService.getVariableData(num.variable_id)
          console.log(this.variable_data)
          this.project_var.push(num.variable_id)
          this.labels = new Array<string>();
          this.chart_data = new Array<number>(); 
          await this.asyncForEach(this.variable_data, async (num2) => {
            this.labels.push(num2.created_at)
            this.chart_data.push(num2.value)
          })
    
          this.a.push(this.labels)
          this.b.push(this.chart_data)
          
        /*  for(let i=0; i<2; i++){
            console.log(this.a[i])
            console.log(this.b[i])
            this.draw(this.a[i],this.b[i])
          }
        }
      })
    }
  
    --------------------------------------------------------*/

}
