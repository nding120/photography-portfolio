import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { MainComponent } from './main.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

describe('MainComponent', () => {
    let component: MainComponent;
    let fixture: ComponentFixture<MainComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [MainComponent, NavBarComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the navigation bar', () => {
        const { debugElement } = fixture;
        const bar = debugElement.query(By.css('app-nav-bar'));
        expect(bar).toBeTruthy();
    });

    it('should render the router outlet', () => {
        const { debugElement } = fixture;
        const router = debugElement.query(By.css('router-outlet'));
        expect(router).toBeTruthy();
    });
});
