import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { appStore } from '../../../shared/service/appStore.service';
import { appCRUDservice } from '../../../shared/service/appCRUD.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-works-cover',
    templateUrl: './works-cover.component.html',
    styleUrls: ['./works-cover.component.scss'],
})
export class WorksCoverComponent implements OnInit, OnDestroy {
    coverPicArr;
    private unSubscribeAll = new Subject();
    windowWidth = document.documentElement.offsetWidth;
    constructor(
        private router: Router,
        private appStoreService: appStore,
        private appRequstService: appCRUDservice
    ) {}

    ngOnInit(): void {
        this.appRequstService
            .getWorkCovers()
            .pipe()
            .subscribe((cover) => {
                this.coverPicArr = cover.coverData;
            });
    }

    // navigateTo(destination: string) {
    //   this.router.navigate([destination]);
    // }
    goToEachMotifPage(itemID) {
        const id = itemID ? itemID : null;
        this.router.navigate(['/main/works/each-motif', id]);
        this.appStoreService.set('workMotifId', itemID);
    }
}
