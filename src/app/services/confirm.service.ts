import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  confirmCallback!: Function;
  private confirmSubject = new Subject<string>();

  constructor() { }

  showCustomConfirm(msg: string){
    this.confirmSubject.next(msg);
  }

  confirmAction(isConfirmed : boolean){
    this.clearConfirm();
    if(this.confirmCallback) this.confirmCallback(isConfirmed);
  }

  // Función para mostrar un cuadro de confirmación personalizado con un mensaje y una función de devolución de llamada
   customConfirm(msg : string , callback : Function) {
  // Almacena la función de devolución de llamada globalmente
    this.confirmCallback = callback;  
  // Muestra el cuadro de confirmación personalizado con el mensaje proporcionado
    this.showCustomConfirm(msg);
  }

  clearConfirm(){
    this.confirmSubject.next('');
  }

  getConfirmObservable() {
    return this.confirmSubject.asObservable();
  }
}
