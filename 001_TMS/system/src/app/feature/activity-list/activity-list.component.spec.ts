import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitylistComponent } from './activity-list.component';

describe('ActivitylistComponent', () => {
  let component: ActivitylistComponent;
  let fixture: ComponentFixture<ActivitylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
