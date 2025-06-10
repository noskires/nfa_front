import { Component, ViewChild, OnInit } from "@angular/core";

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
  ApexResponsive,
  ApexMarkers,
  ApexGrid
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

export type ChartOptionsLine = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

export type ChartOptionsStackBar = {
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

export type ChartOptionsStackLine = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  colors: string[];
  legend: ApexLegend;
  fill: ApexFill;
};

export type ChartOptionsGroupBar = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-ospm-division',
  templateUrl: './ospm-division.component.html',
  styleUrls: ['./ospm-division.component.css']
})
export class OspmDivisionComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent | undefined;;
  public chartOptions!: Partial<ChartOptions>;
  public chartOptionsDivision!: Partial<ChartOptionsLine>;

  public chartOptionsBar!: Partial<ChartOptionsBar>;
  public chartOptionsDonut!: Partial<ChartOptionsDonut>;
  public chartOptionsStackBar!: Partial<ChartOptionsStackBar>;
  public chartOptionsStackLine!: Partial<ChartOptionsStackLine>;
  public chartOptionsGroupBar!: Partial<ChartOptionsGroupBar>;
  
  public nemmText!: any;
  public swmmText!: any;
  public nlText!: any;
  public slText!: any;
  public visText!: any;
  public minText!: any;

  constructor() {

  }


  ngOnInit(): void {

    this.chartOptions = {
      series: [
        {
          name: "WEST",
          type: "column",
          data: [1960, 2012, 2162, 1224, 2500],
          
        },
        {
          name: "EAST",
          type: "column",
          data: [1960, 1012, 2562, 1224, 1001]
        },
        {
          name: "CENTRAL",
          type: "column",
          data: [1960, 2312, 1962, 1224, 1500]
        },
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
        width: [0,1,2,3,4]
      },
      title: {
        text: "North Luzon Performance"
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [3]
      },
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "YTD",
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

    this.chartOptionsDivision = {
      series: [
        {
          name: "WEST",
          data: [8.31, 8.1, 9.3, 8.36, 7.32, 9.32]
        },
        {
          name: "EAST",
          data: [8.12, 8.11, 8.14, 9.18, 7.17, 8.13]
        },
        {
          name: "CENTRAL",
          data: [9.10, 9.16, 8.9, 8.7, 8.30, 9.11]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        // dropShadow: {
        //   enabled: true,
        //   color: "#000",
        //   top: 18,
        //   left: 7,
        //   blur: 10,
        //   opacity: 0.2
        // },
        toolbar: {
          show: false
        }
      },
      // colors: ["#77B6EA", "#545454"],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Performance per Division",
        align: "left"
      },
      grid: {
        // borderColor: "#e7e7e7",
        row: {
          // colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "YTD"],
        title: {
          text: "Month"
        }
      },
      // yaxis: {
      //   title: {
      //     text: "Temperature"
      //   },
      //   min: 5,
      //   max: 40
      // },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };


    this.chartOptionsBar = {
      series: [
        {
          name: "WEST",
          data: [44, 55]
        },
        {
          name: "EAST",
          data: [76, 85]
        },
        {
          name: "CENTRAL",
          data: [101, 98]
        }

      ],
      chart: {
        type: "bar",
        height: 253
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
          "SA",
          "NSA",
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
        text: "SA/NSA",
        align: "left"
      },

    };

    this.chartOptionsStackBar = {
      series: [
        {
          name: "WEST",
          data: [44, 55, 41]
        },
        {
          name: "EAST",
          data: [53, 32, 33]
        },
        {
          name: "CENTRAL",
          data: [12, 17, 11]
        }
      ],
      chart: {
        type: "bar",
        height: 253,
        stacked: true,
        // stackType: "100%"
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
        text: "SLA"
      },
      xaxis: {
        categories: ['0 - 4 HRS', '5 - 8 HRS', '> 8 HRS']
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
        position: "top",
        horizontalAlign: "left",
        offsetX: 40
      }
    };

    this.chartOptionsDonut = {
      series: [44, 55, 30],
      chart: {
        type: "donut",
        height: 300
      },
      labels: ["WEST", "EAST", "CENTRAL"],
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
        text: "WO per Division",
        align: "center"
      },
    };

    // STACK LINE
    this.chartOptionsStackLine = {
      series: [
        {
          name: "South",
          data: [10, 12, 13]
        },
        {
          name: "North",
          data: [9, 15, 8]
        },
        {
          name: "Central",
          data: [13, 10, 11]
        }
      ],
      chart: {
        type: "area",
        height: 350,
        stacked: true,
        events: {
          selection: function(chart, e) {
            console.log(new Date(e.xaxis.min));
          }
        }
      },
      colors: ["#008FFB", "#00E396", "#CED4DC"],
      dataLabels: {
        enabled: false
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.8
        }
      },
      legend: {
        position: "top",
        horizontalAlign: "left"
      },
      xaxis: {
        // type: "datetime"
      }
    };

    // Group Bar

    this.chartOptionsGroupBar = {
      series: [
        {
          name: "WEST",
          data: [44, 55]
        },
        {
          name: "EAST",
          data: [53, 32]
        },
        {
          name: "CENTRAL",
          data: [13, 44]
        }
      ],
      chart: {
        type: "bar",
        height: 253
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#fff"]
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"]
      },
      xaxis: {
        categories: ["ICT", "MCT"]
      },
      title: {
        text: "ICT/MCT",
        align: "left"
      },
    };



  }


}
