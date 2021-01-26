import { Component, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
    title = 'photography-portfolio';

    ngAfterViewInit() {
        $('.carousel').carousel({ interval: 4000 });
    }
}
