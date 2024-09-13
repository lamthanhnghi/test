import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { SharedModule } from '@shared/shared.module';
import { AccountMasterLayoutModule } from '../../components';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), AccountMasterLayoutModule, SharedModule],
  declarations: [LoginComponent],
})
export class LoginModule {}
