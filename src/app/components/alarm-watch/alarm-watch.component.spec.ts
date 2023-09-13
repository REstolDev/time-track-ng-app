import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmWatchComponent } from './alarm-watch.component';

describe('AlarmWatchComponent', () => {
  let component: AlarmWatchComponent;
  let fixture: ComponentFixture<AlarmWatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlarmWatchComponent]
    });
    fixture = TestBed.createComponent(AlarmWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
