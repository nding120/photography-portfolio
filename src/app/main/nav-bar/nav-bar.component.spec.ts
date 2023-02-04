import { NavBarComponent } from './nav-bar.component';
import { Router } from '@angular/router';
import { TestBed, ComponentFixture } from '@angular/core/testing';

describe('NavBarComponent', () => {
    let component: NavBarComponent;
    let fixture: ComponentFixture<NavBarComponent>;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NavBarComponent],
            providers: [
                {
                    provide: Router,
                    useValue: { navigate: jasmine.createSpy('navigate') },
                },
            ],
        });

        fixture = TestBed.createComponent(NavBarComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
    });

    it('should navigate to the specified destination when the navigateTo method is called', () => {
        component.navigateTo('destination');
        expect(router.navigate).toHaveBeenCalledWith(['destination']);
    });

    it('should toggle the isPopUp property', () => {
        component.onClick();
        expect(component.isPopUp).toBeTruthy();

        component.onClick();
        expect(component.isPopUp).toBeFalsy();
    });
});
