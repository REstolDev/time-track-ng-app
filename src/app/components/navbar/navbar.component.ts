import { Component } from '@angular/core';
import { DomControlService } from 'src/app/services/dom-control.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

    constructor(private domControlService: DomControlService) {}

  toggleDarkLightMode() { 
    this.domControlService.toggleDarkLightMode();
  }
  toggleFullScreenWatch(){ 
    this.domControlService.toggleFullScreenWatch();
  }

}