import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RectifierService {

  constructor(private http: HttpClient) {}

  list(params: any): Observable<any> {
    return this.http.post(environment.API_URL+'api/v1/rectifier/dtables', params);
  }

  save(params: any): Observable<any> {
    return this.http.post(environment.API_URL+'api/rectifier', params);
  }

  update(params: any): Observable<any> {
    return this.http.post(environment.API_URL+'api/v1/rectifier/update', params);
  }

  delete(params: any): Observable<any> {
    return this.http.post(environment.API_URL+'api/v1/rectifier/delete', params);
  }

}
