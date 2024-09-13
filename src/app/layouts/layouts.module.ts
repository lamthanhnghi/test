import { NgModule } from '@angular/core';
import { MasterLayoutComponent } from './master-layout/master-layout.component';
import { SharedModule } from '@shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

@NgModule({
  declarations: [MasterLayoutComponent, HeaderComponent, FooterComponent],
  imports: [SharedModule, AdminLayoutComponent],
  exports: [MasterLayoutComponent, HeaderComponent, FooterComponent, AdminLayoutComponent],
})
export class LayoutsModule {}
