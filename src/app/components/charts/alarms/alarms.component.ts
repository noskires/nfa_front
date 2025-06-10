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

export type ChartOptionsStackArea = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  colors: string[];
  legend: ApexLegend;
  fill: ApexFill;
};

export type ChartOptionsRadialBar = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};

export type ChartOptionsSpline = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
};

export type ChartOptionsPie = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
  title: ApexTitleSubtitle
};

export type ChartOptionsMultipleRadialBar = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-alarms',
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.css']
})
export class AlarmsComponent implements OnInit {


  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions!: Partial<ChartOptions>;
  public chartOptionsStackArea!: Partial<ChartOptionsStackArea>;
  public chartOptionsRadialBar!: Partial<ChartOptionsRadialBar>;
  public chartOptionsSpline!: Partial<ChartOptionsSpline>;
  public chartOptionsPie!: Partial<ChartOptionsPie>;
  public chartOptionsMultipleRadialBar!: Partial<ChartOptionsMultipleRadialBar>;
  
  userInfo!: any;
  params!: any;
  perms!: any;

  colorsDonut: any[] = ["#4CAF50", "#008FFB", "#FEB019", "#546E7A", "#662E9B", "#4CAF50"];
  regions: any[] = ["NL", "NEMM", "SWMM", "SL", "VIS", "MIN"];

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
          name: "LIB",
          type: "column",
          data: [90, 120, 1920, 200, 250, 120]
        },
        {
          name: "VRLA",
          type: "column",
          data: [10, 15, 34, 14, 33, 20]
        },
        {
          name: "EOx",
          type: "line",
          data: [15, 20, 45, 14, 27, 24]
        }
      ],
      chart: {
        height: 260,
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
        // text: "Jan - Dec 2025",
        align: "left",
        offsetX: 110
      },
      xaxis: {
        categories: this.regions
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
            text: "LITHIUM",
            style: {
              color: "#008FFB"
            }
          },
          tooltip: {
            enabled: true
          }
        },
        {
          seriesName: "",
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
            text: "VRLA",
            style: {
              color: "#00E396"
            }
          }
        },
        {
          seriesName: "",
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
            text: "EOx",
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

    // RadialBar
    this.chartOptionsRadialBar = {
      series: [30],
      chart: {
        height: 220,
        type: "radialBar",
        toolbar: {
          // show: true
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#fff",
            // background: "#4CAF50",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: 0,
              show: true,
              color: "#888",
              fontSize: "14px"
            },
            value: {
              formatter: function(val) {
                return parseInt(val.toString(), 10).toString();
              },
              offsetY: 0,
              color: "#111",
              fontSize: "15px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        // colors:["#FF4560"],
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["Affected Sites"]
    };

    // this.chartOptionsRadialBar = {
    //   series: [30],
    //   chart: {
    //     height: 250,
    //     type: "radialBar",
    //     toolbar: {
    //       show: true
    //     }
    //   },
    //   plotOptions: {
    //     radialBar: {
    //       startAngle: -135,
    //       endAngle: 225,
    //       hollow: {
    //         margin: 0,
    //         // size: "70%",
    //         background: "transparent",
    //         image: undefined,
    //         position: "front",
    //         dropShadow: {
    //           enabled: true,
    //           top: 0,
    //           left: 0,
    //           blur: 3,
    //           opacity: 0.5
    //         }
    //       },
    //       track: {
    //         show: true,
    //         startAngle: undefined,
    //         endAngle: undefined,
    //         strokeWidth: '97%',
    //         // background: "#4CAF50",
    //         // strokeWidth: "67%",
    //         opacity: 1,
    //         margin: 5, // margin is in pixels
    //         dropShadow: {
    //           enabled: false,
    //           top: 0,
    //           left: 0,
    //           blur: 3,
    //           opacity: 0.5
    //         }
    //       },
    //       dataLabels: {
    //         name: {
    //           fontSize: '14px',
    //           color: "#6B778D",
    //         },
    //         value: {
    //           offsetY: 0,
    //           fontSize: '10px',
    //           color: "#111",
    //         }
    //       }

    //       // dataLabels: {
    //       //   show: true,
    //       //   name: {
    //       //     offsetY: -10,
    //       //     show: true,
    //       //     color: "#888",
    //       //     fontSize: "17px"
    //       //   },
    //       //   value: {
    //       //     formatter: function(val) {
    //       //       return parseInt(val.toString(), 10).toString();
    //       //     },
    //       //     color: "#111",
    //       //     fontSize: "36px",
    //       //     show: true
    //       //   }
    //       // }
    //     }
    //   },
    //   fill: {
    //     type: 'gradient',
    //     colors:["#FF4560"],
    //     gradient: {
    //       shade: 'dark',
    //       type: "horizontal",
    //       shadeIntensity: 0.5,
    //       // gradientToColors: ['#F1959B'], // optional, if not defined - uses the shades of same color in series
    //       inverseColors: true,
    //       opacityFrom: 1,
    //       opacityTo: 1,
    //       stops: [20, 100, 200],
    //       // colorStops: []
    //     }
    //   },
    //   // fill: {
    //   //   type: "gradient",
    //   //   // colors:["#FF4560"],
    //   //   gradient: {
    //   //     shade: "dark",
    //   //     type: "horizontal",
    //   //     shadeIntensity: 0.5,
    //   //     gradientToColors: ["#ABE5A1"],
    //   //     inverseColors: true,
    //   //     opacityFrom: 1,
    //   //     opacityTo: 1,
    //   //     stops: [0, 100]
    //   //   }
    //   // },
    //   // stroke: {
    //   //   lineCap: "round"
    //   // },
    //   labels: ["Affected Sites"]
    // };

    // Spline
    this.chartOptionsSpline = {
      series: [
        {
          name: "NL",
          data: [31, 40, 28, 51, 42, 109, 100, 20, 31, 38, 18, 73]
        },
        {
          name: "NEMM",
          data: [11, 32, 45, 32, 34, 52, 41, 28, 51, 42, 109, 100]
        },
        {
          name: "SWMM",
          data: [45, 22, 35, 22, 44, 72, 31, 58, 51, 72, 76, 34]
        },
        {
          name: "SL",
          data: [31, 42, 55, 12, 24, 32, 21, 56, 5, 22, 33, 22]
        },
        {
          name: "VIS",
          data: [51, 72, 25, 12, 14, 22, 31, 58, 11, 22, 66, 20]
        },
        {
          name: "MIN",
          data: [11, 32, 1, 20, 9, 8, 8, 6, 2, 5, 42, 41]
        }
      ],
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        // type: "datetime",
        categories: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC",
        ]
      },
      // tooltip: {
      //   x: {
      //     // format: "dd/MM/yy HH:mm"
      //   }
      // }
      title: {
        text: "Forcasted EOx - Year 2025",
        align: "center"
      }
    };

    // PIE
    this.chartOptionsPie = {
      series: [44, 55, 80, 23],
      chart: {
        type: "donut",
        height: 250,
      },
      labels: ["CO PureCore", "CO Mixed", "NPOB", "CS"],
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
          show: false,
          position: "bottom",
          horizontalAlign: "left",
          offsetX: 40
      },
      title: {
        text: "EOx Per Site Type",
        align: "center"
      }
        
    };

    // Multiple radial Bar
    this.chartOptionsMultipleRadialBar = {
      series: [20, 45],
      chart: {
        height: 315,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px"
            },
            value: {
              fontSize: "16px"
            },
            total: {
              show: true,
              label: "Total Affected Sites",
              formatter: function(w) {
                return "65";
              }
            }
          }
        }
      },
      labels: ["LIB", "VRLA"]
    };

  }

  
}

