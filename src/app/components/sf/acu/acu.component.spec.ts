import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcuComponent } from './acu.component';

describe('AcuComponent', () => {
  let component: AcuComponent;
  let fixture: ComponentFixture<AcuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcuComponent]
    });
    fixture = TestBed.createComponent(AcuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
