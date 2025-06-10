import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OspmDataService {

  constructor(private http: HttpClient) {}

  list(params: any): Observable<any> {
    return this.http.post(environment.API_URL+'api/v1/ospm/dtables', params);
  }

  save(params: any): Observable<any> {
    return this.http.post(environment.API_URL+'api/ospm', params);
  }

  update(params: any): Observable<any> {
    return this.http.post(environment.API_URL+'api/v1/ospm/update', params);
  }

  delete(params: any): Observable<any> {
    return this.http.post(environment.API_URL+'api/v1/ospm/delete', params);
  }

  summary(params: any): Observable<any> {
    return this.http.post(environment.API_URL+'api/v1/ospm/summary', params);
  }
}
