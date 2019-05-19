import { Component, OnInit } from '@angular/core';
import { colorSets } from '@swimlane/ngx-charts/release/utils/color-sets';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { listUrlAPI } from '../../listUrlAPI';
import { UrlAPIEntity } from '../../UrlAPIEntity';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {JWTHeaderService} from '../../jwtheader.service';
// import {
//   IBarChartOptions,
//   IChartistAnimationOptions,
//   IChartistData
// } from 'chartist';
// import { ChartEvent, ChartType } from 'ng-chartist';
// import { Chart } from 'src/app/charts/chartist-js/chartistjs.component';



export class dataForChart{
  name: string;
  value: number;
};

@Component({
  selector: 'app-order-chart',
  templateUrl: './order-chart.component.html',
  styleUrls: ['./order-chart.component.css']
})
export class OrderChartComponent implements OnInit {

  // dataChart =   {
  //
  //     "Line": {
  //         "labels": [
  //           1,
  //           2,
  //           3,
  //           4,
  //           5,
  //           6,
  //           7
  //         ],
  //         "series": [
  //               [
  //                 24.5,
  //                 28.3,
  //                 42.7,
  //                 32,
  //                 34.9,
  //                 48.6,
  //                 40
  //               ],
  //               [
  //                 8.9,
  //                 5.8,
  //                 21.9,
  //                 5.8,
  //                 16.5,
  //                 6.5,
  //                 14.5
  //               ]
  //         ]
  //     }
  // };
  //
  // lineChart: Chart = {
  //     type: 'Bar',
  //     data: this.dataChart['Line'],
  //     options: {
  //         low: 0,
  //         high: 48,
  //         showArea: true,
  //         fullWidth: true,
  //         axisY: {
  //             onlyInteger: true,
  //             scaleMinSpace: 40,
  //             offset: 20,
  //             labelInterpolationFnc: function (value) {
  //                 return (value / 10) + 'k';
  //             }
  //         }
  //     }
  // };

  public config: PerfectScrollbarConfigInterface = {};

  //single: any[];
  dateData: any[];
  dateDataWithRange: any[];
  range = false;
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  tooltipDisabled = false;
  xAxisLabel = 'Region';
  showYAxisLabel = true;
  yAxisLabel = 'Sales';
  showGridLines = true;
  innerPadding = 0;
  autoScale = true;
  timeline = false;
  barPadding = 5;
  groupPadding = 0;
  roundDomains = false;
  maxRadius = 10;
  minRadius = 3;
  view = '';
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  arcWidth = 0.25;
  rangeFillOpacity = 0.15;

  colorScheme = {
      domain: ['#4fc3f7', '#fb8c00', '#7460ee', '#fa5838', '#5ac146', '#137eff']
  };
  schemeType = 'ordinal';

  single = [
        {
          name: 'Germany',
          value: 40
        },
        {
          name: 'USA',
          value: 24
        },
        {
          name: 'France',
          value: 36
        },
        {
          name: 'India',
          value: 36
        },
        {
          name: 'Spain',
          value: 33
        },
        {
          name: 'Italy',
          value: 35
        }
  ];


  listTotalQtyByProduct: [][] ; //du lieu tra ve la mang 2 chieu gom nhieu cap [proID, total] vi du: [[1,22],[2,9],[3,14]]
  listDataForChart: dataForChart[] = [];
  urlAPI: UrlAPIEntity;
  logClass = '--Order Chart Component: ';
  isShowChart: boolean = false;


  constructor(
    private http: HttpClient,
    private jwtService: JWTHeaderService
  ) { }

  ngOnInit() {
    this.getTotalQtyByProduct();
  }

  test():void{
    console.log(this.logClass + ' data 4 Chart: ' + JSON.stringify(this.listDataForChart));
    console.log(this.logClass + ' single' + JSON.stringify(this.single));
  }

  getTotalQtyByProduct(): void{
    //prepare Url
    this.urlAPI = listUrlAPI.find(url => url.name === 'orderDetailResource');
    console.log(this.logClass + this.urlAPI.path);

    //prepare headers
    let headers = this.createHeader();

    this.http.get<any[]>(this.urlAPI.path + '/Report/TotalQtyByProduct', {headers : headers})
      .subscribe(
          response => {
                    console.log(this.logClass + 'Report Reponse from server: ' + JSON.stringify(response));
                    this.listTotalQtyByProduct = JSON.parse(JSON.stringify(response));

                    this.listTotalQtyByProduct.forEach(
                      item => {
                            let tempData = new Array(2);
                            tempData = JSON.parse(JSON.stringify(item));
                            
                            let tempData4Chart: dataForChart = new dataForChart();
                            tempData4Chart.name = tempData[0];
                            tempData4Chart.value = tempData[1];
                            this.listDataForChart.push(tempData4Chart);
                      }
                    );

                    this.test();
                    this.isShowChart = true;

          }
      );
  }

  createHeader():HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Authorization', 'Bearer ' + this.jwtService.getJWT());
    return headers;
  }

}
