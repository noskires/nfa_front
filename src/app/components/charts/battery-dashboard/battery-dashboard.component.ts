import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { SiteService } from '../../site/site.service';
import { BatteryService } from '../../sf/battery/battery.service';

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

export type ChartOptionsDonut = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
  colors: string[];
  title: ApexTitleSubtitle
};

export type ChartOptionsMultipleRadialBar = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
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
  colors: string[];
};

@Component({
  selector: 'app-battery-dashboard',
  templateUrl: './battery-dashboard.component.html',
  styleUrls: ['./battery-dashboard.component.css']
})
export class BatteryDashboardComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptionsDonutDefault!: Partial<ChartOptionsDonut>;
  public chartOptionsDonutPerSiteCategory!: Partial<ChartOptionsDonut>;
  public chartOptionsDonutPerRegion!: Partial<ChartOptionsDonut>;
  public chartOptionsBarDefault!: Partial<ChartOptionsBar>;
  public chartOptionsBarPerSiteCategory!: Partial<ChartOptionsBar>;
  public chartOptionsBarPerRegion!: Partial<ChartOptionsBar>;
  
  colors: any[] = ['#008FFB', '#00E396', '#FEB019', '#775DD0', '#FF4560', '#34495e'];
  userInfo!: any;
  params!: any;
  perms!: any;
  siteDetails!: any;
  siteCategoryDetails!: any;
  regions: any[] = ["NEMM", "SWMM", "NL", "SL", "VIS", "MIN"];
  regionsAliase: any[] = ["nemm", "swmm", "nl", "sl", "vis", "min"];
  regionsCode: any[] = [10000000, 20000000, 30000000, 40000000, 50000000, 60000000];
  siteCategories: any[] = ["CO-PureCore", "CO-Mixed", "NPOB", "CS", "BTS"];
  siteCategoriesCode: any[] = ["copurecore", "comixed", "npob", "cs", "bts"];
  batteryTypes: any[] = ["LIB", "VRLA"];
  seriesCoPurecore: any[] = [];
  seriesCoMixed: any[] = [];
  seriesNpob: any[] = [];
  seriesCs: any[] = [];
  seriesBts: any[] = [];

  seriesNemm: any[] = [];
  seriesSwmm: any[] = [];
  seriesNl: any[] = [];
  seriesSl: any[] = [];
  seriesVis: any[] = [];
  seriesMin: any[] = [];

  totalSites!: any;


  constructor(
    private siteService: SiteService,
    private batteryService: BatteryService,
  ) { }

  ngOnInit(): void {

    this.batteryService.summary(null).subscribe(async resp=> {
      console.log(resp.data);


      var libSeries: any[] = [];
      var vrlaSeries: any[] = [];
      var regionSeries: any[] = [];

      resp.data.forEach((data : any, keys :any) => {
        if(data.type == "LIB"){
          libSeries.push(data.count);
        }else{
          vrlaSeries.push(data.count);
        }

        this.regionsCode.forEach((code : any, regionKey :any)=> {
          if(code == data.area){
            // alert(code)
            regionSeries[code].push(data.count)
          }
          
        })
        

      });

      console.log(regionSeries)

      console.log("lib = " + libSeries)
      console.log("vrla = " + vrlaSeries)
      console.log("total lib = " + libSeries.reduce((acc, cur) => acc + cur, 0),)
      
    })

    this.siteService.summaryPerSiteCategory(null).subscribe(async resp => {
      console.log(resp.region)
      console.log(resp.site_category)
      this.siteDetails = await resp.region;
      this.siteCategoryDetails = await resp.site_category;

      this.totalSites = this.siteDetails["nationwide"]['total'];
      console.log(this.siteDetails["nationwide"]['total'])
      console.log(this.siteCategories[1])
      
      this.regionsCode.forEach((regionCode : any, keys :any) => {
        this.seriesCoPurecore.push(this.siteDetails[regionCode]['copurecore']);
        this.seriesCoMixed.push(this.siteDetails[regionCode]['comixed']);
        this.seriesNpob.push(this.siteDetails[regionCode]['npob']);
        this.seriesCs.push(this.siteDetails[regionCode]['cs']);
        this.seriesBts.push(this.siteDetails[regionCode]['bts']);
      });

      this.siteCategoriesCode.forEach((siteCategoryCode : any, keys :any) => {
        this.seriesNemm.push(this.siteDetails["nemm"][siteCategoryCode]);
        this.seriesSwmm.push(this.siteDetails["swmm"][siteCategoryCode]);
        this.seriesNl.push(this.siteDetails["nl"][siteCategoryCode]);
        this.seriesSl.push(this.siteDetails["sl"][siteCategoryCode]);
        this.seriesVis.push(this.siteDetails["vis"][siteCategoryCode]);
        this.seriesMin.push(this.siteDetails["min"][siteCategoryCode]);

      });

      this.chartOptionsDonutPerSiteCategory = {
        series: [
          // this.seriesCoPurecore.reduce((acc, cur) => acc + cur, 0),
          // this.seriesCoMixed.reduce((acc, cur) => acc + cur, 0),
          // this.seriesNpob.reduce((acc, cur) => acc + cur, 0),
          // this.seriesCs.reduce((acc, cur) => acc + cur, 0),
          // this.seriesBts.reduce((acc, cur) => acc + cur, 0),
  
          this.siteDetails["nationwide"]['copurecore'],
          this.siteDetails["nationwide"]['comixed'],
          this.siteDetails["nationwide"]['npob'],
          this.siteDetails["nationwide"]['cs'],
          this.siteDetails["nationwide"]['bts'],
        ],
        labels: this.siteCategories,
        title: {
          text: "Per Site Category",
          align: "center"
        },
        colors: this.colors,
      }
      
      this.chartOptionsDonutPerRegion = {
        series: [
          this.seriesNemm.reduce((acc, cur) => acc + cur, 0),
          this.seriesSwmm.reduce((acc, cur) => acc + cur, 0),
          this.seriesNl.reduce((acc, cur) => acc + cur, 0),
          this.seriesSl.reduce((acc, cur) => acc + cur, 0),
          this.seriesVis.reduce((acc, cur) => acc + cur, 0),
          this.seriesMin.reduce((acc, cur) => acc + cur, 0),
        ],
        labels: this.regions,
        title: {
          text: "Per Area",
          align: "center"
        },
        colors: this.colors,
      }
      

      // Bar per site category
      this.chartOptionsBarPerSiteCategory = {
        series: [
          { name: "CO Purecore", data: this.seriesCoPurecore },
          { name: "CO Mixed", data: this.seriesCoMixed}, 
          { name: "NPOB", data: this.seriesNpob},
          { name: "CS", data: this.seriesCs},
          { name: "BTS", data: this.seriesBts}
        ],
        xaxis: {
          categories: this.regions
        },
        yaxis: {
          title: {
            text: "Per Site Area"
          }
        },
        colors: this.colors,
        
      }
      

      // Bar per region
      this.chartOptionsBarPerRegion = {
        series: [
          { name: "NEMM", data: this.seriesNemm },
          { name: "SWMM", data: this.seriesSwmm}, 
          { name: "NL", data: this.seriesNl},
          { name: "SL", data: this.seriesSl},
          { name: "VIS", data: this.seriesVis},
          { name: "MIN", data: this.seriesMin}
        ],
        xaxis: {
          categories: [
            "CO Purecore",
            "CO Mixed",
            "NPOB",
            "CS",
            "BTS",
          ]
        },
        yaxis: {
          title: {
            text: "Per Site Category"
          }
        },
        colors: this.colors,
      }

      // Donut
      this.chartOptionsDonutDefault = {
        // series: [0,0,0,0,0],
        chart: {
          type: "donut",
          height: 307,
        },
        // labels: ["CO PureCore", "CO Mixed", "NPOB", "CS", "BTS"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom"
              },
              // legend: {
              //   position: "bottom",
              //   horizontalAlign: "left",
              //   offsetX: 40
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
        colors: this.colors,
        // title: {
        //   text: "Site Category",
        //   align: "center"
        // }
      };
    });


    // Bar
    this.chartOptionsBarDefault = {
      // series: [
      //   {name: "label1",data: [0,0,0,0,0]},
      //   {name: "label2",data: [0,0,0,0,0]},
      //   {name: "label3",data: [0,0,0,0,0]},
      //   {name: "label4",data: [0,0,0,0,0]},
      //   {name: "label5",data: [0,0,0,0,0]}
      // ],
      chart: {
        type: "bar",
        height: 260
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
      // xaxis: {
      //   categories: [
      //     "label1",
      //     "label2",
      //     "label3",
      //     "label4",
      //     "label5",
      //     "label6",
      //   ]
      // },
      // yaxis: {
      //   title: {
      //     text: "Per Area"
      //   }
      // },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val+"";
          }
        }
      }
    };


  }

}