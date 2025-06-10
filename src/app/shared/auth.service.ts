import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// User interface
export class User {
  name!: String;
  email!: String;
  password!: String;
  password_confirmation!: String;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(private http: HttpClient) {}
  // User registration
  register(user: User): Observable<any> {
    return this.http.post(environment.API_URL+'api/auth/register', user);
  }

  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>(environment.API_URL+'api/auth/login', user);
  }

  // Access user profile
  profileUser(params: any): Observable<any> {
    return this.http.post(environment.API_URL+'api/auth/profile', params);
  }
}