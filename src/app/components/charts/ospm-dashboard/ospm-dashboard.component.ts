import { Component, ViewChild, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/shared/token.service';
import { environment } from 'src/environments/environment';
import { OspmDataService } from "../../ospm-data/ospm-data.service";

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

@Component({
  selector: 'app-ospm-dashboard',
  templateUrl: './ospm-dashboard.component.html',
  styleUrls: ['./ospm-dashboard.component.css']
})
export class OspmDashboardComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptionsDefault!: Partial<ChartOptions>;
  public chartOptionsBar!: Partial<ChartOptions>;

  params!: any;
  model!: any;
  text!: any;

  seriesTotalTicketPerMonth: any[] = [];
  seriesAverageMttrPerMonth: any[] = [];

  constructor(
    private router: Router,
    public authService: AuthService,
    private fb: FormBuilder,
    private ospmDataService: OspmDataService,
    private modalService: NgbModal,
    private http: HttpClient,
    public tokenService: TokenService

  ) {}
  
  ngOnInit(): void {

    this.chartOptionsDefault = {
      series: [
        {
          name: "TICKET",
          type: "column",
          data: [0,0,0,0,0]
        },
        {
          name: "MTTR",
          type: "line",
          data: [0,0,0,0,0]
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
        tickAmount: 1
      },
      yaxis: [
        
        {
          title: {
            text: "Work Order",
            
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
  
    this.ospmDataService.summary(this.params).subscribe(async resp => {
      // this.model = await resp.data;
      console.log(await resp)

      var tickets: any[] = [];
      // var months: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      var months: any[] = [1, 2, 3, 4, 5];
      var regions: any[] = ["NEMM", "SWMM", "NLZ", "SLZ", "VIS", "MIN"];

      // resp.forEach((data : any, keys :any) => {

      //   regions.forEach((region: any, keyRegion: any) => {
         
      //     months.forEach((month: any, keyMonth: any) => {
      //       // alert(region + month)
      //     })
      //   })
        
      // });

      months.forEach((month: any, keyMonth: any) => {
        
        var isMonthNull = false; 
        var totalPerMonth = 0;
        var totalMttrPerMonth = 0;
        resp.forEach((data : any, keyData :any) => {
          if(data.month_endorsed==month){
            totalPerMonth = totalPerMonth+data.ticket_count
            totalMttrPerMonth = totalMttrPerMonth+data.total_mttr_service_restored
            isMonthNull = true;
          }
        })

        if(!isMonthNull){
          this.seriesTotalTicketPerMonth.push(0)
        }else{
          this.seriesTotalTicketPerMonth.push(totalPerMonth)
          isMonthNull = false;
        }
        
      });

      console.log(this.seriesTotalTicketPerMonth);

      this.chartOptionsBar = {
        series: [
          {
            name: "TICKET",
            type: "column",
            data: this.seriesTotalTicketPerMonth,
          },
          {
            name: "MTTR",
            type: "line",
            data: [1.73, 1.57, 1.76, 1.46, 1.20]
          }
        ]
      };

    });

  }
}
