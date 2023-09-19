import { Component } from '@angular/core';
import { AlarmService } from 'src/app/services/alarm.service';
import { SoundService } from 'src/app/services/sound.service';


@Component({
  selector: 'app-alarm-watch',
  templateUrl: './alarm-watch.component.html',
  styleUrls: ['./alarm-watch.component.scss']
})
export class AlarmWatchComponent {

  btnState: string = "play";
  isAlarmInit: boolean = false;
  alarmInMiliSec:number =  0;
  
  restingTime: number = 0;
  idInterval:any = null;
  alarmInDate: Date | null = null;

  alarmWatch: string ='00:00:00';


  constructor(private alarmService: AlarmService, private sound:SoundService) {
  }

  ngOnInit(){
    this.alarmService.setAlarmTo$.subscribe((newAlarm: number)=>{ 
      this.alarmInMiliSec= newAlarm;
      this.alarmWatch=this.alarmService.MiliSecToHourMinSec(this.alarmInMiliSec);
      this.btnState = 'play';
      //controlamos que no este sonando la alarma
      if (!this.sound.isSoundPaused()) {
        this.sound.stop();
      }
      this.isAlarmInit = false;
      this.restingTime = 0;
      this.alarmInDate = null;
      clearInterval(this.idInterval);
    });
  }
  changeAlarmState() {
   if(this.alarmInMiliSec) {
    if (!this.isAlarmInit) {
      if (!this.sound.isSoundPaused()) {
        this.sound.stop();
        this.btnState = "restart";
      } else {
        this.btnState = "pause";
             
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
            this.isAlarmInit = false; // Restablece la Posición inicial
            this.btnState = "stop";
          } else {
            this.alarmWatch = this.alarmService.MiliSecToHourMinSec(this.restingTime);
          }
        }, 100);
  
        this.isAlarmInit = true; // El temporizador está en ejecución
      }
    } else {
      this.btnState = "play";
      clearInterval(this.idInterval);
      this.isAlarmInit = false; // El temporizador está en pausa
    }
  }
}
 
}