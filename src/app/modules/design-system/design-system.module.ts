import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignSystemComponent } from './design-system.component';
import { RouterModule, Routes } from '@angular/router';
import { UploadFileComponent } from '@shared/upload-file/upload-file.component';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: DesignSystemComponent,
  },
];

@NgModule({
  declarations: [DesignSystemComponent],
  imports: [CommonModule, RouterModule.forChild(routes), UploadFileComponent, SharedModule],
})
export class DesignSystemModule {}
