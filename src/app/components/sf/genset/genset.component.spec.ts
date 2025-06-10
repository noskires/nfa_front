import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GensetComponent } from './genset.component';

describe('GensetComponent', () => {
  let component: GensetComponent;
  let fixture: ComponentFixture<GensetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GensetComponent]
    });
    fixture = TestBed.createComponent(GensetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
