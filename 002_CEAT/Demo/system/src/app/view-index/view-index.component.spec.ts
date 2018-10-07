import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIndexComponent } from './view-index.component';

describe('ViewIndexComponent', () => {
  let component: ViewIndexComponent;
  let fixture: ComponentFixture<ViewIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
