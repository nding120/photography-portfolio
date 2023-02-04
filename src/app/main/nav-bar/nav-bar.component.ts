import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
    constructor(private router: Router) {}

    isPopUp = false;

    navigateTo(destination: string) {
        this.router.navigate([destination]);
        this.isPopUp = false;
    }

    onClick() {
        this.isPopUp = !this.isPopUp;
    }
}
