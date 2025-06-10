import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { AuthService } from 'src/app/shared/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SiteService } from './site.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from 'src/app/shared/token.service';
import { environment } from 'src/environments/environment';
import { Select2Service } from 'src/app/shared/select2.service';
import { GeoLocationService } from 'src/app/shared/geo-location.service';
import { BatteryService } from '../sf/battery/battery.service';
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

export interface OptionsStatus {
  theme: string,
  width:string, 
  closeOnSelect: boolean,
  placeholder: string,
}

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtOptionsBattery: DataTables.Settings = {};
  site: any[]= [];
  status: any[]= [];

  siteRaw!: any;
  siteData!: any;
  
  siteForm!: FormGroup;

  public options!: Options;
  public optionsStatus!: OptionsStatus;
  public optionsSiteCategory!: Options;
  public optionsBuilding!: Options;
  public optionsExchange!: Options;
  public optionsElectricCompany!: Options;
  public optionsPssOwner!: Options;

  defaultValueSiteCategory!: any;
  defaultValueBuilding!: any;
  defaultValueExchange!: any;
  defaultValueElectricCompany!: any;
  defaultValuePssOwner!: any;

  dataRegions!: any[];
  dataProvinces!:any[];
  dataTowns!:any[];
  dataBarangays!: any[];

  params!: any;
  select2Params!: any;
  model!: any;
  modelBattery!: any;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private siteService: SiteService,
    private modalService: NgbModal,
    private http: HttpClient,
    public select2Service: Select2Service,
    public tokenService: TokenService,
    private geoLocationService: GeoLocationService,
    public batteryService: BatteryService

  ) { }

  ngOnInit(): void {

    this.dtOptions = {
      destroy: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      scrollX: true,
      ajax: (dataTablesParameters: any, callback) => {
       
        console.log(dataTablesParameters)
        this.siteService.list(dataTablesParameters).subscribe(resp => {
          this.model = resp.data;
          console.log(resp)

          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });

      },
      columns: [
        { title:"Area", data: 'area_name', width: '3%' },
        { title:"Code", data: 'code', width: '3%' },
        { title:"Name", data: 'name', width: '10%' },
        { title:"Status", data: 'status', width: '5%' },
        { title:"Category", data: 'category_name', width: '10%' },
        // { title:"Cabinet Type", data: 'cabinet_type', width: '10%' },
        { title:"Address", data: 'address', width: '10%' },
        // { title:"Building Name", data: 'building_name', width: '10%' },
        // { title:"Exchange", data: 'exchange_name', width: '10%' },
        // { title:"Electric Company", data: 'electric_company_name', width: '10%' },
        // { title:"SIN", data: 'electric_company_sin', width: '10%' },
        // { title:"Meter", data: 'electric_company_meter', width: '10%' },
        // { title:"PSS", data: 'pss_owner_name', width: '10%' },
        // { data: 'code' },
        // { data: 'name' },
        // { data: 'status' },
        // { data: 'category_name' },
        // { data: 'cabinet_type' },
        // { data: 'address' },
        // // { data: 'region' },
        // // { data: 'province' },
        // // { data: 'city_municipality' },
        // // { data: 'barangay' },
        // // { data: 'street' },
        // { data: 'building_name' },
        // { data: 'exchange_name' },
        // { data: 'electric_company_name' },
        // { data: 'electric_company_sin' },
        // { data: 'electric_company_meter' },
        // { data: 'pss_owner_name' },
        { data: null, title: "Actions", width: "10%", className: "dt-body-center", orderable: false, searchable: false},
      ]
    };

    this.siteForm = this.fb.group({
      id: ['', Validators.required],
      code: ['', Validators.required],
      name: ['', Validators.required],
      area: null,
      status: null,
      site_category_id: ['', Validators.required],
      category_name: ['', Validators.required],
      cabinet_type: ['', Validators.required],
      region: ['', Validators.required],
      province: ['', Validators.required],
      city_municipality: ['', Validators.required],
      brgy: ['', Validators.required],
      street: ['', Validators.required],
      lot_no: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required],
      building_code: ['', Validators.required],
      building_name: ['', Validators.required],
      exchange_code: ['', Validators.required],
      exchange_name: ['', Validators.required],
      electric_company_code: ['', Validators.required],
      electric_company_name: ['', Validators.required],
      electric_company_sin: ['', Validators.required],
      electric_company_meter: ['', Validators.required],
      pss_owner_code: ['', Validators.required],
      pss_owner_name: ['', Validators.required],
    });

  }

  onChange($event: any) {
    let value = this.siteForm.get("site_category_id")?.value
    console.log(value);
  }

  onClick($event: any) {
    let value = this.siteForm.get("site_category_id")?.value
    console.log(value);
  }

  onChangeRegion($event: any) {

    let value = this.siteForm.get("region")?.value

    console.log(value);

    this.dataProvinces = [];
    this.dataTowns = [];
    this.dataBarangays = [];

    this.geoLocationService.provinces({region_code:value}).subscribe(async resp => {
      this.dataProvinces = await resp.results;
      console.log(resp)
    });

    this.siteForm.controls['province'].setValue(null);
    this.siteForm.controls['city_municipality'].setValue(null);
    this.siteForm.controls['brgy'].setValue(null);
 
  }

  onChangeProvince($event: any) {
    let value = this.siteForm.get("province")?.value

    this.geoLocationService.towns({province_code:value}).subscribe(async resp => {
      this.dataTowns = await resp.results;
      console.log(resp)
    });

    this.siteForm.controls['city_municipality'].setValue(null);
    this.siteForm.controls['brgy'].setValue(null);

    this.dataBarangays = [];

  }

  onChangeCityMunicipality($event: any) {
    let value = this.siteForm.get("city_municipality")?.value
    console.log(value);

    this.geoLocationService.brgy({town_code:value}).subscribe(async resp => {
      this.dataBarangays = await resp.results;
      console.log(resp)
    });

    this.siteForm.controls['brgy'].setValue(null);

  }

  add(targetModal:any) {
  
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      fullscreen: true,
      keyboard: true,
      size: 'xl',
    });

    this.status = [
      {
        id: 'Active',
        text: 'Active'
      },
      {
        id: 'Inactive',
        text: 'Inactive'
      }];

    //select2 status
    this.optionsStatus = {
      theme: "bootstrap",
      closeOnSelect: true,
      width: '100%',
      placeholder: 'Search Status',
    };

    this.optionsSiteCategory = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/site-category/select2", this.tokenService.getToken(), "", "Search Site Category");
    this.optionsBuilding = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/building/select2", this.tokenService.getToken(), "", "Search Building");
    this.optionsExchange = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/exchange/select2", this.tokenService.getToken(), "", "Search Exchange");
    this.optionsElectricCompany = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/electric-company/select2", this.tokenService.getToken(), "", "Search Electric Company");
    this.optionsPssOwner = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/pss-owner/select2", this.tokenService.getToken(), "", "Search Site Owner");

    this.siteForm = this.fb.group({
      id: [''],
      code: [''],
      name: [''],
      area: null,
      status: null,
      site_category_id: [''],
      category_name: [''],
      cabinet_type: [''],
      region: [''],
      province: [''],
      city_municipality: [''],
      brgy: [''],
      street: [''],
      lot_no: [''],
      longitude: [''],
      latitude: [''],
      building_code: [''],
      building_name: [''],
      exchange_code: [''],
      exchange_name: [''],
      electric_company_code: [''],
      electric_company_name: [''],
      electric_company_sin: [''],
      electric_company_meter: [''],
      pss_owner_code: [''],
      pss_owner_name: [''],
    });

    this.geoLocationService.regions({code:null}).subscribe( resp => {
      this.dataRegions = resp.results;
      console.log(resp)
    });

    this.geoLocationService.provinces({region_code:999999999}).subscribe( resp => {
      this.dataProvinces = resp.results;
      
      console.log(resp)
    });

    this.geoLocationService.towns({province_code:999999999}).subscribe( resp => {
      this.dataTowns = resp.results;
      console.log(resp)
    });

    this.geoLocationService.brgy({town_code:999999999}).subscribe( resp => {
      this.dataBarangays = resp.results;
      console.log(resp)
    });

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

    this.status = [
      {
        id: 'Active',
        text: 'Active'
      },
      {
        id: 'Inactive',
        text: 'Inactive'
      }];

    //select2 status
    this.optionsStatus = {
      theme: "bootstrap",
      closeOnSelect: true,
      width: '100%',
      placeholder: 'Search Status',
    };

    this.optionsSiteCategory = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/site-category/select2", this.tokenService.getToken(), "", "Search Site Category");
    this.optionsBuilding = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/building/select2", this.tokenService.getToken(), "", "Search Building");
    this.optionsExchange = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/exchange/select2", this.tokenService.getToken(), "", "Search Exchange");
    this.optionsElectricCompany = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/electric-company/select2", this.tokenService.getToken(), "", "Search Electric Company");
    this.optionsPssOwner = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/pss-owner/select2", this.tokenService.getToken(), "", "Search Site Owner");

    this.defaultValueSiteCategory = this.select2Service.setDefaultValueOnSelect2(raw.site_category_id, raw.site_category_name);
    this.defaultValueBuilding = this.select2Service.setDefaultValueOnSelect2(raw.building_code, raw.building_name);
    this.defaultValueExchange = this.select2Service.setDefaultValueOnSelect2(raw.exchange_code, raw.exchange_name);
    this.defaultValueElectricCompany = this.select2Service.setDefaultValueOnSelect2(raw.electric_company_code, raw.electric_company_name);
    this.defaultValuePssOwner = this.select2Service.setDefaultValueOnSelect2(raw.pss_owner_code, raw.pss_owner_name);
    
    this.siteForm.patchValue({
      id: raw.id,
      code: raw.code,
      site_id: raw.site_id,
      name: raw.name,
      area: raw.area,
      status: raw.status,
      site_category_id: raw.site_category_id,
      category_name: raw.category_name,
      cabinet_type: raw.cabinet_type,
      region: raw.region_code,
      province: raw.province_code,
      city_municipality: raw.city_municipality_code,
      brgy: raw.brgy_code,
      street: raw.street,
      lot_no: raw.lot_no,
      longitude: raw.longitude,
      latitude: raw.latitude,
      building_code: raw.building_code,
      exchange_code: raw.exchange_code,
      electric_company_code: raw.electric_company_code,
      electric_company_name: raw.electric_company_name,
      electric_company_sin: raw.electric_company_sin,
      electric_company_meter: raw.electric_company_meter,
      pss_owner_code: raw.pss_owner_code,

    });

    this.geoLocationService.regions({code:null}).subscribe( async resp => {
      this.dataRegions = await resp.results;
      console.log(resp)

      this.geoLocationService.provinces({region_code:raw.region_code}).subscribe(async resp => {
        this.dataProvinces = await resp.results;
        
        console.log(resp)

        this.geoLocationService.towns({province_code:raw.province_code}).subscribe(async resp => {
          this.dataTowns = await resp.results;
          console.log(resp)

          this.geoLocationService.brgy({town_code:raw.city_municipality_code}).subscribe(async resp => {
            this.dataBarangays = await resp.results;
            console.log(resp)
          });
      

        });

      });


    });

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

        this.siteService.delete(raw).subscribe((data: any) => {

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


  view(targetModal:any, site:any) {
 
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     fullscreen: true,
     keyboard: true,
     size: 'xl',
     
    });

    console.log(site)
    this.siteRaw = site;

    this.siteService.default({site_id:site.id}).subscribe(async resp => {
      this.siteData = await resp.results.site[0];
      console.log(this.siteData)
      console.log(resp.results.site[0].rectifier)
      // this.filtersLoaded = Promise.resolve(true);
    });


    // this.dtOptions = {
    //   destroy: true,
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   serverSide: true,
    //   processing: true,
    //   scrollX: true,
    //   stateSave: true,
    //   ajax: (dataTablesParameters: any, callback) => {
      
    //     // console.log(dataTablesParameters)
    //     this.batteryService.list(dataTablesParameters).subscribe(async resp => {
    //       this.modelBattery = await resp.data;

    //       callback({
    //         recordsTotal: resp.recordsTotal,
    //         recordsFiltered: resp.recordsFiltered,
    //         data: []
    //         // data: await resp.data
    //       });
    //     });

    //   },
    //   columns: [
    //     { title:"ID", data: 'id', width: '3%' },
    //     // { title:"Site Name", data: 'site_name', width: '10%' },
    //     // { title:"Code", data: 'code', width: '10%' },
    //     { title:"Status", data: 'status', width: '10%' },
    //     { title:"Manufacturer", data: 'battery_manufacturer_name', width: '10%' },
    //     { title:"Type", data: 'type', width: '10%' },
    //     // { title:"Index No", data: 'index_no', width: '10%' },
    //     { title:"Capacity", data: 'capacity', width: '10%' },
    //     { title:"Date Installed", data: 'date_installed', width: '10%' },
    //     { title:"Date Accepted", data: 'date_accepted', width: '10%' },
    //   ]
    // };

  
  }

  downloadFile(route: string, filename: string): void{

    const baseUrl = environment.API_URL+'api/v1/site/export';
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
    
    const raw = this.siteForm.getRawValue();
    console.log(raw)

    await this.siteService.save(raw).subscribe((data: any) => {

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
    
    const raw = this.siteForm.getRawValue();
    console.log(raw)

    await this.siteService.update(raw).subscribe((data: any) => {

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
