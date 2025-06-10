import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexTooltip,
  ApexXAxis,
  ApexLegend,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexPlotOptions,
  ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: any; //ApexMarkers;
  stroke: any; //ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[];
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

export type ChartOptionsPie = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
  title: ApexTitleSubtitle
};

export type ChartOptionsTreeMap = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  colors: string[];
};

export type ChartOptionsStackBars = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
};



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions!: Partial<ChartOptions>;
  public chartOptionsPie!: Partial<ChartOptionsPie>;
  public chartOptionsTreeMap!: Partial<ChartOptionsTreeMap>;
  public chartOptionsStackBars!: Partial<ChartOptionsStackBars>;

  userInfo!: any;
  params!: any;
  perms!: any;

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router,

  ) {}

  ngOnInit(): void {

    this.authService.profileUser(this.params).subscribe(async resp=> {
      console.log(resp)
      this.userInfo = await resp.name;
      console.log(this.userInfo)
    })

    // Bar with line graph
    this.chartOptions = {
      series: [
        {
          name: "NODE MTTR",
          type: "column",
          data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6, 5.1, 6.2, 7.1, 8.2, 5.1]
        },
        {
          name: "FOC MTTR",
          type: "column",
          data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5, 9.2, 10.2, 11.3, 12.5, 8.1]
        },
        {
          name: "NET. AVA",
          type: "line",
          data: [20, 29, 37, 36, 44, 45, 50, 58, 60, 70, 80, 90, 60]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        stacked: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [1, 1, 4]
      },
      title: {
        text: "Jan - Dec 2021",
        align: "left",
        offsetX: 110
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "YTD"]
      },
      yaxis: [
        {
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#008FFB"
          },
          labels: {
            style: {
              // color: "#008FFB"
            }
          },
          title: {
            text: "NODE MTTR",
            style: {
              color: "#008FFB"
            }
          },
          tooltip: {
            enabled: true
          }
        },
        {
          seriesName: "Income",
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#00E396"
          },
          labels: {
            style: {
              // color: "#00E396"
            }
          },
          title: {
            text: "FOC MTTR",
            style: {
              color: "#00E396"
            }
          }
        },
        {
          seriesName: "Revenue",
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#FEB019"
          },
          labels: {
            style: {
              // color: "#FEB019"
            }
          },
          title: {
            text: "NET AVA",
            style: {
              color: "#FEB019"
            }
          }
        }
      ],
      tooltip: {
        fixed: {
          enabled: false,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        }
      },
      legend: {
        horizontalAlign: "center",
        // offsetX: 40
      }
    };


    this.chartOptionsPie = {
      series: [44, 55, 13, 43, 22, 30],
      chart: {
        type: "donut",
        height: 350,
      },
      labels: ["NL", "NEMM", "SWMM", "SL", "VIS", "MIN"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
              
            },
            // legend: {
            //   position: "bottom"
            // },
            // legend: {
            //   position: "bottom",
            //   horizontalAlign: "left",
            //   offsetX: 40
            // }
          }
        }
      ],
        legend: {
          position: "bottom",
          horizontalAlign: "left",
          offsetX: 40
      },
      title: {
        text: "Sites per Region",
        align: "center"
      }
        
    };


    this.chartOptionsTreeMap = {
      series: [
        {
          name: "NL",
          data: [
            {
              x: "Battery",
              y: 10
            },
            {
              x: "Rectifier",
              y: 60
            },
            {
              x: "ACU",
              y: 41
            },
            {
              x: "Genset",
              y: 41
            }
          ]
        },
        {
          name: "NEMM",
          data: [
            {
              x: "Battery",
              y: 10
            },
            {
              x: "Rectifier",
              y: 60
            },
            {
              x: "ACU",
              y: 41
            },
            {
              x: "Genset",
              y: 41
            }
          ]
        },
        {
          name: "SWMM",
          data: [
            {
              x: "Battery",
              y: 10
            },
            {
              x: "Rectifier",
              y: 60
            },
            {
              x: "ACU",
              y: 41
            },
            {
              x: "Genset",
              y: 41
            }
          ]
        },
        {
          name: "SL",
          data: [
            {
              x: "Battery",
              y: 10
            },
            {
              x: "Rectifier",
              y: 60
            },
            {
              x: "ACU",
              y: 41
            },
            {
              x: "Genset",
              y: 41
            }
          ]
        },
        {
          name: "VIS",
          data: [
            {
              x: "Battery",
              y: 10
            },
            {
              x: "Rectifier",
              y: 60
            },
            {
              x: "ACU",
              y: 41
            },
            {
              x: "Genset",
              y: 41
            }
          ]
        },
        {
          name: "MIN",
          data: [
            {
              x: "Battery",
              y: 10
            },
            {
              x: "Rectifier",
              y: 60
            },
            {
              x: "ACU",
              y: 41
            },
            {
              x: "Genset",
              y: 41
            }
          ]
        }

      ],

      legend: {
        show: true
      },
      chart: {
        height: 350,
        type: "treemap",
      },
      title: {
        text: "SF per Region",
        align: "center"
      }
    };

    this.chartOptionsStackBars = {
      series: [
        {
          name: "CO PureCore",
          data: [44, 55, 41, 37, 22, 43, 21]
        },
        {
          name: "CO Mixed",
          data: [53, 32, 33, 52, 13, 43, 32]
        },
        {
          name: "NPOB",
          data: [12, 17, 11, 9, 15, 11, 20]
        },
        {
          name: "CS",
          data: [9, 7, 5, 8, 6, 9, 4]
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        stackType: "100%"
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },
      title: {
        text: "Site Type per Region",
        align: "center"
      },
      xaxis: {
        categories: ["NL", "NEMM", "SWMM", "SL", "VIS", "MIN"]
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val + "K";
          }
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: "bottom",
        horizontalAlign: "left",
        offsetX: 40
      }
    };


  }

}
