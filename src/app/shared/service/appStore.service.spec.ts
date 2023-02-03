import { TestBed } from '@angular/core/testing';
import { appStore } from './appStore.service';

describe('appStore', () => {
    let service: appStore;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(appStore);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
