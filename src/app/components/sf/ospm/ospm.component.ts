import { Component, ViewChild, OnInit } from "@angular/core";
import { Router } from '@angular/router';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: any; // ApexStroke;
  dataLabels: any; // ApexDataLabels;
  fill: ApexFill;
  tooltip: ApexTooltip;

};

export type ChartOptionsBar = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

export type ChartOptionsDonut = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-ospm',
  templateUrl: './ospm.component.html',
  styleUrls: ['./ospm.component.css']
})

export class OspmComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions>;
  public chartOptionsFibercom: Partial<ChartOptions>;
  public chartOptionsNEMM: Partial<ChartOptions>;
  public chartOptionsSWMM: Partial<ChartOptions>;
  public chartOptionsNL: Partial<ChartOptions>;
  public chartOptionsSL: Partial<ChartOptions>;
  public chartOptionsVIS: Partial<ChartOptions>;
  public chartOptionsMIN: Partial<ChartOptions>;

  public chartOptionsNemmBar: Partial<ChartOptionsBar>;
  public chartOptionsNemmDonut: Partial<ChartOptionsDonut>;
  
  public nemmText!: any;
  public swmmText!: any;
  public nlText!: any;
  public slText!: any;
  public visText!: any;
  public minText!: any;
  public value!: any;

  
  
  constructor(private router: Router) {

    
    

    this.chartOptions = {
      series: [
        {
          name: "TT",
          type: "column",
          data: [1960, 2012, 2162, 2024, 1500]
        },
        // {
        //   name: "TT",
        //   type: "column",
        //   data: [1960, 2012, 2162, 224]
        // },
        {
          name: "MTTR",
          type: "line",
          data: [10.73, 10.57, 9.76, 9.46, 7.20]
        }
        // {
        //   name: "MTTR",
        //   type: "line",
        //   data: [10.73, 10.57, 9.76, 9.46]
        // }
      ],
      chart: {
        height: 350,
        type: "line",
        toolbar: {
          show: false // This line disables the toolbar
        }
      },
      stroke: {
        width: [0, 4]
      },
      title: {
        text: "UTech Performance"
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        // "Jun",
        // "Jul",
        // "Aug",
        // "Sep",
        // "Oct",
        // "Nov",
        // "Dec",
        "YTD",
      ],
      // labels: [
      //   "Jan",
      //   "Feb",
      //   "Mar",
      //   "Apr",
      //   // "YTD",
      // ],
      xaxis: {
        // type: "datetime"
      },
      yaxis: [
        {
          title: {
            text: "Work Order"
          }
        },
        {
          opposite: true,
          title: {
            text: "MTTR"
          }
        }
      ]
    };

    this.chartOptionsFibercom = {
      series: [
        // {
        //   name: "TT",
        //   type: "column",
        //   data: [1960, 2012, 2162, 224, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        // },
        {
          name: "TT",
          type: "column",
          data: [1500, 1400, 1600, 1200, 1351]
        },
        // {
        //   name: "MTTR",
        //   type: "line",
        //   data: [10.73, 10.57, 9.76, 9.46, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        // }
        {
          name: "MTTR",
          type: "line",
          data: [9.73, 8.57, 7.76, 8.46, 7.82]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        toolbar: {
          show: false // This line disables the toolbar
        }
      },
      stroke: {
        width: [0, 4]
      },
      title: {
        text: "Fibercom Performance"
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      // labels: [
      //   "Jan",
      //   "Feb",
      //   "Mar",
      //   "Apr",
      //   "May",
      //   "Jun",
      //   "Jul",
      //   "Aug",
      //   "Sep",
      //   "Oct",
      //   "Nov",
      //   "Dec",
      //   "YTD",

      // ],
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        // "YTD",
      ],
      xaxis: {
        // type: "datetime"
      },
      yaxis: [
        {
          title: {
            text: "Work Order"
          }
        },
        {
          opposite: true,
          title: {
            text: "MTTR"
          }
        }
      ]
    };

    this.chartOptionsNEMM = {
      series: [
        {
          name: "TT",
          type: "column",
          // data: [628, 673, 798, 145, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          data: [628, 673, 798, 145]
        },
        {
          name: "MTTR",
          type: "line",
          // data: [9.27, 10.76, 9.88, 8.90, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          data: [9.27, 10.76, 9.88, 8.90]
        }
      ],
      chart: {
        height: 204,
        type: "line",
        toolbar: {
          show: false // This line disables the toolbar
        }
      },
      stroke: {
        width: [0, 4]
      },
      title: {
        text: "NEMM Performance"
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        "YTD",
      ],
    
      xaxis: {
        // type: "datetime"
      },
      yaxis: [
        {
          title: {
            // text: "Work Order"
          }
        },
        {
          opposite: true,
          title: {
            // text: "MTTR"
          }
        }
      ]
    };

    this.chartOptionsSWMM = {
      series: [
        // {
        //   name: "TT",
        //   type: "column",
        //   data: [1960, 2012, 2162, 224, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        // },
        {
          name: "TT",
          type: "column",
          data: [1500, 1400, 1600, 1200]
        },
        // {
        //   name: "MTTR",
        //   type: "line",
        //   data: [10.73, 10.57, 9.76, 9.46, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        // }
        {
          name: "MTTR",
          type: "line",
          data: [9.73, 8.57, 7.76, 8.46]
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      stroke: {
        width: [0, 4]
      },
      title: {
        text: "SWMM Performance"
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      // labels: [
      //   "Jan",
      //   "Feb",
      //   "Mar",
      //   "Apr",
      //   "May",
      //   "Jun",
      //   "Jul",
      //   "Aug",
      //   "Sep",
      //   "Oct",
      //   "Nov",
      //   "Dec",
      //   "YTD",

      // ],
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        // "YTD",
      ],
      xaxis: {
        // type: "datetime"
      },
      yaxis: [
        {
          title: {
            text: "Work Order"
          }
        },
        {
          opposite: true,
          title: {
            text: "MTTR"
          }
        }
      ]
    };

    this.chartOptionsNL = {
      series: [
        // {
        //   name: "TT",
        //   type: "column",
        //   data: [1960, 2012, 2162, 224, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        // },
        {
          name: "TT",
          type: "column",
          data: [1500, 1400, 1600, 1200]
        },
        // {
        //   name: "MTTR",
        //   type: "line",
        //   data: [10.73, 10.57, 9.76, 9.46, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        // }
        {
          name: "MTTR",
          type: "line",
          data: [9.73, 8.57, 7.76, 8.46]
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      stroke: {
        width: [0, 4]
      },
      title: {
        text: "NL Performance"
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      // labels: [
      //   "Jan",
      //   "Feb",
      //   "Mar",
      //   "Apr",
      //   "May",
      //   "Jun",
      //   "Jul",
      //   "Aug",
      //   "Sep",
      //   "Oct",
      //   "Nov",
      //   "Dec",
      //   "YTD",

      // ],
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        // "YTD",
      ],
      xaxis: {
        // type: "datetime"
      },
      yaxis: [
        {
          title: {
            // text: "Work Order"
          }
        },
        {
          opposite: true,
          title: {
            // text: "MTTR"
          }
        }
      ]
    };

    this.chartOptionsSL = {
      series: [
        // {
        //   name: "TT",
        //   type: "column",
        //   data: [1960, 2012, 2162, 224, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        // },
        {
          name: "TT",
          type: "column",
          data: [1500, 1400, 1600, 1200]
        },
        // {
        //   name: "MTTR",
        //   type: "line",
        //   data: [10.73, 10.57, 9.76, 9.46, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        // }
        {
          name: "MTTR",
          type: "line",
          data: [9.73, 8.57, 7.76, 8.46]
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      stroke: {
        width: [0, 4]
      },
      title: {
        text: "SL Performance"
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      // labels: [
      //   "Jan",
      //   "Feb",
      //   "Mar",
      //   "Apr",
      //   "May",
      //   "Jun",
      //   "Jul",
      //   "Aug",
      //   "Sep",
      //   "Oct",
      //   "Nov",
      //   "Dec",
      //   "YTD",

      // ],
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        // "YTD",
      ],
      xaxis: {
        // type: "datetime"
      },
      yaxis: [
        {
          title: {
            text: "Work Order"
          }
        },
        {
          opposite: true,
          title: {
            text: "MTTR"
          }
        }
      ]
    };

    this.chartOptionsVIS = {
      series: [
        // {
        //   name: "TT",
        //   type: "column",
        //   data: [1960, 2012, 2162, 224, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        // },
        {
          name: "TT",
          type: "column",
          data: [1500, 1400, 1600, 1200]
        },
        // {
        //   name: "MTTR",
        //   type: "line",
        //   data: [10.73, 10.57, 9.76, 9.46, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        // }
        {
          name: "MTTR",
          type: "line",
          data: [9.73, 8.57, 7.76, 8.46]
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      stroke: {
        width: [0, 4]
      },
      title: {
        text: "VIS Performance"
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      // labels: [
      //   "Jan",
      //   "Feb",
      //   "Mar",
      //   "Apr",
      //   "May",
      //   "Jun",
      //   "Jul",
      //   "Aug",
      //   "Sep",
      //   "Oct",
      //   "Nov",
      //   "Dec",
      //   "YTD",

      // ],
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        // "YTD",
      ],
      xaxis: {
        // type: "datetime"
      },
      yaxis: [
        {
          title: {
            text: "Work Order"
          }
        },
        {
          opposite: true,
          title: {
            text: "MTTR"
          }
        }
      ]
    };

    this.chartOptionsMIN = {
      series: [
        // {
        //   name: "TT",
        //   type: "column",
        //   data: [1960, 2012, 2162, 224, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        // },
        {
          name: "TT",
          type: "column",
          data: [1500, 1400, 1600, 1200]
        },
        // {
        //   name: "MTTR",
        //   type: "line",
        //   data: [10.73, 10.57, 9.76, 9.46, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        // }
        {
          name: "MTTR",
          type: "line",
          data: [9.73, 8.57, 7.76, 8.46]
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      stroke: {
        width: [0, 4]
      },
      title: {
        text: "MIN Performance"
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      // labels: [
      //   "Jan",
      //   "Feb",
      //   "Mar",
      //   "Apr",
      //   "May",
      //   "Jun",
      //   "Jul",
      //   "Aug",
      //   "Sep",
      //   "Oct",
      //   "Nov",
      //   "Dec",
      //   "YTD",

      // ],
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        // "YTD",
      ],
      xaxis: {
        // type: "datetime"
      },
      yaxis: [
        {
          title: {
            text: "Work Order"
          }
        },
        {
          opposite: true,
          title: {
            text: "MTTR"
          }
        }
      ]
    };

    // bar
    this.chartOptionsNemmBar = {
      series: [
        {
          name: "MCT",
          // data: [44, 55, 57, 56, 0, 0, 0, 0, 0, 0, 0, 0]
          data: [44, 55, 57, 56]
        },
        {
          name: "ICT",
          // data: [76, 85, 101, 98, 0, 0, 0, 0, 0, 0, 0, 0]
          data: [76, 85, 101, 98]
        }
      ],
      chart: {
        type: "bar",
        height: 204
      },
      plotOptions: {
        bar: {
          horizontal: false,
          // columnWidth: "55%",
          // endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"

        ]
      },
      yaxis: {
        title: {
          // text: "$ (thousands)"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            // return "$ " + val + " thousands";
            return ""+val;
          }
        }
      },
      title: {
        text: "TT Type",
        align: "left"
      },

    };

    this.chartOptionsNemmDonut = {
      series: [44, 55],
      chart: {
        type: "donut",
        height: 300
      },
      labels: ["Open", "Closed"],
      responsive: [
        {
          breakpoint: 580,
          options: {
            chart: {
              width: 300
            },
            // legend: {
            //   position: "bottom"
            // }
          }
        }
      ],
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        // offsetX: 40
      },
      title: {
        text: "Status",
        align: "center"
      },
    };

  }

  
 
  navigateToRoute(route: string): void {
    this.router.navigate([route]);
  }

  ngOnInit(): void {

    
 

    this.value = null;
    this.nemmText = "NEMM Performance";
    this.swmmText = "SWMM Performance";
    this.nlText = "NL Performance";
    this.slText = "SL Performance";

    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    
    this.chartOptionsNEMM = {
      series: [
        {
          name: "TT",
          type: "column",
          // data: [628, 673, 798, 145, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          data: [getRandomIntInclusive(600, 1000), getRandomIntInclusive(600, 1000), getRandomIntInclusive(600, 1000), getRandomIntInclusive(600, 1000), getRandomIntInclusive(600, 1000)]
        },
        {
          name: "MTTR",
          type: "line",
          // data: [9.27, 10.76, 9.88, 8.90, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          data: [getRandomIntInclusive(4, 12), getRandomIntInclusive(4, 12), getRandomIntInclusive(4, 12), getRandomIntInclusive(4, 12), getRandomIntInclusive(4, 12)]
        }
      ],
      chart: {
        height: 204,
        type: "line",
        toolbar: {
          show: false // This line disables the toolbar
        }
      },
      stroke: {
        width: [0, 4]
      },
      title: {
        text: "NEMM Performance"
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        "YTD",
      ],
    
      xaxis: {
        // type: "datetime"
      },
      yaxis: [
        {
          title: {
            // text: "Work Order"
          }
        },
        {
          opposite: true,
          title: {
            // text: "MTTR"
          }
        }
      ]
    };

    this.chartOptionsSWMM = {
      series: [
        {
          name: "TT",
          type: "column",
          // data: [628, 673, 798, 145, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          data: [getRandomIntInclusive(600, 1000), getRandomIntInclusive(600, 1000), getRandomIntInclusive(600, 1000), getRandomIntInclusive(600, 1000), getRandomIntInclusive(600, 1000)]
        },
        {
          name: "MTTR",
          type: "line",
          // data: [9.27, 10.76, 9.88, 8.90, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          data: [getRandomIntInclusive(4, 12), getRandomIntInclusive(4, 12), getRandomIntInclusive(4, 12), getRandomIntInclusive(4, 12), getRandomIntInclusive(4, 12)]
        }
      ],
      title: {
        text: "SWMM Performance"
      },
    };

    this.chartOptionsNL = {
      series: [
        {
          name: "TT",
          type: "column",
          // data: [628, 673, 798, 145, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          data: [getRandomIntInclusive(600, 1000), getRandomIntInclusive(600, 1000), getRandomIntInclusive(600, 1000), getRandomIntInclusive(600, 1000), getRandomIntInclusive(600, 1000)]
        },
        {
          name: "MTTR",
          type: "line",
          // data: [9.27, 10.76, 9.88, 8.90, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          data: [getRandomIntInclusive(4, 12), getRandomIntInclusive(4, 12), getRandomIntInclusive(4, 12), getRandomIntInclusive(4, 12), getRandomIntInclusive(4, 12)]
        }
      ],
      title: {
        text: "NL Performance"
      },
    };

    this.chartOptionsSL = {
      series: [
        {
          name: "TT",
          type: "column",
          // data: [628, 673, 798, 145, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          data: [getRandomIntInclusive(600, 1000), getRandomIntInclusive(600, 1000), getRandomIntInclusive(600, 1000), getRandomIntInclusive(600, 1000), getRandomIntInclusive(600, 1000)]
        },
        {
          name: "MTTR",
          type: "line",
          // data: [9.27, 10.76, 9.88, 8.90, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          data: [getRandomIntInclusive(4, 12), getRandomIntInclusive(4, 12), getRandomIntInclusive(4, 12), getRandomIntInclusive(4, 12), getRandomIntInclusive(4, 12)]
        }
      ],
      title: {
        text: "SL Performance"
      },
    };

    this.chartOptionsVIS = {
      series: [
        {
          name: "TT",
          type: "column",
          // data: [628, 673, 798, 145, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          data: [getRandomIntInclusive(600, 1000), getRandomIntInclusive(600, 1000), getRandomIntInclusive(600, 1000), getRandomIntInclusive(600, 1000), getRandomIntInclusive(600, 1000)]
        },
        {
          name: "MTTR",
          type: "line",
          // data: [9.27, 10.76, 9.88, 8.90, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          data: [getRandomIntInclusive(4, 12), getRandomIntInclusive(4, 12), getRandomIntInclusive(4, 12), getRandomIntInclusive(4, 12), getRandomIntInclusive(4, 12)]
        }
      ],
      title: {
        text: "VIS Performance"
      },
    };

    this.chartOptionsMIN = {
      series: [
        {
          name: "TT",
          type: "column",
          // data: [628, 673, 798, 145, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          data: [getRandomIntInclusive(600, 1000), getRandomIntInclusive(600, 1000), getRandomIntInclusive(600, 1000), getRandomIntInclusive(600, 1000), getRandomIntInclusive(600, 1000)]
        },
        {
          name: "MTTR",
          type: "line",
          // data: [9.27, 10.76, 9.88, 8.90, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          data: [getRandomIntInclusive(4, 12), getRandomIntInclusive(4, 12), getRandomIntInclusive(4, 12), getRandomIntInclusive(4, 12), getRandomIntInclusive(4, 12)]
        }
      ],
      title: {
        text: "MIN Performance"
      },
    };

  }

   
}
