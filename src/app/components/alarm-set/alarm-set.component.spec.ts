import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmSetComponent } from './alarm-set.component';

describe('AlarmSetComponent', () => {
  let component: AlarmSetComponent;
  let fixture: ComponentFixture<AlarmSetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlarmSetComponent]
    });
    fixture = TestBed.createComponent(AlarmSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
