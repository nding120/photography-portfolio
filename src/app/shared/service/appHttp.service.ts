import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { retry, catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";

@Injectable({
    providedIn: 'root' // ?
})
export class appHttpService {
    constructor(
        private http: HttpClient
    ) { }

    request(method: string, url: string, options?: any): Observable<any> {
        return this.http.request(method, url, options)
            .pipe(
                retry(2),
                catchError(err=>{
                    return throwError(err);
                })
            );
    }
    
}
