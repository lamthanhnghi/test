import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemListMasterLayoutModule } from '@shared/item-list-master-layout/item-list-master-layout.module';
import { SharedModule } from '@shared/shared.module';
import { ContactComponent } from '@modules/contact/contact.component';
import { ContactDetailComponent } from '@modules/contact/components/contact-detail/contact-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ContactComponent,
  },
];

@NgModule({
  declarations: [ContactComponent, ContactDetailComponent],
  imports: [SharedModule, RouterModule.forChild(routes), ItemListMasterLayoutModule],
})
export class ContactModule {}
