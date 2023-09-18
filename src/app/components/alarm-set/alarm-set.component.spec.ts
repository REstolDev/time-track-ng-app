import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmSetComponent } from './alarm-set.component';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para usar ngModel
import { AlarmService } from 'src/app/services/alarm.service';

describe('AlarmSetComponent', () => {
  let component: AlarmSetComponent;
  let fixture: ComponentFixture<AlarmSetComponent>;

 
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlarmSetComponent],
      imports: [FormsModule], // Importa FormsModule para configurar ngModel
      providers: [AlarmService], // Proporciona AlarmService como un servicio
    });

    fixture = TestBed.createComponent(AlarmSetComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should limit hours input to be between 0 and 24', () => {
    component.hours = -1;
    component.limitHours();
    expect(component.hours).toBe(0);

    component.hours = 25;
    component.limitHours();
    expect(component.hours).toBe(24);

    component.hours = 12; // Within the valid range
    component.limitHours();
    expect(component.hours).toBe(12);
  });


  it('should limit mins input to be between 0 and 59', () => {
    component.mins = -1;
    component.limitMinutes();
    expect(component.mins).toBe(0);

    component.mins = 60;
    component.limitMinutes();
    expect(component.mins).toBe(59);

    component.mins = 12;
    component.limitMinutes();
    expect(component.mins).toBe(12);
  });

  it('should limit mins input to be between 0 and 59', () => {
    component.mins = -1;
    component.limitMinutes();
    expect(component.mins).toBe(0);

    component.mins = 60;
    component.limitMinutes();
    expect(component.mins).toBe(59);

    component.mins = 12;
    component.limitMinutes();
    expect(component.mins).toBe(12);
  });

  it('should limit secs input to be between 0 and 59', () => {
    component.secs = -1;
    component.limitSeconds();
    expect(component.secs).toBe(0);

    component.secs = 65;
    component.limitSeconds();
    expect(component.secs).toBe(59);

    component.secs = 24;
    component.limitSeconds();
    expect(component.secs).toBe(24);
  });
  
  it('should set alarm using AlarmService', () => {
    const alarmService = TestBed.inject(AlarmService); // Obtén una instancia de AlarmService

    spyOn(alarmService, 'setAlarm'); // Espía el método setAlarm en el servicio

    component.hours = 1;
    component.mins = 30;
    component.secs = 45;
    component.setAlarm();

    expect(alarmService.setAlarm).toHaveBeenCalled(); // Verifica si el método se llamó
    expect(alarmService.hours).toBe(1); // Verifica si los valores se actualizaron en el servicio
    expect(alarmService.mins).toBe(30);
    expect(alarmService.secs).toBe(45);
  });
});
