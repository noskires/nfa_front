import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OspmComponent } from './ospm.component';

describe('OspmComponent', () => {
  let component: OspmComponent;
  let fixture: ComponentFixture<OspmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OspmComponent]
    });
    fixture = TestBed.createComponent(OspmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
