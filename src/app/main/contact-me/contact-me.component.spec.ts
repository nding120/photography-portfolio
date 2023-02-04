import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ContactMeComponent } from './contact-me.component';
import { appCRUDservice } from '../../shared/service/appCRUD.service';

describe('ContactMeComponent', () => {
    let component: ContactMeComponent;
    let fixture: ComponentFixture<ContactMeComponent>;
    let appRequestService: appCRUDservice;
    let formBuilder: FormBuilder;
    let spy: jasmine.Spy;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ContactMeComponent],
            imports: [
                ReactiveFormsModule,
                HttpClientModule,
                RouterTestingModule.withRoutes([
                    {
                        path: 'main/works/workscover',
                        component: ContactMeComponent,
                    },
                ]),
            ],
            providers: [appCRUDservice, FormBuilder],
        });

        fixture = TestBed.createComponent(ContactMeComponent);
        component = fixture.componentInstance;
        appRequestService = TestBed.inject(appCRUDservice);
        formBuilder = TestBed.inject(FormBuilder);
        component.contactForm = formBuilder.group({
            firstName: [
                'Han',
                [
                    Validators.required,
                    Validators.pattern(component.namePattern),
                ],
            ],
            lastName: [
                'Yang',
                [
                    Validators.required,
                    Validators.pattern(component.namePattern),
                ],
            ],
            email: ['hy@sample.com', [Validators.required, Validators.email]],
            subject: ['test', Validators.required],
            message: ['test', Validators.required],
        });

        spy = spyOn(appRequestService, 'postContactReq').and.returnValue(
            of({})
        );
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should show message after submit', () => {
        spyOn(window, 'alert');
        component.onSubmit();
        expect(window.alert).toHaveBeenCalledWith(
            'Request has been sent! Thank you!'
        );
    });

    it('should not call postContactReq on submit if form is invalid', () => {
        component.contactForm.controls.firstName.setValue('');
        component.onSubmit();
        expect(spy).not.toHaveBeenCalledWith(
            'Request has been sent! Thank you!'
        );
    });

    it('should update countMessageLetter on value changes', () => {
        fixture.detectChanges();
        component.contactForm.controls.message.setValue('test');
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.countMessageLetter).toEqual(496);
        });
        expect(component.countMessageLetter).toEqual(496);
    });

    it('should call complete on unSubscribeAll', () => {
        spy = spyOn(component.unSubscribeAll, 'complete');
        fixture.destroy();
        expect(spy).toHaveBeenCalled();
    });
});
