import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupViewActivityComponent } from './group-view-activity.component';

describe('GroupViewActivityComponent', () => {
  let component: GroupViewActivityComponent;
  let fixture: ComponentFixture<GroupViewActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupViewActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupViewActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
