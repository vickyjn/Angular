import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEffortComponent } from './task-effort.component';

describe('TaskEffortComponent', () => {
  let component: TaskEffortComponent;
  let fixture: ComponentFixture<TaskEffortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskEffortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskEffortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
