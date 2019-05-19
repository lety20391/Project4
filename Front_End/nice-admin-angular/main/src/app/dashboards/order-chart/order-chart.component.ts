import { Component, OnInit } from '@angular/core';
import { colorSets } from '@swimlane/ngx-charts/release/utils/color-sets';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
// import {
//   IBarChartOptions,
//   IChartistAnimationOptions,
//   IChartistData
// } from 'chartist';
// import { ChartEvent, ChartType } from 'ng-chartist';
// import { Chart } from 'src/app/charts/chartist-js/chartistjs.component';



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




  constructor() { }

  ngOnInit() {
  }

}
