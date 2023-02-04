import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of, Subject } from 'rxjs';

import { EachMotifComponent } from './each-motif.component';
import { appCRUDservice } from '../../../shared/service/appCRUD.service';

class ActivatedRouteStub {
    private value = { id: 'portrait' };

    get paramMap() {
        return of(convertToParamMap(this.value));
    }

    public push(value) {
        this.value = value;
    }
}

describe('EachMotifComponent', () => {
    let component: EachMotifComponent;
    let fixture: ComponentFixture<EachMotifComponent>;
    let appCRUDserviceStub: Partial<appCRUDservice>;
    let activatedRouteStub: Partial<ActivatedRoute>;
    let route: ActivatedRouteStub;

    beforeEach(async(() => {
        appCRUDserviceStub = {
            getPhotos: jasmine.createSpy().and.returnValue(of([])),
        };
        activatedRouteStub = {
            paramMap: of(convertToParamMap({ id: 'portrait' })),
        };

        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [EachMotifComponent],
            providers: [
                { provide: appCRUDservice, useValue: appCRUDserviceStub },
                { provide: ActivatedRoute, useClass: ActivatedRouteStub },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EachMotifComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        route = TestBed.inject<any>(ActivatedRoute);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set motifID to value from paramMap', () => {
        component.ngOnInit();
        expect(component.motifID).toEqual('portrait');
    });

    it('should set motifID to value from a different paramMap', () => {
        route.push({ id: 'life' });
        component.ngOnInit();
        expect(component.motifID).toEqual('life');
    });

    // it('ngOnInit should set motifID to value from paramMap', () => {
    //     route.push({ id: 'landscape' });
    //     component.ngOnInit();
    //     expect(component.motifID).toEqual('landscape');
    // });

    it('should set leftPage and rightPage correctly', () => {
        component.ngOnInit();
        expect(component.leftPage).toEqual('');
        expect(component.rightPage).toEqual('landscape');
    });

    it('should call getPhotos of appCRUDservice with motifID as argument', () => {
        component.ngOnInit();
        expect(appCRUDserviceStub.getPhotos).toHaveBeenCalledWith('portrait');
    });

    it('should navigate to correct URL', () => {
        const router = TestBed.inject(Router);
        spyOn(router, 'navigate');
        component.routemotif('landscape');
        expect(router.navigate).toHaveBeenCalledWith([
            '/main/works/each-motif/landscape',
        ]);
    });

    it('should set start to event.value when rec', () => {
        component.rec({ value: 10 });
        expect(component.start).toEqual(10);
    });
});
