import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(TotalMiliSec: number): string {
    let hour:any = String(Math.floor(TotalMiliSec / (1000 * 60 * 60))).padStart(
      2,
      "0"
    ); // Calcula las horas y añade un cero si es necesario
    TotalMiliSec -= hour * 60 * 60 * 1000; // Resta las horas al total
  
    let min:any = String(Math.floor(TotalMiliSec / (1000 * 60))).padStart(2, "0"); // Calcula los minutos y añade un cero si es necesario
    TotalMiliSec -= min * 60 * 1000; // Resta los minutos al total
  
    let sec:any = String(Math.floor(TotalMiliSec / 1000)).padStart(2, "0"); // Calcula los segundos y añade un cero si es necesario
  
    return `${hour}:${min}:${sec}`;
  }
 
}
