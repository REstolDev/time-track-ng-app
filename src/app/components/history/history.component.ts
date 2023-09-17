import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ConfirmService } from 'src/app/services/confirm.service';
import { LocalStorageAPIService } from 'src/app/services/local-storage-api.service';
import { Project } from 'src/app/class/project';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
 
  showProjects : boolean = false;
  orderedProjectsByName! : string[] ;
  orderedProjectsByDate! : string[] ;
  selectedProjectName : string = "";
  selectedProjectDate : string = "";
  calcTotalTime : string = "";
  deleteAll : string = "";
  filteredProjects! : Project[];
  noResultsTxt : string = "";
  selectAll : string = "No Options";



  constructor( 
    private confirmService : ConfirmService,
    private localStorageApiService: LocalStorageAPIService,
    private sanitizer: DomSanitizer,
    private alertService : AlertService
    ){
      this.chargeSelectsData();
    }

    ngOnInit (){
      this.localStorageApiService.isDataChanged$.subscribe((isChanged: boolean)=>{
        if (isChanged) {
          this.chargeSelectsData();
          this.showProjects = false;
          this.noResultsTxt = "";
        }
      });
    }

  clear() : void {
    
    this.confirmService.customConfirm("Do you want to delete all the projects from your Local Storage?", (isConfirmed: boolean) => {
      if (isConfirmed) {
        this.localStorageApiService.clear() 
        this.chargeSelectsData();
      }
    });
  }


  chargeSelectsData = () => {

    this.localStorageApiService.recoverProjects();
    
    if (this.localStorageApiService.projects.length === 0) {
      this.showProjects = false;
      this.noResultsTxt = "Storage Empty"
      this.selectAll = "No Options";
    }
    else{
      this.selectAll = "Select All";
    this.orderedProjectsByName = this.localStorageApiService.orderProjectsByName();
    this.orderedProjectsByDate = this.localStorageApiService.orderProjectsByDate();
    }
   
  };

  filter = () => {
    this.filteredProjects = this.localStorageApiService.filter(this.selectedProjectName , this.selectedProjectDate);
  
    if (this.filteredProjects.length === 0) {
      this.showProjects = false;
      this.noResultsTxt= 'No Results';
    }
    else{

      this.calcTotalTime = this.localStorageApiService.calcTotalTime(this.filteredProjects);
      this.showProjects = true;
      this.deleteAll="Delete All Projects";
    }
  
  }

  deleteProject (date: Date, name : string) {
    this.confirmService.customConfirm(`Do you want to delete ${name} project from your Local Storage?`, (isConfirmed: boolean) => {
      if (isConfirmed) {
        this.localStorageApiService.deleteProject(date);
        this.filter(); 
        this.chargeSelectsData();
      }
    });
  }

  moreInfo = (date : Date , totalTime: number) => {
       console.log(date, new Date(date)) ;
    date = new Date(date);
    let finishedTime : string = date.toLocaleTimeString();
    let startedTime : string = new Date(date.getTime() - totalTime).toLocaleTimeString();
    
    this.alertService.showCustomAlert(`Started Time: ${startedTime}<br>Finished Time: ${finishedTime}`);
    
  };
}

