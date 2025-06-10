import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectifierComponent } from './rectifier.component';

describe('RectifierComponent', () => {
  let component: RectifierComponent;
  let fixture: ComponentFixture<RectifierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RectifierComponent]
    });
    fixture = TestBed.createComponent(RectifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
