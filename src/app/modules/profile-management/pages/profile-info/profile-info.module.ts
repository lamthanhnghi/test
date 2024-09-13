import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInfoComponent } from './profile-info.component';
import { ProfileModule } from '@modules/profile-management/profile.module';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ProfileInfoComponent,
  },
];
@NgModule({
  declarations: [ProfileInfoComponent],
  imports: [CommonModule, ProfileModule, RouterModule.forChild(routes), SharedModule],
})
export class ProfileInfoModule {}
