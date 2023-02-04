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
        const url = imgCate === 'life' ? `assets/lifestyle.json` : `assets/${imgCate}.json`;
        // console.log(url);
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
