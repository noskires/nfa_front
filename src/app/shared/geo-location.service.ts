import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,  } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  constructor(private http: HttpClient) {}

  regions(params: any): Observable<any> {
    return this.http.post(environment.API_URL+'api/v1/geo/regions/select2', params);
  }

  provinces(params: any): Observable<any> {
    return this.http.post(environment.API_URL+'api/v1/geo/provinces/select2', params);
  }

  towns(params: any): Observable<any> {
    return this.http.post(environment.API_URL+'api/v1/geo/towns/select2', params);
  }

  brgy(params: any): Observable<any> {
    return this.http.post(environment.API_URL+'api/v1/geo/barangays/select2', params);
  }
  
}
