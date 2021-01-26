import { Injectable } from '@angular/core';
import { appHttpService } from './appHttp.service';

@Injectable({
    providedIn: 'root', //
})
export class appCRUDservice {
    constructor(private appHttp: appHttpService) {}

    getPortrait(motifId: string) {
        // motifId: string
        const url = 'assets/portrait.json';
        return this.appHttp.request('GET', url);
    }

    getWorkCovers() {
        const coverUrl = 'assets/cover.json';
        return this.appHttp.request('GET', coverUrl);
    }

    postContactReq(obj) {
        const postUrl = '';
        return this.appHttp.request('POST', postUrl, obj);
    }
}
