import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { WorksComponent } from './works/works.component';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        MainComponent,
        NavBarComponent,
        ContactMeComponent,
        AboutMeComponent,
        WorksComponent,
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [
        // appStore,
        // appHttpService,
        // appCRUDservice
    ],
})
export class MainModule {}
