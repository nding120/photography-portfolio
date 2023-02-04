import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root', // ?
})
export class appHttpService {
    constructor(private http: HttpClient) {}

    request(method: string, url: string, options?: any): Observable<any> {
        return this.http.request(method, url, options).pipe(retry(2));
    }
}
