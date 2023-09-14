import { Injectable } from '@angular/core';
import { SoundService } from './sound.service';
import { BehaviorSubject,Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AlarmService {
  
  alarmInMiliSec:number =  10000;
  hours: number = 0;
  mins: number= 0;
  secs: number = 0;

  setAlarmTo: string = '00:00:00';
 // Utiliza BehaviorSubject para crear una variable observable con un valor inicial
 private setAlarmToSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

 // Expón la variable observable como un Observable público
 public setAlarmTo$: Observable<number> = this.setAlarmToSubject.asObservable();


  //state: 'play' | 'pause' | 'stopAlarm' | 'restart' = 'play';

  constructor(  private sound:SoundService) {  }


   MiliSecToHourMinSec = (TotalMiliSec: number) => {
    let hour:any = String(Math.floor(TotalMiliSec / (1000 * 60 * 60))).padStart(
      2,
      "0"
    ); // Calcula las horas y añade un cero si es necesario
    TotalMiliSec -= hour * 60 * 60 * 1000; // Resta las horas al total
  
    let min:any = String(Math.floor(TotalMiliSec / (1000 * 60))).padStart(2, "0"); // Calcula los minutos y añade un cero si es necesario
    TotalMiliSec -= min * 60 * 1000; // Resta los minutos al total
  
    let sec:any = String(Math.floor(TotalMiliSec / 1000)).padStart(2, "0"); // Calcula los segundos y añade un cero si es necesario
  
    return `${hour}:${min}:${sec}`;
    };
  

   setAlarm = () => {
   
  
    //controlamos que no este sonando la alarma
    if (!this.sound.isSoundPaused) {
      this.sound.stop();
    }
  
    //convertimos a milisegundos
    this.alarmInMiliSec = this.secs * 1000 + this.mins * 60 * 1000 + this.hours * 3600 * 1000;
  
    this.setAlarmToSubject.next(this.alarmInMiliSec) ;
  };

  
}
