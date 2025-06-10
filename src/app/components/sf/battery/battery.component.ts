import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { AuthService } from 'src/app/shared/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BatteryService } from './battery.service';
import { SiteService } from '../../site/site.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/shared/token.service';
import { environment } from 'src/environments/environment';
import { Select2Service } from 'src/app/shared/select2.service';
import Swal from 'sweetalert2';

declare let $: any;

export interface Options {
  theme: string,
  width:string,
  multiple: boolean,
  closeOnSelect: boolean,
  ajax: object,
  placeholder: string,
  language: object,
}

@Component({
  selector: 'app-battery',
  templateUrl: './battery.component.html',
  styleUrls: ['./battery.component.css']
})
export class BatteryComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};

  batteryForm!: FormGroup;

  public optionsSite!: Options;
  public optionsRectifier!: Options;
  public optionsManufacturer!: Options;

  defaultSite!: any;
  defaultRectifier!: any;
  defaultManufacturer!: any;
  
  params!: any;
  model!: any;
  text!: any;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private batteryService: BatteryService,
    private siteService: SiteService,
    private modalService: NgbModal,
    private http: HttpClient,
    public select2Service: Select2Service,
    public tokenService: TokenService

  ) { }
 
  ngOnInit(): void {

    this.dtOptions = {
      destroy: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      scrollX: true,
      stateSave: true,
      ajax: (dataTablesParameters: any, callback) => {
      
        console.log(dataTablesParameters)
        this.batteryService.list(dataTablesParameters).subscribe(async resp => {
          this.model = await resp.data;

          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
            // data: await resp.data
          });
        });

      },
      columns: [
        { title:"Area", data: 'area_name', width: '3%' },
        { title:"Site Name", data: 'site_name', width: '10%' },
        { title:"Rectifier", data: 'rectifier_name', width: '10%' },
        { title:"Status", data: 'status', width: '5%' },
        { title:"Manufacturer", data: 'battery_manufacturer_name', width: '10%' },
        { title:"Type", data: 'type', width: '3%' },
        { title:"Bank", data: 'bank', width: '5%' },
        { title:"Index No", data: 'index_no', width: '5%' },
        { title:"Capacity", data: 'capacity', width: '5%' },
        { title:"Date Installed", data: 'date_installed', width: '5%' },
        { title:"Age", data: 'age_from_date_installed', width: '3%' },
        { title:"Age Group", data: 'age_from_date_installed_group', width: '3%' },
        { title:"Date Accepted", data: 'date_accepted', width: '5%' },
        { title:"Actions", defaultContent: "", width: '5%' },
      ]
    };


    this.batteryForm = this.fb.group({
      id: ['', Validators.required],
      code: ['', Validators.required],
      site_id: ['', Validators.required],
      network_element_code: ['', Validators.required],
      manufacturer: ['', Validators.required],
      rectifier: ['', Validators.required],
      index_no: ['', Validators.required],
      model: ['', Validators.required],
      maintainer: ['', Validators.required],
      status: ['', Validators.required],
      date_installed: ['', Validators.required],
      date_accepted: ['', Validators.required],
      capacity: ['', Validators.required],
      type: ['', Validators.required],
      bank: ['', Validators.required],
      brand: ['', Validators.required],
      no_of_cells: ['', Validators.required],
      individual_cell_voltage: ['', Validators.required],
      cell_status: ['', Validators.required],
      cable_size: ['', Validators.required],
      backup_time: ['', Validators.required],
      float_voltage_requirement: ['', Validators.required],
      remarks: ['', Validators.required],
    });

  }

  onChangeIndividualCellVoltage($event: any) {

    let individual_cell_voltage = this.batteryForm.get("individual_cell_voltage")?.value;
    let no_of_cells = 0;

    if(individual_cell_voltage==48){
      no_of_cells = 1;
    }else if(individual_cell_voltage==12){
      no_of_cells = 4;
    }else if(individual_cell_voltage==2){
      no_of_cells = 24;
    }else{
      no_of_cells = 0;
    }

    this.batteryForm.controls['no_of_cells'].setValue(no_of_cells);
 
  }

  // actions
  add(targetModal:any){

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      fullscreen: true,
      keyboard: true,
      size: 'xl'
    })

    this.batteryForm = this.fb.group({
      id: [''],
      code: [''],
      site_id: [''],
      network_element_code: [''],
      manufacturer: [''],
      rectifier: [''],
      index_no: [''],
      model: [''],
      maintainer: [''],
      status: null,
      date_installed: [''],
      date_accepted: [''],
      capacity: [''],
      type: null,
      bank: null,
      brand: [''],
      no_of_cells: [''],
      individual_cell_voltage: null,
      cell_status: [''],
      cable_size: [''],
      backup_time: [''],
      float_voltage_requirement: [''],
      remarks: [''],

    });


    this.optionsSite = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/site/select2", this.tokenService.getToken(), "", "Search Site");
    this.optionsRectifier = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/rectifier/select2", this.tokenService.getToken(), "", "Search Rectifier");
    this.optionsManufacturer = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/manufacturer/select2", this.tokenService.getToken(), "", "Search Manufacturer");
 
  }

  edit(targetModal:any, raw:any) {

    console.log(raw)

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      fullscreen: true,
      keyboard: true,
      size: 'xl',
    });

  
    this.batteryForm.patchValue({
      id: raw.id,
      code: raw.code,
      site_id: raw.battery_site_id,
      manufacturer: raw.battery_manufacturer_id,
      rectifier: raw.rectifier_id,
      index_no: raw.index_no,
      model: raw.model,
      maintainer: raw.maintainer,
      status: raw.status,
      date_installed: raw.date_installed,
      date_accepted: raw.date_accepted,
      capacity: raw.capacity,
      type: raw.type,
      bank: raw.bank,
      brand: raw.brand,
      no_of_cells: raw.no_of_cells,
      cell_status: raw.cell_status,
      cable_size: raw.cable_size,
      backup_time: raw.backup_time,
      float_voltage_requirement: raw.float_voltage_requirement,
      remarks: raw.remarks,

    });

    this.optionsSite = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/site/select2", this.tokenService.getToken(), "", "Search Site");
    this.optionsRectifier = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/rectifier/select2", this.tokenService.getToken(), "", "Search Rectifier");
    this.optionsManufacturer = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/manufacturer/select2", this.tokenService.getToken(), "", "Search Manufacturer");
 
    this.defaultSite = this.select2Service.setDefaultValueOnSelect2(raw.battery_site_id, raw.site_name);
    this.defaultRectifier = this.select2Service.setDefaultValueOnSelect2(raw.rectifier_id, raw.rectifier_name);
    this.defaultManufacturer = this.select2Service.setDefaultValueOnSelect2(raw.battery_manufacturer_id, raw.battery_manufacturer_name);
  
  }

  remove(raw: any) {

    console.log(raw)
    
    Swal.fire({
      title: 'Are you sure you want to delete this record?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) { 
        this.batteryService.delete(raw).subscribe((data: any) => {

          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
    
            Swal.fire(
              'Deleted!',
              'This record has been deleted.',
              'success'
            )
            
          });

        });

      }
    })
  }

  downloadFile(route: string, filename: string): void{
    const baseUrl = environment.API_URL+'api/v1/battery/export';
    const token = "Bearer "+this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', token);
    this.http.get(baseUrl,{headers, responseType: 'blob' as 'json'}).subscribe(
        (response: any) =>{
            let dataType = response.type;
            let binaryData : string[] = [];
            binaryData.push(response);
            let downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
            if (filename)
                downloadLink.setAttribute('download', filename);
            document.body.appendChild(downloadLink);
            downloadLink.click();
        }
    )
  }

  async onSubmitSave(): Promise<any> {
    
    const raw = this.batteryForm.getRawValue();
    console.log(raw)

    await this.batteryService.save(raw).subscribe((data: any) => {

      console.log(data)
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.draw();

        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: 'Successfully save!',
          showConfirmButton: false,
          timer: 1500
        })

      });

      this.modalService.dismissAll();

    });

  }

  async onSubmitUpdate(): Promise<any> {
    
    const raw = this.batteryForm.getRawValue();
    console.log(raw)

    await this.batteryService.update(raw).subscribe((data: any) => {

      console.log(data)
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.draw();

        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: 'Successfully save!',
          showConfirmButton: false,
          timer: 1500
        })

      });

      this.modalService.dismissAll();

    });

  }

}
