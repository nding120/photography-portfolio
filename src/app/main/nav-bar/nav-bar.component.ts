import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
    constructor(private router: Router) {}

    isPopUp = false;
    ngOnInit(): void {
        console.log(123);
    }

    navigateTo(destination: string) {
        this.router.navigate([destination]);
        this.isPopUp = false;
    }
}
