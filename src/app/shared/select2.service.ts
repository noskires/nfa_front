import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class Select2Service {

  constructor(private http: HttpClient) {}

  getDataOnselect2(theme:string, multiple:boolean, closeOnSelect:boolean, width:string, url:string, token:any, value:any, placeholder:string ) {
    
    return {
      theme: theme,
      multiple: multiple,
      closeOnSelect: closeOnSelect,
      width: width,
      ajax: {
        headers: {
          "Authorization" : "Bearer "+token,
          "Content-Type" : "application/json",
        },
        url: url,
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
      value: value,
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
}
