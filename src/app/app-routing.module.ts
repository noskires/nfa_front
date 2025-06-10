import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { BatteryComponent } from './components/sf/battery/battery.component';
import { RectifierComponent } from './components/sf/rectifier/rectifier.component';
import { AcuComponent } from './components/sf/acu/acu.component';
import { NetworkElementComponent } from './components/network-element/network-element.component';
import { SiteComponent } from './components/site/site.component';
import { DcPanelComponent } from './components/dc-panel/dc-panel.component';
import { MainComponent } from './components/charts/main/main.component';
import { BatteryDashboardComponent } from './components/charts/battery-dashboard/battery-dashboard.component';
import { GensetComponent } from './components/sf/genset/genset.component';
import { SiteDashboardComponent } from './components/charts/site-dashboard/site-dashboard.component';
import { AlarmsComponent } from './components/charts/alarms/alarms.component';
import { OspmComponent } from './components/sf/ospm/ospm.component';
import { PortalComponent } from './components/portal/portal.component';
import { OspmDivisionComponent } from './components/sf/ospm-division/ospm-division.component';
import { OspmSectionComponent } from './components/sf/ospm-section/ospm-section.component';
import { OspmDataComponent } from './components/ospm-data/ospm-data.component';
import { OspmDashboardComponent } from './components/charts/ospm-dashboard/ospm-dashboard.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'home', component: MainComponent},
  { path: 'dashboard', component: HomeComponent}, 
  { path: 'network-element', component: NetworkElementComponent},
  { path: 'site', component: SiteComponent},
  // SF
  { path: 'sf/battery', component: BatteryComponent },
  { path: 'sf/rectifier', component: RectifierComponent },
  { path: 'sf/acu', component: AcuComponent },
  { path: 'sf/dc-panel', component: DcPanelComponent },
  { path: 'sf/genset', component: GensetComponent },

  // Dashboard
  { path: 'dashboard/main', component: MainComponent },
  { path: 'dashboard/battery', component: BatteryDashboardComponent },
  { path: 'dashboard/site', component: SiteDashboardComponent },
  { path: 'dashboard/alarms', component: AlarmsComponent },
  { path: 'dashboard/ospm', component: OspmDashboardComponent },

  // Portal
  { path: 'portal', component: PortalComponent },

  // OSPM
  { path: 'ospm', component: OspmComponent },
  { path: 'ospm/division', component: OspmDivisionComponent },
  { path: 'ospm/section', component: OspmSectionComponent },

  // { path: 'profile', component: UserProfileComponent },
  // { path: 'home', component: HomeComponent },
  // { path: 'admin-guest-041423', component: GuestComponent },
  
  // OSPM
  { path: 'ospm-data', component: OspmDataComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
