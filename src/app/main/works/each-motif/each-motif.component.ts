import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
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
export class EachMotifComponent implements OnInit, AfterViewInit {
    leftPage = '';
    rightPage = '';
    // motifId = this.appStoreService.select('workMotifId').value;
    motifID;
    portraitPicArr;
    isLoading = true;
    imgLoaded = false;
    private unsubscribeAll = new Subject();

    constructor(
        private router: Router,
        private activatRoute: ActivatedRoute,
        private appRequestService: appCRUDservice
    ) {}

    ngOnInit(): void {
        /***需要链接一个service，从后端拿信息，比如每张图及id是一个{}record，根据组别，拿到相应的[{}{}{}...]
      subscribe之后，loop到页面上
    ***/
        console.log(this.isLoading);
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
                    this.portraitPicArr = port;
                    // port.forEach((element) => {
                    //     const img = element.path;
                    //     console.log(img.complete);
                    //     if (img.complete) {
                    //         console.log(element.title + ' done');
                    //     }
                    // });
                    // window.addEventListener('load', (event) => {
                    //     var image = document.querySelector('img');
                    //     var isLoaded =
                    //         image.complete && image.naturalHeight !== 0;
                    //     alert(isLoaded);
                    // });
                    console.log(this.motifID);
                    console.log(port, this.portraitPicArr);
                });
        });
    }

    fadeIn() {
        // alert('hey');
        this.isLoading = false;
        console.log(this.isLoading);
    }

    ngAfterViewInit() {}

    routemotif(value) {
        this.router.navigate(['/main/works/each-motif/' + value]);
    }
}
