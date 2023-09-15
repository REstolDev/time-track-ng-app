import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertService } from './alert.service';
import { ConfirmService } from './confirm.service';

@Injectable({
  providedIn: 'root'
})
export class StopWatchService {

  timeDifference: number = 0;
  watchIdInterval: any = null;
  startingTime: Date | null = null ;
  time : { hours: string; mins: string; secs: string }={
    hours : '00',
    mins : '00',
    secs : '00'
  };
  isPaused:boolean = true;

  // Utiliza BehaviorSubject para crear una variable observable con un valor inicial
 private refreshTimeToSubject: BehaviorSubject<{ hours: string; mins: string; secs: string }> = new BehaviorSubject<{ hours: string; mins: string; secs: string }>({hours:'00',mins:'00',secs:'00'});

 // Expón la variable observable como un Observable público
 public refreshTime$: Observable<{ hours: string; mins: string; secs: string }> = this.refreshTimeToSubject.asObservable();

  constructor(private alertService : AlertService, private confirmService : ConfirmService) { }

  convertMiliSecs= (TotalMiliSecs : number) => {
    const hours : string = String(Math.floor(TotalMiliSecs / (1000 * 60 * 60))).padStart(
      2,
      "0"
    ); // Calcula las horas y añade un cero si es necesario
    TotalMiliSecs -= Number(hours) * 60 * 60 * 1000; // Resta las horas al total
  
    const mins : string = String(Math.floor(TotalMiliSecs / (1000 * 60))).padStart(2, "0"); // Calcula los minutos y añade un cero si es necesario
    TotalMiliSecs -= Number(mins) * 60 * 1000; // Resta los minutos al total
  
    const secs : string = String(Math.floor(TotalMiliSecs / 1000)).padStart(2, "0"); // Calcula los segundos y añade un cero si es necesario
  
    return {hours, mins, secs};
    /* Math.floor(): redondear hacia abajo el resultado.

 String(...): convertimos el resultado en un string ,necesario para usar el método padStart.

 .padStart(2, '0'): la cadena tenga al menos dos caracteres. Si tiene menos de dos caracteres, se rellena con ceros a la izquierda.
*/
  };

playStopWatch = () => {
  const now: Date = new Date();
  if (!this.startingTime || this.isPaused) {

    this.isPaused = false;
    this.startingTime = new Date(now.getTime() - this.timeDifference);
    clearInterval(this.watchIdInterval);
    this.watchIdInterval = setInterval(this.refreshTimer, 500);
  }
};

pauseStopWatch = () => {

  if(this.startingTime && !this.isPaused){
   clearInterval(this.watchIdInterval);
   this.timeDifference = new Date().getTime() - this.startingTime.getTime();
   this.isPaused = true;
  };
};

// Detenemos el cronómetro y reiniciamos las variables
stopStopWatch = () => {

  if(this.startingTime){
    this.pauseStopWatch();

     // Preguntar al usuario si desea guardar el proyecto
    this.confirmService.customConfirm('Do you want to save this project in your Locale Storage?', (isConfirmed:boolean) => {
      if(isConfirmed)     
        this.alertService.showCustomAlert('Add');
      else this.alertService.showCustomAlert('Cancel');


      clearInterval(this.watchIdInterval);
      this.timeDifference = 0;
      this.time={hours: '00',mins: '00',secs: '00'};
      this.isPaused = true;
      this.startingTime = null;
      this.refreshTimeToSubject.next(this.time) ;


     });

  };
};

// Actualizamos el cronómetro mostrando la hora, los minutos y los segundos
refreshTimer = () => {
  if(this.startingTime){
    const timeDifference : number = new Date().getTime() - this.startingTime.getTime();
    this.time = this.convertMiliSecs(timeDifference);
    this.refreshTimeToSubject.next(this.time) ;

  }
};


}
