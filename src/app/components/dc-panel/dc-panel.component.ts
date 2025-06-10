import { AfterViewInit, Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/shared/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataTableDirective,  } from 'angular-datatables';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/shared/token.service';
import { Select2OptionData } from 'ng-select2';
import Swal from 'sweetalert2';
import { DcPanelService } from './dc-panel.service';
import { DcPanelItemService } from './dc-panel-item.service';
import { RectifierService } from '../sf/rectifier/rectifier.service';
import { environment } from 'src/environments/environment';
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
  selector: 'app-dc-panel',
  templateUrl: './dc-panel.component.html',
  styleUrls: ['./dc-panel.component.css']
})
export class DcPanelComponent implements OnInit {
  public defaultValue!: Array<Select2OptionData>;

  @ViewChild(DataTableDirective, {static: false})

  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtOptionsDcPanelItems: DataTables.Settings = {};
  dcPanel: any[]= [];
  dcPanelItems: any[]= [];
  status: any[]= [];
  model: any[]= [];
  
  dcPanelForm!: FormGroup;
  dcPanelItemForm!: FormGroup;

  editDcPanelItemModal!: any

  public options!: Options;
  public optionsNe!: Options;
  public optionsRectifier!: Options;
  public optionsManufacturer!: Options;
  public optionsSite!: Options;

  
  defaultNe!: any;
  defaultSite: any = [];
  defaultRectifier!: any;
  defaultManufacturer!: any;
  value1!: any;
  title!: any;
  
  
  params!: any;
  select2Params!: any;

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public dcPanelService: DcPanelService,
    public dcPanelItemService: DcPanelItemService,
    public rectifierService: RectifierService,
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
      ajax: (dataTablesParameters: any, callback) => {
       
        console.log(dataTablesParameters)
        this.dcPanelService.list(dataTablesParameters).subscribe( resp => {
          this.model =  resp.data;
          console.log(resp)

          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });

      },
      columns: [
        { data: 'site_name' },
        { data: 'rectifier_name' },
        { data: 'manufacturer_name' },
        { data: 'index_no' },
        { data: 'model' },
        { data: 'maintainer' },
        { data: 'status' },
        { data: 'date_installed' },
        { data: 'date_accepted' },
        { data: null, title: "Actions", width: "10%", className: "dt-body-center", orderable: false, searchable: false},
      ]
    };

    this.dcPanelForm = this.fb.group({
      id: ['', Validators.required],
      site_id: ['', Validators.required],
      code: ['', Validators.required],
      rectifier: ['', Validators.required],
      manufacturer: ['', Validators.required],
      index_no: ['', Validators.required],
      model: ['', Validators.required],
      maintainer: ['', Validators.required],
      status: ['', Validators.required],
      date_installed: ['', Validators.required],
      date_accepted: ['', Validators.required],
      fuse_breaker_number: ['', Validators.required],
      fuse_breaker_rating: ['', Validators.required],
      feed_source: ['', Validators.required],
      no_of_runs_and_cable_size: ['', Validators.required],
      source_voltage: ['', Validators.required],
      source_electric_current: ['', Validators.required],
      status_of_breakers: ['', Validators.required],
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

    this.optionsSite = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/site/select2", this.tokenService.getToken(), "", "Search Site");
    this.optionsRectifier = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/rectifier/select2", this.tokenService.getToken(), "", "Search Rectifier");
    this.optionsManufacturer = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/manufacturer/select2", this.tokenService.getToken(), "", "Search Manufacturer");


    this.dcPanelForm = this.fb.group({
      id: [''],
      site_id: [''],
      code: [''],
      rectifier: [''],
      manufacturer: [''],
      index_no: [''],
      model: [''],
      maintainer: [''],
      status: [''],
      date_installed: [''],
      date_accepted: [''],
      fuse_breaker_number: [''],
      fuse_breaker_rating: [''],
      feed_source: [''],
      no_of_runs_and_cable_size: [''],
      source_voltage: [''],
      source_electric_current: [''],
      status_of_breakers: [''],
      remarks: [''],

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

    this.optionsSite = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/site/select2", this.tokenService.getToken(), "", "Search Site");
    this.optionsRectifier = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/rectifier/select2", this.tokenService.getToken(), "", "Search Rectifier");
    this.optionsManufacturer = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/manufacturer/select2", this.tokenService.getToken(), "", "Search Manufacturer");

    this.defaultSite = this.select2Service.setDefaultValueOnSelect2(raw.dc_panel_site_id, raw.site_name);
    this.defaultRectifier = this.select2Service.setDefaultValueOnSelect2(raw.rectifier_id, raw.rectifier_name);
    this.defaultManufacturer = this.select2Service.setDefaultValueOnSelect2(raw.manufacturer_id, raw.manufacturer_name);
  
    this.dcPanelForm.patchValue({
      id: raw.id,
      site_id: raw.dc_panel_site_id,
      code: raw.code,
      rectifier: raw.rectifier_id,
      manufacturer: raw.manufacturer_id,
      index_no: raw.index_no,
      model: raw.model,
      maintainer: raw.maintainer,
      status: raw.status,
      date_installed: raw.date_installed,
      date_accepted: raw.date_accepted,
      fuse_breaker_number: raw.fuse_breaker_number,
      fuse_breaker_rating: raw.fuse_breaker_rating,
      feed_source: raw.feed_source,
      no_of_runs_and_cable_size: raw.no_of_runs_and_cable_size,
      source_voltage: raw.source_voltage,
      source_electric_current: raw.source_electric_current,
      status_of_breakers: raw.status_of_breakers,
      remarks: raw.remarks,

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

        this.dcPanelService.delete(raw).subscribe((data: any) => {

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

  view(targetModal:any, raw:any) {

    console.log(raw)

    this.title = raw.dc_panel_name;

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      fullscreen: true,
      keyboard: true,
      size: 'xl',
    });

    this.dcPanelItemForm = this.fb.group({
      network_element_id: [''],
      breaker_no: [''],
      current: [''],

    });

    this.optionsNe = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/ne/select2", this.tokenService.getToken(), "", "Search NE");

    // dtables
    this.dtOptionsDcPanelItems = {
      destroy: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      stateSave: true,
      scrollX: true,
      ajax: (dataTablesParameters: any, callback) => {
       
        dataTablesParameters['dc_panel_id'] = raw.id;
        console.log(dataTablesParameters)
        this.dcPanelItems = [];
        this.dcPanelItemService.list(dataTablesParameters).subscribe(async resp => {
          this.dcPanelItems = await resp.data;
          console.log(resp)

          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });

        });
      },
      columns: [
        // { data: 'code', width:'6%'}, 
        { data: 'code', width: '20%'}, 
        { data: 'breaker_no', width: '30%'}, 
        { data: 'current', width: '14%'}, 
        { data: null, title: 'Actions', width: '5%', orderable:false},      
      ],

    };
    
    this.dcPanelItemForm = this.fb.group({
      id: [''],
      dc_panel_id: raw.id,
      network_element_id: [''],
      breaker_no: [''],
      current: [''],
    });

  }

  editDcPanelItem(targetModal:any, raw:any) {
  
    console.log(raw)

    this.editDcPanelItemModal = this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      fullscreen: true,
      keyboard: true,
      size: 'xl',
    });

    this.defaultNe = this.select2Service.setDefaultValueOnSelect2(raw.ne_id, raw.ne_name);
  
    console.log(this.defaultNe)

    this.optionsNe = this.select2Service.getDataOnselect2("bootstrap", false, true, "100%", environment.API_URL+"api/v1/ne/select2", this.tokenService.getToken(), "", "Search NE");

    this.dcPanelItemForm.patchValue({
      id: raw.id,
      code: raw.code,
      dc_panel_id: raw.dc_panel_id,
      network_element_id: raw.ne_id,
      breaker_no: raw.breaker_no,
      current: raw.current,
    });

  }

  removeDcPanelItem(raw: any) {
    
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

        this.dcPanelItemService.delete(raw).subscribe((data: any) => {

          $('#dt1').DataTable().ajax.reload();

          Swal.fire(
            'Deleted!',
            'This record has been deleted.',
            'success'
          )

        });

      }
    })
  }

  async onSubmitSave(): Promise<any> {
    
    const raw = this.dcPanelForm.getRawValue();
    console.log(raw)

    await this.dcPanelService.save(raw).subscribe((data: any) => {

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
    
    const raw = this.dcPanelForm.getRawValue();
    console.log(raw)

    await this.dcPanelService.update(raw).subscribe((data: any) => {

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

  async onSubmitDcPanelItem(): Promise<any> {
    
    const raw = this.dcPanelItemForm.getRawValue();
    console.log(raw)

    await this.dcPanelItemService.save(raw).subscribe((data: any) => {

      console.log(data)
      $('#dt1').DataTable().ajax.reload();

      Swal.fire({
        // position: 'top-end',
        icon: 'success',
        title: 'Successfully save!',
        showConfirmButton: false,
        timer: 1500
      })

      this.dcPanelItemForm = this.fb.group({
        id: [''],
        dc_panel_code: raw.dc_panel_code,
        code: [''],
        network_element_id: [''],
        breaker_no: [''],
        current: [''],
      });
      
    });

  }

  async onUpdateDcPanelItem(): Promise<any> {
    
    const raw = this.dcPanelItemForm.getRawValue();
    console.log(raw)

    await this.dcPanelItemService.update(raw).subscribe((data: any) => {

      console.log(data)
      $('#dt1').DataTable().ajax.reload();

      Swal.fire({
        // position: 'top-end',
        icon: 'success',
        title: 'Successfully save!',
        showConfirmButton: false,
        timer: 1500
      })

      this.dcPanelItemForm = this.fb.group({
        id: [''],
        dc_panel_id: raw.dc_panel_id,
        code: [''],
        network_element_id: [''],
        breaker_no: [''],
        current: [''],
      });

      this.editDcPanelItemModal.dismiss();
      
    });

  }

}
