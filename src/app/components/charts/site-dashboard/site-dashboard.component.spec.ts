import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteDashboardComponent } from './site-dashboard.component';

describe('SiteDashboardComponent', () => {
  let component: SiteDashboardComponent;
  let fixture: ComponentFixture<SiteDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteDashboardComponent]
    });
    fixture = TestBed.createComponent(SiteDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
