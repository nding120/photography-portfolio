import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { appHttpService } from './appHttp.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('appHttpService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let service: appHttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [appHttpService],
        });

        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(appHttpService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should send a GET request and return data', () => {
        const dummyResponse = { name: 'Test' };
        service.request('GET', 'https://example.com').subscribe((response) => {
            expect(response).toEqual(dummyResponse);
        });

        const req = httpTestingController.expectOne('https://example.com');
        expect(req.request.method).toEqual('GET');
        req.flush(dummyResponse);
    });

    it('should send a GET request and retry if an error occurs', () => {
        const dummyResponse = { name: 'Test' };
        service.request('GET', 'https://example.com').subscribe((response) => {
            expect(response).toEqual(dummyResponse);
        });

        let req = httpTestingController.expectOne('https://example.com');
        expect(req.request.method).toEqual('GET');

        req.flush({}, { status: 500, statusText: 'Server error' });
        req = httpTestingController.expectOne('https://example.com');
        req.flush({}, { status: 500, statusText: 'Server error' });
        req = httpTestingController.expectOne('https://example.com');
        req.flush(dummyResponse);
    });
});
