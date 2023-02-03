import { TestBed } from '@angular/core/testing';
import { appCRUDservice } from './appCRUD.service';
import { appHttpService } from './appHttp.service';

class MockAppHttpService {
    request(method: string, url: string, body: any) {
        return () => {};
    }
}

describe('appCRUDservice', () => {
    let service: appCRUDservice;
    let appHttp: appHttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: appHttpService,
                    useClass: MockAppHttpService,
                },
            ],
        });
        service = TestBed.inject(appCRUDservice);
        appHttp = TestBed.inject(appHttpService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
