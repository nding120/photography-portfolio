import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ManagePhotosComponent } from './manage-photos/manage-photos.component';

@NgModule({
    declarations: [AdminComponent, ManagePhotosComponent],
    imports: [CommonModule, ReactiveFormsModule, AdminRoutingModule],
})
export class AdminModule {}
