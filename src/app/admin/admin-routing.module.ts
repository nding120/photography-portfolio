import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagePhotosComponent } from './manage-photos/manage-photos.component';

const routes: Routes = [
  {
    path: '',
    component: ManagePhotosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
