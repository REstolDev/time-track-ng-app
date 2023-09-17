import { Component } from '@angular/core';
import { LocalStorageAPIService } from 'src/app/services/local-storage-api.service';

@Component({
  selector: 'app-project-input',
  templateUrl: './project-input.component.html',
  styleUrls: ['./project-input.component.scss']
})
export class ProjectInputComponent {
projectName : string ='My Project';

constructor (private localStorageApi : LocalStorageAPIService){}

  addProjectName() { this.localStorageApi.projectName = this.projectName  } ;

}
