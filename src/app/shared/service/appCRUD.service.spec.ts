import { appCRUDservice } from './appCRUD.service';
import { appHttpService } from './appHttp.service';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';

describe('appCRUDservice', () => {
    let service: appCRUDservice;
    let httpMock: HttpTestingController;
    let appHttpServiceMock: jasmine.SpyObj<appHttpService>;

    beforeEach(() => {
        appHttpServiceMock = jasmine.createSpyObj('appHttpService', [
            'request',
        ]);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                appCRUDservice,
                { provide: appHttpService, useValue: appHttpServiceMock },
            ],
        });
        service = TestBed.inject(appCRUDservice);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get photos', () => {
        const testData = [
            { id: 1, url: 'test.jpg' },
            { id: 2, url: 'test2.jpg' },
        ];
        appHttpServiceMock.request.and.returnValue(of(testData));

        service.getPhotos('test-category').subscribe((data) => {
            expect(data).toEqual(testData);
            expect(appHttpServiceMock.request).toHaveBeenCalledWith(
                'GET',
                environment.apiUrl + 'images/test-category'
            );
        });
    });

    it('should get work cover', () => {
        const testData = [
            { id: 1, url: 'cover.jpg' },
            { id: 2, url: 'cover2.jpg' },
        ];
        appHttpServiceMock.request.and.returnValue(of(testData));

        service.getWorkCovers().subscribe((data) => {
            expect(data).toEqual(testData);
            expect(appHttpServiceMock.request).toHaveBeenCalledWith(
                'GET',
                'assets/cover.json'
            );
        });
    });

    it('should post contact request', () => {
        const testData = { success: true };
        appHttpServiceMock.request.and.returnValue(of(testData));
        const body = {
            name: 'test',
            email: 'test@test.com',
            message: 'test message',
        };

        service.postContactReq(body).subscribe((data) => {
            expect(data).toEqual(testData);
            expect(appHttpServiceMock.request).toHaveBeenCalledWith(
                'POST',
                environment.apiUrl + 'send-email',
                { body }
            );
        });
    });
});
