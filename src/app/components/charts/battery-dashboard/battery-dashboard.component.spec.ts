import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryDashboardComponent } from './battery-dashboard.component';

describe('BatteryDashboardComponent', () => {
  let component: BatteryDashboardComponent;
  let fixture: ComponentFixture<BatteryDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BatteryDashboardComponent]
    });
    fixture = TestBed.createComponent(BatteryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
