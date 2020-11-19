import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorksRoutingModule } from './works-routing.module';
import { EachMotifComponent } from './each-motif/each-motif.component';
import { WorksCoverComponent } from './works-cover/works-cover.component';


@NgModule({
  declarations: [EachMotifComponent, WorksCoverComponent],
  imports: [
    CommonModule,
    WorksRoutingModule
  ]
})
export class WorksModule { }
