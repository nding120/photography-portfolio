import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WorksCoverComponent } from './works-cover.component';
import { appStore } from '../../../shared/service/appStore.service';
import { appCRUDservice } from '../../../shared/service/appCRUD.service';
import { of } from 'rxjs';

describe('WorksCoverComponent', () => {
    let component: WorksCoverComponent;
    let fixture: ComponentFixture<WorksCoverComponent>;
    let appStoreService: appStore;
    let appRequstService: appCRUDservice;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    {
                        path: 'main/works/each-motif/life',
                        component: WorksCoverComponent,
                    },
                ]),
            ],
            declarations: [WorksCoverComponent],
            providers: [
                {
                    provide: appStore,
                    useValue: { set: jasmine.createSpy() },
                },
                {
                    provide: appCRUDservice,
                    useValue: {
                        getWorkCovers: jasmine
                            .createSpy()
                            .and.returnValue(of({ coverData: [] })),
                    },
                },
            ],
        });

        fixture = TestBed.createComponent(WorksCoverComponent);
        component = fixture.componentInstance;
        appStoreService = TestBed.inject(appStore);
        appRequstService = TestBed.inject(appCRUDservice);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set coverPicArr when ngOnInit is called', () => {
        component.ngOnInit();
        expect(component.coverPicArr).toEqual([]);
    });

    it('should navigate to each-motif page and set workMotifId in appStoreService when goToEachMotifPage is called', () => {
        component.goToEachMotifPage('life');
        expect(appStoreService.set).toHaveBeenCalledWith('workMotifId', 'life');
    });
});
