import { Component, OnInit } from '@angular/core';
import { ConfirmService } from 'src/app/services/confirm.service';

@Component({
  selector: 'app-confirm-window',
  templateUrl: './confirm-window.component.html',
  styleUrls: ['./confirm-window.component.scss']
})
export class ConfirmWindowComponent implements OnInit{
msg: string | undefined;


constructor( private confirmService : ConfirmService ){}

ngOnInit() {
  this.confirmService.getConfirmObservable().subscribe((msg) => {
    this.msg = msg;
  });
}

confirmAction(isConfirmed : boolean) {
  this.msg = undefined;
  this.confirmService.confirmAction(isConfirmed);
}
}
