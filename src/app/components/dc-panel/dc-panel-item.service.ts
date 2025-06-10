import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DcPanelItemService {

  constructor(private http: HttpClient) {}

  list(params: any): Observable<any> {
    return this.http.post(environment.API_URL+'api/v1/dc-panel-item/dtables', params);
  }

  save(params: any): Observable<any> {
    return this.http.post(environment.API_URL+'api/dc-panel-item', params);
  }

  update(params: any): Observable<any> {
    return this.http.post(environment.API_URL+'api/v1/dc-panel-item/update', params);
  }

  delete(params: any): Observable<any> {
    return this.http.post(environment.API_URL+'api/v1/dc-panel-item/delete', params);
  }

}
