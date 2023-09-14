import { Injectable } from '@angular/core';
import { Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private renderer: Renderer2;
  private sound: HTMLAudioElement;
  private isPaused = true;


  constructor( private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null,null);
    this.sound = this.chargeSound('../../assets/sounds/atrapado_en_el_tiempo_el_dia_de_la_marmota.mp3');
   }

   private chargeSound(fuente:string): HTMLAudioElement{
    const sound = this.renderer.createElement('audio');
    this.renderer.setAttribute(sound, 'src', fuente);
    this.renderer.setAttribute(sound, 'preload', 'auto');
    this.renderer.setAttribute(sound, 'controls', 'none');
    this.renderer.setStyle(sound, 'display', 'none');
    this.renderer.appendChild(document.body, sound);
    return sound;
  }
  
  play() {
    this.sound.play();
    this.isPaused = false;

  }

  pause() {
    this.sound.pause();
    this.isPaused = true;
  }

  stop() {
    // Detiene el sonido y restablece el tiempo de reproducción a cero
    this.sound.pause();
    this.sound.currentTime = 0;
  }

  isSoundPaused() {
    return this.isPaused;
  }

}
