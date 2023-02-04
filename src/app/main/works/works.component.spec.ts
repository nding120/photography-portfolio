import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { WorksComponent } from './works.component';

describe('WorksComponent', () => {
    let component: WorksComponent;
    let fixture: ComponentFixture<WorksComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [WorksComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WorksComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the router outlet', () => {
        const { debugElement } = fixture;
        const router = debugElement.query(By.css('router-outlet'));
        expect(router).toBeTruthy();
    });
});
