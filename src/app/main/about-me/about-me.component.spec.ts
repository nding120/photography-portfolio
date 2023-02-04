import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeComponent } from './about-me.component';

describe('AboutMeComponent', () => {
    let component: AboutMeComponent;
    let fixture: ComponentFixture<AboutMeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AboutMeComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AboutMeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open a link in a new tab', () => {
        const linkElement =
            fixture.debugElement.nativeElement.querySelector('a');
        expect(linkElement.target).toEqual('_blank');
    });
});
