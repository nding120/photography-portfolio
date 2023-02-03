import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}

    token;

    BASE_URL = environment.apiUrl;

    creatUser(email: string, username: string, password: string, code: string) {
        const authData = {
            email: email,
            username: username,
            password: password,
            adminInvitationCode: code,
        };

        return this.http.post(this.BASE_URL + 'admin-user/signup', authData);
    }

    login(email: string, username: string, password: string) {
        const authData = {
            email: email,
            username: username,
            password: password,
        };
        return this.http
            .post(this.BASE_URL + 'admin-user/signin', authData)
            .pipe(tap((value) => (this.token = value['token'])));
    }

    getToken() {
        return this.token;
    }
}
