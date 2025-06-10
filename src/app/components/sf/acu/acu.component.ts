import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { AuthService } from 'src/app/shared/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AcuService } from './acu.service';
import { SiteService } from '../../site/site.service';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/shared/token.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Select2Service } from 'src/app/shared/select2.service';

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
  selector: 'app-acu',
  templateUrl: './acu.component.html',
  styleUrls: ['./acu.component.css']
})
export class AcuComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};

  acuForm!: FormGroup;

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
    private acuService: AcuService,
    private siteService: SiteService,
    private modalService: NgbModal,
    private select2Service: Select2Service,
    private tokenService: TokenService,
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
        this.acuService.list(dataTablesParameters).subscribe(async resp => {
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
        { title:"ID", data: 'id', width: '3%' },
        // { title:"Site Name", data: 'site_name', width: '10%' },
        // { title:"Code", data: 'code', width: '10%' },
        // { title:"Status", data: 'status', width: '10%' },
        // { title:"Manufacturer", data: 'brand', width: '10%' },
        { title:"Type", data: 'type', width: '10%' },
        // { title:"Index No", data: 'index_no', width: '10%' },
        { title:"Capacity", data: 'capacity', width: '10%' },
        { title:"Brand", data: 'brand', width: '10%' },
        { title:"Model", data: 'model', width: '10%' },
        { title:"Date Installed", data: 'date_installed', width: '10%' },
        { title:"Date Accepted", data: 'date_accepted', width: '10%' },
        { title:"Actions", defaultContent: "", width: '10%' },
      ]
    };


    this.acuForm = this.fb.group({
      id: ['', Validators.required],
      site_id: ['', Validators.required],
      code: ['', Validators.required],
      manufacturer: ['', Validators.required],
      // serial_no: ['', Validators.required],
      // index_no: ['', Validators.required],
      model: ['', Validators.required],
      brand: ['', Validators.required],
      // status: ['', Validators.required],
      date_installed: ['', Validators.required],
      date_accepted: ['', Validators.required],
      capacity: ['', Validators.required],
      type: ['', Validators.required],
      installation_type: ['', Validators.required],
      operation_type: ['', Validators.required],
      // remarks: ['', Validators.required],
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

    this.acuForm = this.fb.group({
      id: [''],
      site_id: [''],
      code: [''],
      manufacturer: [''],
      // serial_no: [''],
      model: [''],
      capacity: [''],
      // status: [''],
      date_installed: [''],
      date_accepted: [''],
      type: [''],
      brand: [''],
      installation_type: [''],
      operation_type: [''],
      // remarks: [''],
    
    });

    this.optionsSite = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/site/select2", this.tokenService.getToken(), "", "Search Site");
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
  
    this.acuForm.patchValue({

      id: raw.id,
      code: raw.code,
      site_id: raw.site_id,
      manufacturer: raw.manufacturer_id,
      // serial_no: raw.serial_no,
      // index_no: raw.index_no,
      capacity: raw.capacity,
      model: raw.model,
      type: raw.type,
      brand: raw.brand,
      installation_type: raw.installation_type,
      operation_type: raw.operation_type,
      // status: raw.status,
      date_installed: raw.date_installed,
      date_accepted: raw.date_accepted,
  
      // status: raw.status,
      // remarks: raw.remarks,

    });

    this.optionsSite = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/site/select2", this.tokenService.getToken(), "", "Search Site");
    this.optionsManufacturer = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/manufacturer/select2", this.tokenService.getToken(), "", "Search Manufacturer");

    this.defaultSite = this.select2Service.setDefaultValueOnSelect2(raw.site_id, raw.site_name);
    this.defaultManufacturer = this.select2Service.setDefaultValueOnSelect2(raw.manufacturer_id, raw.manufacturer_name);
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

        this.acuService.delete(raw).subscribe(async (data: any) => {

          await this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.draw();
    
            Swal.fire('Deleted!', 'This record has been deleted.', 'success')
            
          });


        });

      }
    })
  }

  async onSubmitSave(): Promise<any> {
    
    const raw = this.acuForm.getRawValue();
    console.log(raw)

    await this.acuService.save(raw).subscribe((data: any) => {

      console.log(data)
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.draw();

        Swal.fire({icon: 'success', title: 'Successfully save!', showConfirmButton: false, timer: 1500})
      });

      this.modalService.dismissAll();

    });

  }

  async onSubmitUpdate(): Promise<any> {
    
    const raw = this.acuForm.getRawValue();
    console.log(raw)

    await this.acuService.update(raw).subscribe((data: any) => {

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
