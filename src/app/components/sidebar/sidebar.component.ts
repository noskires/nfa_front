import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userInfo!: any;
  params!: any;
  perms!: any;  

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.profileUser(this.params).subscribe(async resp=> { 
      console.log(resp)
      this.userInfo = await resp.name;
      console.log(this.userInfo)
    })
  }

}
