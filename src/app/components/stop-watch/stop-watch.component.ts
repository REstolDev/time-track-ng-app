import { Component } from '@angular/core';
import { StopWatchService } from 'src/app/services/stop-watch.service';

@Component({
  selector: 'app-stop-watch',
  templateUrl: './stop-watch.component.html',
  styleUrls: ['./stop-watch.component.scss']
})
export class StopWatchComponent {

  time : { hours: string; mins: string; secs: string }={
    hours : '00',
    mins : '00',
    secs : '00'
  };
  
  constructor( private stopWatchService: StopWatchService){}

  ngOnInit(){
    this.stopWatchService.refreshTime$.subscribe((newTime: {hours:string, mins: string, secs : string}) =>
    {
      this.time.hours= newTime.hours;
      this.time.mins= newTime.mins;
      this.time.secs= newTime.secs;

    })
   
  }

}
