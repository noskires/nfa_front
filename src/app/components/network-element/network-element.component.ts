import { AfterViewInit, Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './../../shared/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataTableDirective,  } from 'angular-datatables';
import { Router, ActivatedRoute } from '@angular/router';
// import { EmployeesService } from '../employees/employees.service';
import { NetworkElementService } from './network-element.service';
import { TokenService } from "../../shared/token.service";
import { Select2OptionData } from 'ng-select2';
// import { RectifierService } from '../support-facilities/rectifier/rectifier.service';
// import { RectifierItemService } from '../support-facilities/rectifier/rectifier-item.service';
// import { BatteryService } from '../support-facilities/battery/battery.service';
import { environment } from '../../../environments/environment';
import { Select2Service } from 'src/app/shared/select2.service';
import Swal from 'sweetalert2'

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
  selector: 'app-network-element',
  templateUrl: './network-element.component.html',
  styleUrls: ['./network-element.component.css']
})
export class NetworkElementComponent implements OnInit {

  public defaultValue!: Array<Select2OptionData>;

  @ViewChild(DataTableDirective, {static: false})

  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtOptionsRectifier: DataTables.Settings = {};
  dtOptionsBattery: DataTables.Settings = {};
  

  
  ne: any[]= [];
  rectifier: any[]= [];
  battery: any[]= [];
  status: any[]= [];
  
  neRaw!: any;
  neData!: any;

  neForm!: FormGroup;
  
  public options!: Options;
  public optionsSite!: Options;
  public optionsManufacturer!: Options;
  public optionsSubDomain!: Options;

  defaultSite!: any;
  defaultManufacturer!: any;
  defaultSubDomain!: any;
  params!: any;
  select2Params!: any;

  filtersLoaded!: Promise<boolean>;

  constructor(

    private http: HttpClient,
    public authService: AuthService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public networkElementService: NetworkElementService,
    // public employeeService: EmployeesService,
    public tokenService: TokenService,
    // public rectifierService: RectifierService,
    // public rectifierItemService: RectifierItemService,
    // public batteryService: BatteryService,
    public select2Service: Select2Service,

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
        this.networkElementService.list(dataTablesParameters).subscribe(resp => {
          this.ne = resp.data;
          console.log(resp)

          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });

      },
      columns: [
        { data: 'area_name' },
        { data: 'site_name' },
        { data: 'code' },
        { data: 'name' },
        { data: 'type_name' },
        { data: 'status' },
        { data: 'manufacturer_name' },
        { data: 'device_ip_address' },
        { data: 'software_version' },
        { data: null, title: "Actions", width: "10%", className: "dt-body-center", orderable: false, searchable: false},
      ]
    };

    this.neForm = this.fb.group({
      id: ['', Validators.required],
      site_id: ['', Validators.required],
      code: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      status: ['', Validators.required],
      manufacturer: ['', Validators.required],
      device_ip_address: ['', Validators.required],
      software_version: ['', Validators.required],
      foc_assignment_uplink1: ['', Validators.required],
      foc_assignment_uplink2: ['', Validators.required],
      hon_assignment_uplink_port1: ['', Validators.required],
      hon_assignment_uplink_port2: ['', Validators.required],
      date_decommissioned: ['', Validators.required],
      date_installed: ['', Validators.required],
      date_accepted: ['', Validators.required],
      new_node_name: ['', Validators.required],
    });

  }

  add(targetModal:any) {
  
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      fullscreen: true,
      keyboard: true,
      size: 'xl',
    });

    this.neForm = this.fb.group({
      id: [''],
      site_id: [''],
      code: [''],
      name: [''],
      type: [''],
      status: null,
      manufacturer: [''],
      device_ip_address: [''],
      software_version: [''],
      foc_assignment_uplink1: [''],
      foc_assignment_uplink2: [''],
      hon_assignment_uplink_port1: [''],
      hon_assignment_uplink_port2: [''],
      date_decommissioned: [''],
      date_installed: [''],
      date_accepted: [''],
      new_node_name: [''],

    });

    this.optionsSite = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/site/select2", this.tokenService.getToken(), "", "Search Site");
    this.optionsManufacturer = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/manufacturer/select2", this.tokenService.getToken(), "", "Search Manufacturer");
    this.optionsSubDomain = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/sub-domain/select2", this.tokenService.getToken(), "", "Search Type");

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
  
    this.neForm.patchValue({
      id: raw.id,
      site_id: raw.site_id,
      code: raw.code,
      name: raw.name,
      type: raw.type_id,
      status: raw.status,
      manufacturer: raw.manufacturer_id,
      device_ip_address: raw.device_ip_address,
      software_version: raw.software_version,
      foc_assignment_uplink1: raw.foc_assignment_uplink1,
      foc_assignment_uplink2: raw.foc_assignment_uplink2,
      hon_assignment_uplink_port1: raw.hon_assignment_uplink_port1,
      hon_assignment_uplink_port2: raw.hon_assignment_uplink_port2,
      date_decommissioned: raw.date_decommissioned,
      date_installed: raw.date_decommissioned,
      date_accepted: raw.date_accepted,
      new_node_name: raw.new_node_name,

    });

    console.log(this.defaultSite);


    this.optionsSite = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/site/select2", this.tokenService.getToken(), "", "Search Site");
    this.optionsManufacturer = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/manufacturer/select2", this.tokenService.getToken(), "", "Search Manufacturer");
    this.optionsSubDomain = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/sub-domain/select2", this.tokenService.getToken(), "", "Search Type");

    this.defaultSite = this.select2Service.setDefaultValueOnSelect2(raw.site_id, raw.site_name);
    this.defaultManufacturer = this.select2Service.setDefaultValueOnSelect2(raw.manufacturer_id, raw.manufacturer_name);
    this.defaultSubDomain = this.select2Service.setDefaultValueOnSelect2(raw.type_id, raw.type_name);

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

        this.networkElementService.delete(raw).subscribe((data: any) => {

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

  view(targetModal:any, ne:any) {
 
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     fullscreen: true,
     keyboard: true,
     size: 'xl',
     
    });

    console.log(ne)
    this.neRaw = ne;

    console.log(this.neRaw)

    this.networkElementService.list2({ne_id:ne.id}).subscribe(async resp => {

      console.log(resp)
      this.neData = await resp.network_element;
      console.log(this.neData)
      this.filtersLoaded = Promise.resolve(true);
    });

  
  }

  downloadFile(route: string, filename: string): void{
    const baseUrl = environment.API_URL+'api/v1/ne/export';
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
    
    const raw = this.neForm.getRawValue();
    console.log(raw)

    await this.networkElementService.save(raw).subscribe((data: any) => {

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
    
    const raw = this.neForm.getRawValue();
    console.log(raw)

    await this.networkElementService.update(raw).subscribe((data: any) => {

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
