import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagePhotosComponent } from './manage-photos/manage-photos.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';

const routes: Routes = [
    {
        path: '',
        component: ManagePhotosComponent,
    },
    {
        path: 'signup',
        component: SignUpComponent,
    },
    {
        path: 'login',
        component: LogInComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
