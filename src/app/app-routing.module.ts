import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlarmSetComponent } from './components/alarm-set/alarm-set.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { HistoryComponent } from './components/history/history.component';
import { Pag404Component } from './components/pag404/pag404.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:'', component: HomeComponent, pathMatch: 'full' },
  {path:'setAlarm',component:AlarmSetComponent},
  {path:'history',component:HistoryComponent},
  {path:'statistics',component:StatisticsComponent},
  {path:'**',component:Pag404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
