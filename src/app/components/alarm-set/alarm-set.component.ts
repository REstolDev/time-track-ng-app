import { Component } from '@angular/core';
import { AlarmService } from 'src/app/services/alarm.service';

@Component({
  selector: 'app-alarm-set',
  templateUrl: './alarm-set.component.html',
  styleUrls: ['./alarm-set.component.scss']
})
export class AlarmSetComponent {
  hours: number = 0;
  mins: number = 0;
  secs: number = 0;

  constructor(private alarmService: AlarmService) {}

  limitHours(): void {
    if (this.hours < 0 || isNaN(this.hours)) {
      this.hours = 0;
    } else if (this.hours > 24) {
      this.hours = 24;
    }
  }
  
  limitMinutes(): void {
    if (this.mins < 0 || isNaN(this.mins)) {
      this.mins = 0;
    } else if (this.mins > 59) {
      this.mins = 59;
    }
  }
  
  limitSeconds(): void {
    if (this.secs < 0 || isNaN(this.secs)) {
      this.secs = 0;
    } else if (this.secs > 59) {
      this.secs = 59;
    }
  }
  
  
  setAlarm() {
    console.log('setAlarm',this.hours,this.mins,this.secs);
    this.alarmService.hours = this.hours;
    this.alarmService.mins = this.mins;
    this.alarmService.secs = this.secs;
    this.alarmService.setAlarm();
  }
}
