import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageReportInfoComponent } from './message-report-info.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    MessageReportInfoComponent
  ],
  exports: [
    MessageReportInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class MessageReportInfoModule { }
