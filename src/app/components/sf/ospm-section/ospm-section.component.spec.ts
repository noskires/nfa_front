import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OspmSectionComponent } from './ospm-section.component';

describe('OspmSectionComponent', () => {
  let component: OspmSectionComponent;
  let fixture: ComponentFixture<OspmSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OspmSectionComponent]
    });
    fixture = TestBed.createComponent(OspmSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
