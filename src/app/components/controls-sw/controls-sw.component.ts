import { Component } from '@angular/core';
import { StopWatchService } from 'src/app/services/stop-watch.service';

@Component({
  selector: 'app-controls-sw',
  templateUrl: './controls-sw.component.html',
  styleUrls: ['./controls-sw.component.scss']
})
export class ControlsSWComponent {
  constructor (private stopWatchService: StopWatchService){}
  
  stopWatchTime() { this.stopWatchService.stopStopWatch()};
  
  pauseWatchTime() {this.stopWatchService.pauseStopWatch()};

  playWatchTime() {this.stopWatchService.playStopWatch()};

  
}
