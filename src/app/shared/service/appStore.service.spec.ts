import { TestBed } from '@angular/core/testing';
import { appStore } from './appStore.service';
import { BehaviorSubject } from 'rxjs';

describe('appStoreService', () => {
    let service: appStore;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(appStore);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should set a value in the store', () => {
        const key = 'testKey';
        const value = { test: 'value' };
        service.set(key, value);
        expect(service.store.get(key)).toEqual(new BehaviorSubject(value));
    });

    it('should use existing value in the store', () => {
        const key = 'testKey';
        const value = { test: 'value' };
        service.set(key, value);
        service.set(key, value);
        spyOn(service.store, 'set').and.callThrough();
        expect(service.store.set).not.toHaveBeenCalled();
    });

    it('should select a value from the store', () => {
        const key = 'testKey';
        const value = { test: 'value' };
        service.select(key);
        service.store.set(key, new BehaviorSubject(value));
        service.select(key);
        expect(service.select(key)).toEqual(new BehaviorSubject(value));
    });

    it('should delete a value from the store', () => {
        const key = 'testKey';
        const value = { test: 'value' };
        service.store.set(key, new BehaviorSubject(value));
        service.delete(key);
        expect(service.store.has(key)).toBe(false);
    });

    it('should clear the store', () => {
        const key = 'testKey';
        const value = { test: 'value' };
        service.store.set(key, new BehaviorSubject(value));
        service.clear();
        expect(service.store.size).toBe(0);
    });
});
