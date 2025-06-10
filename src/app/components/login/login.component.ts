import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenService } from 'src/app/shared/token.service';
import { AuthStateService } from 'src/app/shared/auth-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors: any = null;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService
  ){
      this.loginForm = this.fb.group({
        email:[],
        password:[]
      });
  }

  ngOnInit() {}

  onSubmit() {
    this.authService.signin(this.loginForm.value).subscribe(
      (result) => {
        console.log(result)
        this.responseHandler(result);
      },
      (error) => {
        this.errors = error.error;
      },
      () => {
        this.authState.setAuthState(true);
        this.loginForm.reset();
        this.router.navigateByUrl('/dashboard/site');
      }
    );
  }
  // Handle response
  responseHandler(data:any) {

    this.token.handleData(data.access_token);
    console.log(data.access_token)
  }

}
