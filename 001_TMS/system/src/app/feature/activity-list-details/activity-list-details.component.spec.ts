import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitylistDetailsComponent } from './activity-list-details.component';

describe('ActivitylistDetailsComponent', () => {
  let component: ActivitylistDetailsComponent;
  let fixture: ComponentFixture<ActivitylistDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitylistDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitylistDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
