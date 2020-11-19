import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorksComponent } from './works.component';
import { EachMotifComponent } from './each-motif/each-motif.component';
import { WorksCoverComponent } from './works-cover/works-cover.component';

const routes: Routes = [
  {
    path: '',
    component: WorksComponent,
    children: [
      {
        path: '',
        redirectTo: 'workscover',
        pathMatch: 'full'
      },
      {
        path: 'workscover',
        component: WorksCoverComponent
      },
      {
        path: 'each-motif/:id',
        component: EachMotifComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorksRoutingModule { }
