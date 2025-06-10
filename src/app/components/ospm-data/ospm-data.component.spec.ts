import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OspmDataComponent } from './ospm-data.component';

describe('OspmDataComponent', () => {
  let component: OspmDataComponent;
  let fixture: ComponentFixture<OspmDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OspmDataComponent]
    });
    fixture = TestBed.createComponent(OspmDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
