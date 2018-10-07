import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCompetencyComponent } from './assign-competency.component';

describe('AssignCompetencyComponent', () => {
  let component: AssignCompetencyComponent;
  let fixture: ComponentFixture<AssignCompetencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignCompetencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignCompetencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
