import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OspmDivisionComponent } from './ospm-division.component';

describe('OspmDivisionComponent', () => {
  let component: OspmDivisionComponent;
  let fixture: ComponentFixture<OspmDivisionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OspmDivisionComponent]
    });
    fixture = TestBed.createComponent(OspmDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
