import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  
  private alertSubject = new Subject<string>();

  constructor() { }

  showCustomAlert(msg : string){
    this.alertSubject.next(msg);
  }

  clearAlert() {
    this.alertSubject.next('');
  }

  getAlertObservable() {
    return this.alertSubject.asObservable();
  }
}
