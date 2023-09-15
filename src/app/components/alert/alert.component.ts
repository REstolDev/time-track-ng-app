import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})

export class AlertComponent implements OnInit {
  msg: string | undefined;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertService.getAlertObservable().subscribe((msg) => {
      this.msg = msg;
      
    });
  }

  closeCustomAlert() {
    this.msg = undefined;
    this.alertService.clearAlert();
  }
}
