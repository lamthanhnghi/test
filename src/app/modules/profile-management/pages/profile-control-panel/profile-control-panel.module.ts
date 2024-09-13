import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileModule } from '@modules/profile-management/profile.module';
import { ProfileControlPanelComponent } from '@modules/profile-management/pages/profile-control-panel/profile-control-panel.component';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ProfileControlPanelComponent,
  },
];
@NgModule({
  declarations: [ProfileControlPanelComponent],
  imports: [CommonModule, ProfileModule, RouterModule.forChild(routes), SharedModule],
})
export class ProfileControlPanelModule {}
