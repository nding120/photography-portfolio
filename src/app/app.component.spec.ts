import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
declare var $: any;

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [AppComponent],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should render the router outlet', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const { debugElement } = fixture;
        const router = debugElement.query(By.css('router-outlet'));
        expect(router).toBeTruthy();
    });

    it(`should have as title 'photography-portfolio'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('photography-portfolio');
    });

    it('should call the carousel function', () => {
        const fixture = TestBed.createComponent(AppComponent);
        spyOn($.fn, 'carousel');
        fixture.detectChanges();
        expect($.fn.carousel).toHaveBeenCalled();
    });
});
