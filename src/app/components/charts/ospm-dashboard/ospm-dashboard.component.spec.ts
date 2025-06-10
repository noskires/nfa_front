import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OspmDashboardComponent } from './ospm-dashboard.component';

describe('OspmDashboardComponent', () => {
  let component: OspmDashboardComponent;
  let fixture: ComponentFixture<OspmDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OspmDashboardComponent]
    });
    fixture = TestBed.createComponent(OspmDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
