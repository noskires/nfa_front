import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { AuthService } from 'src/app/shared/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OspmDataService } from './ospm-data.service';
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
  selector: 'app-ospm-data',
  templateUrl: './ospm-data.component.html',
  styleUrls: ['./ospm-data.component.css']
})
export class OspmDataComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};

  ospmForm!: FormGroup;

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
    private ospmService: OspmDataService,
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
        this.ospmService.list(dataTablesParameters).subscribe(async resp => {
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
        { title:"Work Order", data: 'work_order_no', width: '3%' },
        { title:"Status", data: 'status', width: '3%' },
        { title:"Severity", data: 'severity', width: '3%' },
        { title:"Company", data: 'company', width: '3%' },
        { title:"Region", data: 'region', width: '10%' },
        { title:"Division", data: 'division', width: '10%' },
        { title:"Section", data: 'section', width: '5%' },
        { title:"Contractor", data: 'contractor', width: '5%' },
        { title:"Sub Contractor", data: 'sub_contractor', width: '5%' },
        { title:"Endorsed Date", data: 'endorsed_at', width: '10%' },
        { title:"Service Restored Date", data: 'service_restored_at', width: '10%' },
        { title:"MTTR Service Restoration", data: 'mttr_service_restored', width: '10%' },
        { title:"Service Resto Status", data: 'mttr_service_restored_sla', width: '10%' },
        { title:"Full Link Restored Date", data: 'full_link_restored_at', width: '10%' },
        { title:"MTTR Full Link Restoration", data: 'mttr_full_link_restored', width: '10%' },
        { title:"Full Link Resto Status", data: 'mttr_full_link_restored_sla', width: '10%' },
        { title:"Ageing Resto (Days)", data: 'ageing_service_restored', width: '10%' },
        { title:"Ageing Resto Group", data: 'ageing_service_restored_group', width: '10%' },
        { data: null, title: "Actions", width: "10%", className: "dt-body-center", orderable: false, searchable: false},
      ]
    };


    this.ospmForm = this.fb.group({
      id: ['', Validators.required],
      work_order_no: ['', Validators.required],
      status: ['', Validators.required],
      severity: ['', Validators.required],
      company: ['', Validators.required],
      region: ['', Validators.required],
      division: ['', Validators.required],
      section: ['', Validators.required],
      contractor: ['', Validators.required],
      sub_contractor: ['', Validators.required],
      endorsed_at: ['', Validators.required],
      service_restored_at: ['', Validators.required],
      full_link_restored_at: ['', Validators.required],
      remarks: ['', Validators.required],
    });
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

    this.ospmForm = this.fb.group({
      id: [''],
      work_order_no: [''],
      status: null,
      severity: null,
      company: null,
      region: null,
      division: [''],
      section: [''],
      contractor: null,
      sub_contractor: [''],
      endorsed_at: [''],
      service_restored_at: [''],
      full_link_restored_at: [''],
      remarks: [''],

    });


    // this.optionsSite = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/site/select2", this.tokenService.getToken(), "", "Search Site");
    // this.optionsRectifier = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/rectifier/select2", this.tokenService.getToken(), "", "Search Rectifier");
    // this.optionsManufacturer = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/manufacturer/select2", this.tokenService.getToken(), "", "Search Manufacturer");
  
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

  
    this.ospmForm.patchValue({
      id: raw.id,
      work_order_no: raw.work_order_no,
      status: raw.status,
      severity: raw.severity,
      company: raw.company,
      region: raw.region,
      division: raw.division,
      section: raw.section,
      contractor: raw.contractor,
      sub_contractor: raw.sub_contractor,
      endorsed_at: raw.endorsed_at,
      service_restored_at: raw.service_restored_at,
      full_link_restored_at: raw.full_link_restored_at,
      remarks: raw.remarks,

    });

    // this.optionsSite = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/site/select2", this.tokenService.getToken(), "", "Search Site");
    // this.optionsRectifier = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/rectifier/select2", this.tokenService.getToken(), "", "Search Rectifier");
    // this.optionsManufacturer = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/manufacturer/select2", this.tokenService.getToken(), "", "Search Manufacturer");
 
    // this.defaultSite = this.select2Service.setDefaultValueOnSelect2(raw.battery_site_id, raw.site_name);
    // this.defaultRectifier = this.select2Service.setDefaultValueOnSelect2(raw.rectifier_id, raw.rectifier_name);
    // this.defaultManufacturer = this.select2Service.setDefaultValueOnSelect2(raw.battery_manufacturer_id, raw.battery_manufacturer_name);
  
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
        this.ospmService.delete(raw).subscribe((data: any) => {

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
    const baseUrl = environment.API_URL+'api/v1/ospm/export';
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
    
    const raw = this.ospmForm.getRawValue();
    console.log(raw)

    await this.ospmService.save(raw).subscribe((data: any) => {

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
    
    const raw = this.ospmForm.getRawValue();
    console.log(raw)

    await this.ospmService.update(raw).subscribe((data: any) => {

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