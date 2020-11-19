import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksCoverComponent } from './works-cover.component';

describe('WorksCoverComponent', () => {
  let component: WorksCoverComponent;
  let fixture: ComponentFixture<WorksCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksCoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
