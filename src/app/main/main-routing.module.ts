import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { WorksComponent } from './works/works.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ContactMeComponent } from './contact-me/contact-me.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                redirectTo: 'works',
                pathMatch: 'full',
            },
            {
                path: 'works',
                loadChildren: () =>
                    import('./works/works.module').then((m) => m.WorksModule),
            },
            {
                path: 'about',
                component: AboutMeComponent,
            },
            {
                path: 'contact',
                component: ContactMeComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRoutingModule {}
