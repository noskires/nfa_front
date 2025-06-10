import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { DataTablesModule } from 'angular-datatables';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './shared/auth.interceptor';
import { BatteryComponent } from './components/sf/battery/battery.component';
import { SignupComponent } from './components/signup/signup.component';
import { RectifierComponent } from './components/sf/rectifier/rectifier.component';
import { AcuComponent } from './components/sf/acu/acu.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
// import { Select2Module } from 'ng-select2-component';
import { NgSelect2Module } from 'ng-select2';

import { NgApexchartsModule } from 'ng-apexcharts';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SiteComponent } from './components/site/site.component';
import { NetworkElementComponent } from './components/network-element/network-element.component';
import { DcPanelComponent } from './components/dc-panel/dc-panel.component';
import { MainComponent } from './components/charts/main/main.component';
import { BatteryDashboardComponent } from './components/charts/battery-dashboard/battery-dashboard.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { GensetComponent } from './components/sf/genset/genset.component';
import { SiteDashboardComponent } from './components/charts/site-dashboard/site-dashboard.component';
import { AlarmsComponent } from './components/charts/alarms/alarms.component';
import { OspmComponent } from './components/sf/ospm/ospm.component';
import { PortalComponent } from './components/portal/portal.component';
import { OspmDivisionComponent } from './components/sf/ospm-division/ospm-division.component';
import { OspmSectionComponent } from './components/sf/ospm-section/ospm-section.component';
import { OspmDataComponent } from './components/ospm-data/ospm-data.component';
import { OspmDashboardComponent } from './components/charts/ospm-dashboard/ospm-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BatteryComponent,
    SignupComponent,
    RectifierComponent,
    AcuComponent,
    SidebarComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SiteComponent,
    NetworkElementComponent,
    DcPanelComponent,
    MainComponent,
    BatteryDashboardComponent,
    OrganizationComponent,
    GensetComponent,
    SiteDashboardComponent,
    AlarmsComponent,
    OspmComponent,
    PortalComponent,
    OspmDivisionComponent,
    OspmSectionComponent,
    OspmDataComponent,
    OspmDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    NgbModule,
    BrowserAnimationsModule,
    TypeaheadModule,
    NgSelect2Module,
    NgApexchartsModule
    // Select2Module
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
