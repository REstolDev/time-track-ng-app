import { Component } from '@angular/core';
import { DomControlService } from './services/dom-control.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'time-track-ng-app';

  constructor( private DomControlService: DomControlService){}

  get isDarkLightModeActivated() {
    return this.DomControlService.isDarkModeActivated;
  }

  get isFullScreenWatchActivated(){
    return this.DomControlService.isFullScreenWatchActivated;
  }

  deactivatedFullScreenWatchMode(){
    this.DomControlService.isFullScreenWatchActivated=false;
  }
}
