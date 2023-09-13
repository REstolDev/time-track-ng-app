import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsSWComponent } from './controls-sw.component';

describe('ControlsSWComponent', () => {
  let component: ControlsSWComponent;
  let fixture: ComponentFixture<ControlsSWComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlsSWComponent]
    });
    fixture = TestBed.createComponent(ControlsSWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
