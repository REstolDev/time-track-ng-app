import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInputComponent } from './project-input.component';

describe('ProjectInputComponent', () => {
  let component: ProjectInputComponent;
  let fixture: ComponentFixture<ProjectInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectInputComponent]
    });
    fixture = TestBed.createComponent(ProjectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
