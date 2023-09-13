import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomControlService { 
  isFullScreenWatchActivated:boolean = false;
  isDarkModeActivated:boolean = false;

  constructor() {
    this.detectDarkMode();
  }

  private detectDarkMode() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.isDarkModeActivated = true;
    }
  }
  
  toggleFullScreenWatch() {
    this.isFullScreenWatchActivated = !this.isFullScreenWatchActivated;
  }

  toggleDarkLightMode() {
  const root = document.documentElement;
  // Intecambio  del valor de los colores
  if (!this.isDarkModeActivated) {
    root.style.setProperty("--blanco", "#393939");
    root.style.setProperty("--negro", "#f6f2ef");
  } else {
    root.style.setProperty("--blanco", "#f6f2ef");
    root.style.setProperty("--negro", "#393939");
  }
    this.isDarkModeActivated = !this.isDarkModeActivated;
  }
}