import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class appStore {
    store = new Map();

    set(key: string, value: any) {
        if (this.store.has(key)) {
            this.store.get(key).next(value);
        } else {
            this.store.set(key, new BehaviorSubject(value));
        }
    }

    select(key: string): BehaviorSubject<any> {
        if (!this.store.has(key)) {
            this.store.set(key, new BehaviorSubject({}));
        }
        return this.store.get(key);
    }

    delete(key: string) {
        this.store.delete(key);
    }

    clear() {
        this.store.clear();
    }
}