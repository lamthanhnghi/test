import { NgModule } from '@angular/core';
import { TermOfUseComponent } from './term-of-use.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TermOfUseComponent,
      },
    ]),
  ],
  declarations: [TermOfUseComponent],
})
export class TermOfUseModule {}
