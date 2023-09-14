import { Component } from '@angular/core';
import { AlarmService } from 'src/app/services/alarm.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SoundService } from 'src/app/services/sound.service';

@Component({
  selector: 'app-alarm-watch',
  templateUrl: './alarm-watch.component.html',
  styleUrls: ['./alarm-watch.component.scss']
})
export class AlarmWatchComponent {

  restartSVG: string = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="header__svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/></svg>';
  playSVG: string = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="header__svg" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>';
  pauseSVG: string = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="header__svg" viewBox="0 0 16 16"><path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/></svg>';
  stopAlarmSVG: string = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="header__svg" viewBox="0 0 16 16"><path d="M5.164 14H15c-1.5-1-2-5.902-2-7 0-.264-.02-.523-.06-.776L5.164 14zm6.288-10.617A4.988 4.988 0 0 0 8.995 2.1a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 7c0 .898-.335 4.342-1.278 6.113l9.73-9.73zM10 15a2 2 0 1 1-4 0h4zm-9.375.625a.53.53 0 0 0 .75.75l14.75-14.75a.53.53 0 0 0-.75-.75L.625 15.625z"/></svg>';
  isAlarmInit: boolean = false;
  alarmInMiliSec:number =  10000;
  
  restingTime: number = 0;
  idInterval:any = null;
  alarmInDate: Date | null = null;

  alarmWatch: string ='';

  //state: 'play' | 'pause' | 'stopAlarm' | 'restart' = 'play';
  svg: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(this.playSVG);

  constructor(private alarmService: AlarmService, private sanitizer: DomSanitizer, private sound:SoundService) {
    this.alarmWatch=alarmService.setAlarmTo;
  }

  ngOnInit(){
    this.alarmService.setAlarmTo$.subscribe((newAlarm: number)=>{ 
      this.alarmInMiliSec= newAlarm;
      this.alarmWatch=this.alarmService.MiliSecToHourMinSec(this.alarmInMiliSec);
      this.isAlarmInit = false;
      this.restingTime = 0;
      this.alarmInDate = null;
      clearInterval(this.idInterval);
    });
  }
  changeAlarmState() {
    if (!this.isAlarmInit) {
      if (!this.sound.isSoundPaused()) {
        this.sound.stop();
        this.svg = this.sanitizer.bypassSecurityTrustHtml(this.playSVG);
      } else {
        this.svg = this.sanitizer.bypassSecurityTrustHtml(this.pauseSVG);
             
        // Configurar la fecha de inicio si es la primera vez que se inicia
        if (this.alarmInDate) {
          // Calcular el tiempo restante incluso si ya existe una fecha de alarma
          this.alarmInDate = new Date(new Date().getTime() + this.restingTime);
        } else {
          this.alarmInDate = new Date(new Date().getTime() + this.alarmInMiliSec);
        }
  
        clearInterval(this.idInterval);

        this.idInterval = setInterval(() => {
         if (this.alarmInDate) this.restingTime = this.alarmInDate.getTime() - new Date().getTime();

          // Mover la verificación del tiempo restante aquí para que siempre se ejecute
          if (this.restingTime <= 0) {
            clearInterval(this.idInterval);
            this.sound.play();
            this.alarmInDate = null; // Restablecer la fecha de inicio
            this.isAlarmInit = false; // Restablece la Posicion inicial
            this.svg = this.sanitizer.bypassSecurityTrustHtml(this.stopAlarmSVG);
          } else {
            this.alarmWatch = this.alarmService.MiliSecToHourMinSec(this.restingTime);
          }
        }, 500);
  
        this.isAlarmInit = true; // El temporizador está en ejecución
      }
    } else {
      this.svg = this.sanitizer.bypassSecurityTrustHtml(this.playSVG);
      clearInterval(this.idInterval);
      this.isAlarmInit = false; // El temporizador está en pausa
    }
  }
 
}