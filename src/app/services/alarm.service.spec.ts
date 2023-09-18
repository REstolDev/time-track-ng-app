import { TestBed } from '@angular/core/testing';
import { AlarmService } from './alarm.service';

describe('AlarmService', () => {
  let service: AlarmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlarmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert milliseconds to hours, minutes, and seconds', () => {
    const timeString = service.MiliSecToHourMinSec(54321000); // 15 hours, 5 minutes, 21 seconds

    expect(timeString).toBe('15:05:21');
  });

  it('should set the alarm time in milliseconds', () => {
    service.hours = 2;
    service.mins = 30;
    service.secs = 45;

    service.setAlarm();

    expect(service.alarmInMiliSec).toBe(9045000); // 2 hours, 30 minutes, 45 seconds in milliseconds
  });
});

