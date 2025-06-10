import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(private http: HttpClient) {}

  default(params: any): Observable<any> {
    return this.http.post(environment.API_URL+'api/v1/site/default', params);
  }

  list(params: any): Observable<any> {
    return this.http.post(environment.API_URL+'api/v1/site/dtables', params);
  }

  list2(params: any): Observable<any> {
    return this.http.post(environment.API_URL+'api/v2/site', params);
  }

  save(params: any): Observable<any> {
    return this.http.post(environment.API_URL+'api/site', params);
  }

  update(params: any): Observable<any> {
    return this.http.post(environment.API_URL+'api/v1/site/update', params);
  }

  delete(params: any): Observable<any> {
    return this.http.post(environment.API_URL+'api/v1/site/delete', params);
  }

  summaryPerSiteCategory(params: any): Observable<any> {
    return this.http.post(environment.API_URL+'api/v1/site/get-count-site-category', params);
  }

}
