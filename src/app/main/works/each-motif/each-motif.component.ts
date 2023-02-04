import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { appStore } from '../../../shared/service/appStore.service';
import { appCRUDservice } from '../../../shared/service/appCRUD.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-each-motif',
    templateUrl: './each-motif.component.html',
    styleUrls: ['./each-motif.component.scss'],
})
export class EachMotifComponent implements OnInit {
    leftPage = '';
    rightPage = '';
    motifID;
    portraitPicArr;
    private unsubscribeAll = new Subject();

    constructor(
        private router: Router,
        private activatRoute: ActivatedRoute,
        private appRequestService: appCRUDservice
    ) {}

    ngOnInit(): void {
        this.activatRoute.paramMap.subscribe((param) => {
            this.motifID = param.get('id');
            if (this.motifID === 'portrait') {
                this.leftPage = '';
                this.rightPage = 'landscape';
            } else if (this.motifID === 'landscape') {
                this.leftPage = 'portrait';
                this.rightPage = 'life';
            } else {
                this.leftPage = 'landscape';
                this.rightPage = '';
            }
            this.appRequestService
                .getPhotos(this.motifID)
                .pipe(takeUntil(this.unsubscribeAll))
                .subscribe((port) => {
                    window.scrollTo(0, 0);
                    this.portraitPicArr = port?.results;
                });
        });
    }
    start = 1;

    rec(event) {
        this.start = event.value;
    }

    routemotif(value) {
        this.router.navigate(['/main/works/each-motif/' + value]);
    }
}
