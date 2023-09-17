import { Component } from '@angular/core';
import { LocalStorageAPIService } from 'src/app/services/local-storage-api.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {
  totalTimeToday : string = "00:00:00";
  totalTimeThisWeek : string = "00:00:00";
  totalTimeLastWeek : string = "00:00:00";
  totalTimeThisMonth : string = "00:00:00";

  constructor( private localeStorageApiService :LocalStorageAPIService){}
  
  ngOnInit(){

    
    this.localeStorageApiService.recoverProjects();
    
    const currentDate = new Date();
    //TODAY
    // Filtrar proyectos para encontrar los que coinciden con la fecha actual
    const todayProjects = this.localeStorageApiService.projects.filter((item) => this.localeStorageApiService.convertToDate(item.date) === this.localeStorageApiService.convertToDate(currentDate));
   
    this.totalTimeToday = this.localeStorageApiService.calcTotalTime(todayProjects);

    //THIS WEEK
    const startOfWeek = new Date();

    startOfWeek.setHours(0, 0, 0, 0);
    //getDay()-1 para que la semana empiece en lunes no en domingo
    const dayOfWeek = startOfWeek.getDay() === 0 ? 6 : startOfWeek.getDay() - 1;
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);
    
    const weekProjects = this.localeStorageApiService.projects.filter((item) => new Date(item.date) >= startOfWeek && new Date(item.date) <= currentDate);
    this.totalTimeThisWeek = this.localeStorageApiService.calcTotalTime(weekProjects);

    //LAST WEEK
    const startOfLastWeek = new Date();
    startOfLastWeek.setHours(0,0,0,0);

    startOfLastWeek.setDate(startOfLastWeek.getDate() - (dayOfWeek+7));
    const endOfLastWeek = new Date(startOfLastWeek);
    
    endOfLastWeek.setDate(endOfLastWeek.getDate() + 6);
    endOfLastWeek.setHours(23,59,59,99)
    const lastWeekProjects = this.localeStorageApiService.projects.filter((item) => new Date(item.date) >= startOfLastWeek && new Date(item.date) <= endOfLastWeek);
    
    this.totalTimeLastWeek =this.localeStorageApiService.calcTotalTime(lastWeekProjects);

     //THIS MONTH
     const currentMonth = new Date(currentDate).getMonth();
     // Filtrar proyectos para encontrar los que coinciden con la semana actual
     const monthProjects = this.localeStorageApiService.projects.filter((item) => new Date(item.date).getMonth() === currentMonth); 
     this.totalTimeThisMonth = this.localeStorageApiService.calcTotalTime(monthProjects); 
  }
}

