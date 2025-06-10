import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenService } from 'src/app/shared/token.service';
import { AuthStateService } from 'src/app/shared/auth-state.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

// @Injectible({
//   providedIn: 'root'
// })

// export class User {
//   name!: String;
//   email!: String;
//   password!: String;
//   c_password!: String;
// }

export class SignupComponent implements OnInit {


  ngOnInit(): void {
    
  }

  ngOnSubmit() {

  }

}
