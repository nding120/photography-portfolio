import { Injectable } from '@angular/core';
import { appHttpService } from './appHttp.service';
import { environment } from '../../../environments/environment';

const baseURL = environment.apiUrl;

@Injectable({
    providedIn: 'root', //
})
export class appCRUDservice {
    constructor(private appHttp: appHttpService) {}

    getPhotos(imgCate: string) {
        // motifId: string
        const url = baseURL + 'images/' + imgCate;
        return this.appHttp.request('GET', url);
    }

    getWorkCovers() {
        const coverUrl = 'assets/cover.json';
        return this.appHttp.request('GET', coverUrl);
    }

    postContactReq(body: any) {
        const postUrl = baseURL + 'send-email';
        return this.appHttp.request('POST', postUrl, { body });
    }
}
