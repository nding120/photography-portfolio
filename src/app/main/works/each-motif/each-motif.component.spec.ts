import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EachMotifComponent } from './each-motif.component';

describe('EachMotifComponent', () => {
  let component: EachMotifComponent;
  let fixture: ComponentFixture<EachMotifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EachMotifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EachMotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
