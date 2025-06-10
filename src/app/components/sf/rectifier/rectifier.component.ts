import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { AuthService } from 'src/app/shared/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RectifierService } from './rectifier.service';
import { SiteService } from '../../site/site.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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
  selector: 'app-rectifier',
  templateUrl: './rectifier.component.html',
  styleUrls: ['./rectifier.component.css']
})
export class RectifierComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};

  rectifierForm!: FormGroup;

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
    private rectifierService: RectifierService,
    private siteService: SiteService,
    private modalService: NgbModal,
    private http: HttpClient

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
      
        // console.log(dataTablesParameters)
        this.rectifierService.list(dataTablesParameters).subscribe(async resp => {
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
        // { title:"ID", data: 'id', width: '3%' },
        { title:"Area", data: 'area_name', width: '10%' },
        { title:"Site Name", data: 'site_name', width: '10%' },
        { title:"Rectifier", data: 'rectifier_name', width: '10%' },
        { title:"Status", data: 'status', width: '10%' },
        { title:"Manufacturer", data: 'manufacturer_name', width: '10%' },
        // { title:"Type", data: 'type', width: '10%' },
        { title:"Index No", data: 'index_no', width: '10%' },
        { title:"Capacity", data: 'full_capacity', width: '10%' },
        { title:"Date Installed", data: 'date_installed', width: '10%' },
        { title:"Date Accepted", data: 'date_accepted', width: '10%' },
        { title:"Actions", defaultContent: "", width: '10%' },
      ]
    };


    this.rectifierForm = this.fb.group({
      id: ['', Validators.required],
      site_id: ['', Validators.required],
      code: ['', Validators.required],
      network_element_code: ['', Validators.required],
      battery_code: ['', Validators.required],
      manufacturer: ['', Validators.required],
      serial_no: ['', Validators.required],
      index_no: ['', Validators.required],
      model: ['', Validators.required],
      maintainer: ['', Validators.required],
      status: null,
      date_installed: ['', Validators.required],
      date_accepted: ['', Validators.required],
      rectifier_system_name: ['', Validators.required],
      type: ['', Validators.required],
      brand: ['', Validators.required],
      no_of_existing_module: ['', Validators.required],
      no_of_slots: ['', Validators.required],
      capacity_per_module: ['', Validators.required],
      full_capacity: ['', Validators.required],
      dc_voltage: ['', Validators.required],
      total_actual_load: ['', Validators.required],
      percent_utilization: ['', Validators.required],
      external_alarm_activation: ['', Validators.required],
      no_of_runs_and_cable_size: ['', Validators.required],
      tvss_brand_rating: ['', Validators.required],
      rectifier_dc_breaker_brand: ['', Validators.required],
      rectifier_battery_slot: ['', Validators.required],
      dcpdb_equipment_load_assignment: ['', Validators.required],
      remarks: ['', Validators.required],
    });

  }

  onSelect2(url:any, placeholder:any ) {
    return {
        theme: "bootstrap",
        multiple: false,
        closeOnSelect: true,
        width: '100%',
        ajax: {
          // headers: {
          //   "Authorization" : "Bearer "+this.tokenService.getToken(),
          //   "Content-Type" : "application/json",
          // },
          url: environment.API_URL+url,
          data: function (params:any) {
  
            console.log(params)
            var query = {
              search: params.term,
            }
            // Query parameters will be ?search=[term]&type=public
            console.log(query)
            return query;
          },
          type: "get",
          dataType: 'json',
          delay: 100,
          cache: true
        },
        placeholder: placeholder,
        language: {
            noResults: function () {
                return "No records found!";
            }
        },
      };
  }

  setDefaultValueOnSelect2(id:any, text:any){
    let defaultValue:any = null;
    if(id){
      defaultValue = [{ id:id, text:text }]
    }

    return defaultValue;
  }

  add(targetModal:any) {
  
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      fullscreen: true,
      keyboard: true,
      size: 'xl',
    });

    this.rectifierForm = this.fb.group({
      id: [''],
      site_id: [''],
      code: [''],
      network_element_code: [''],
      battery_code: [''],
      manufacturer: [''],
      serial_no: [''],
      index_no: [''],
      model: [''],
      maintainer: [''],
      status: null,
      date_installed: [''],
      date_accepted: [''],
      rectifier_system_name: [''],
      type: [''],
      brand: [''],
      no_of_existing_module: [''],
      no_of_slots: [''],
      capacity_per_module: [''],
      full_capacity: [''],
      dc_voltage: [''],
      total_actual_load: [''],
      percent_utilization: [''],
      external_alarm_activation: [''],
      no_of_runs_and_cable_size: [''],
      tvss_brand_rating: [''],
      rectifier_dc_breaker_brand: [''],
      rectifier_battery_slot: [''],
      dcpdb_equipment_load_assignment: [''],
      remarks: [''],
      

    });

    // this.optionsNe = {
    //   theme: "bootstrap",
    //   multiple: true,
    //   closeOnSelect: true,
    //   width: '100%',
    //   ajax: {
    //     headers: {
    //       "Authorization" : "Bearer "+this.tokenService.getToken(),
    //       "Content-Type" : "application/json",
    //     },
    //     url: environment.API_URL+"api/v1/ne/select2",
    //     data: function (params:any) {

    //       console.log(params)
    //       var query = {
    //         search: params.term,
    //       }
    //       // Query parameters will be ?search=[term]&type=public
    //       console.log(query)
    //       return query;
    //     },
    //     type: "get",
    //     dataType: 'json',
    //     delay: 100,
    //     cache: true
    //   },
    //   placeholder: 'Search NE',
    //   language: {
    //       noResults: function () {
    //           return "No records found!";
    //       }
    //   },
    // };

    // this.optionsBattery = {
    //   theme: "bootstrap",
    //   multiple: true,
    //   closeOnSelect: true,
    //   width: '100%',
    //   ajax: {
    //     headers: {
    //       "Authorization" : "Bearer "+this.tokenService.getToken(),
    //       "Content-Type" : "application/json",
    //     },
    //     url: environment.API_URL+"api/v1/battery/select2",
    //     data: function (params:any) {

    //       console.log(params)
    //       var query = {
    //         search: params.term,
    //       }
    //       // Query parameters will be ?search=[term]&type=public
    //       console.log(query)
    //       return query;
    //     },
    //     type: "get",
    //     dataType: 'json',
    //     delay: 100,
    //     cache: true
    //   },
    //   placeholder: 'Search Battery',
    //   language: {
    //       noResults: function () {
    //           return "No records found!";
    //       }
    //   },
    // };

    this.optionsSite = this.onSelect2("api/v1/site/select2", "Search Site");
    this.optionsManufacturer = this.onSelect2("api/v1/manufacturer/select2", "Search Manufacturer");

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

    

    
    // this.rectifierItemService.select2({item_type:'Network Element', rectifier_code:raw.code}).subscribe(async resp => {
    //   this.defaultNe = await resp.results;

    //   this.defaultNe.forEach((val: any, key:any) => { this.defaultNeCodes.push(val.id) });

    //   console.log(this.defaultNe)
    //   console.log(this.defaultNeCodes)

    // });

    // this.rectifierItemService.select2({item_type:"Battery", rectifier_code:raw.code}).subscribe(async resp => {
    //   this.defaultBattery = await resp.results;

    //   this.defaultBattery.forEach((val: any, key:any) => { this.defaultBatteryCodes.push(val.id) });

    //   console.log(this.defaultBattery)
    //   console.log(this.defaultBatteryCodes)
    // });
  
    this.rectifierForm.patchValue({

      id: raw.id,
      code: raw.code,
      site_id: raw.site_id,
      // network_element_code:this.defaultNeCodes,
      // battery_code:this.defaultBatteryCodes,
      manufacturer: raw.manufacturer_id,
      serial_no: raw.serial_no,
      index_no: raw.index_no,
      model: raw.model,
      maintainer: raw.maintainer,
      status: raw.status,
      date_installed: raw.date_installed,
      date_accepted: raw.date_accepted,
      rectifier_system_name: raw.rectifier_system_name,
      type: raw.type,
      brand: raw.brand,
      no_of_existing_module: raw.no_of_existing_module,
      no_of_slots: raw.no_of_slots,
      capacity_per_module: raw.capacity_per_module,
      full_capacity: raw.full_capacity,
      dc_voltage: raw.dc_voltage,
      total_actual_load: raw.total_actual_load,
      percent_utilization: raw.percent_utilization,
      external_alarm_activation: raw.external_alarm_activation,
      no_of_runs_and_cable_size: raw.no_of_runs_and_cable_size,
      tvss_brand_rating: raw.tvss_brand_rating,
      rectifier_dc_breaker_brand: raw.rectifier_dc_breaker_brand,
      rectifier_battery_slot: raw.rectifier_battery_slot,
      dcpdb_equipment_load_assignment: raw.dcpdb_equipment_load_assignment,
      remarks: raw.remarks,

    });

    this.optionsSite = this.onSelect2("api/v1/site/select2", "Search Site");
    this.optionsManufacturer = this.onSelect2("api/v1/manufacturer/select2", "Search Manufacturer");

    this.defaultSite = this.setDefaultValueOnSelect2(raw.site_id, raw.site_name);
    this.defaultManufacturer = this.setDefaultValueOnSelect2(raw.manufacturer_id, raw.manufacturer_name);

  }

  remove(raw: any) {
    
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

        this.rectifierService.delete(raw).subscribe(async (data: any) => {

          await this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
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

  async onSubmitSave(): Promise<any> {
    
    const raw = this.rectifierForm.getRawValue();
    console.log(raw)

    await this.rectifierService.save(raw).subscribe((data: any) => {

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
    
    const raw = this.rectifierForm.getRawValue();
    console.log(raw)
  


    await this.rectifierService.update(raw).subscribe((data: any) => {

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
