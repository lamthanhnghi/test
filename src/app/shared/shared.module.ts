import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AntModule } from '@shared/modules/ant.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  AutocompleteOffDirective,
  ReadonlySelectDirective,
  RequiredDirective,
  SideMenuDirective
} from '@shared/directives';
import {
  AddressModalComponent,
  ConfirmModalComponent,
  ContactInfoModalComponent,
  EmailModalComponent,
  IconComponent,
  InputFileComponent,
  InputOtpComponent,
  LoadingOverlayComponent,
  LogoComponent,
  MainLayoutComponent,
  MainMenuComponent,
  ManageLoginIdComponent,
  McAvatarComponent,
  McMediaComponent, MediaItemComponent,
  MediaPreviewComponent,
  OtpModalComponent,
  PhoneModalComponent,
  SideMenuComponent,
  ToastComponent,
  UrlModalComponent
} from '@shared/components';
import { CountdownComponent } from 'ngx-countdown';
import { CharCountPipe, ControlValidateStatusPipe, FileSizePipe, SkuAttrPipe, TranslateEnumsPipe } from '@shared/pipes';
import { DndModule } from 'ngx-drag-drop';
import { DropzoneCdkModule } from '@ngx-dropzone/cdk';
import { register } from 'swiper/element/bundle';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SearchPipe } from '@shared/search.pipe';
import { TextFeedbackModalComponent } from '@shared/text-feedback-modal/text-feedback-modal.component';
import { MediaListComponent } from '@shared/media-list/media-list.component';
import { TabMenuComponent } from '@shared/tab-menu/tab-menu.component';
import { NzSubMenuTitleComponent } from 'ng-zorro-antd/menu';
import { AddUserModalComponent } from '@shared/add-user-modal/add-user-modal.component';
import { AccountStatusLabelComponent } from '@shared/account-status-label/account-status-label.component';
import { ContentStatusLabelComponent } from '@shared/content-status-label/content-status-label.component';
import { EditUserModalComponent } from '@shared/edit-user-modal/edit-user-modal.component';
import { AddPackedUnitModalComponent } from '@shared/add-packed-unit-modal/add-packed-unit-modal.component';
import { AddPackingUnitModalComponent } from '@shared/add-packing-unit-modal/add-packing-unit-modal.component';
import { ReadOnlyFormRowComponent } from '@shared/read-only-form-row/read-only-form-row.component';
import { ProgramTypeLabelComponent } from '@shared/program-type-label/program-type-label.component';
import { ProgramGiftTypeLabelComponent } from '@shared/program-gift-type-label/program-gift-type-label.component';
import { ProductTypeLabelComponent } from '@shared/product-type-label/product-type-label.component';
import { CkEditorModule } from '@shared/ck-editor/ck-editor.module';
import { SideMenuMasterComponent } from '@shared/components';
import { DynamicGoogleMapComponent } from '@shared/dynamic-google-map/dynamic-google-map.component';
import { AddCityModalComponent } from '@shared/add-city-modal/add-city-modal.component';
import { RoleLabelComponent } from '@shared/role-label/role-label.component';
import { PasswordModalComponent } from '@shared/password-modal/password-modal.component';
import { ReportContentStatusLabelComponent } from './components/report-content-status-label/report-content-status-label.component';
import { FeedbackFilterTypeLabelComponent } from './components/feedback-filter-type-label/feedback-filter-type-label.component';
import { ContentStatusLabelTagComponent } from './components/content-status-label-tag/content-status-label-tag.component';

register();

const components = [
  PasswordModalComponent,
  AddCityModalComponent,
  AddUserModalComponent,
  EditUserModalComponent,
  AddPackedUnitModalComponent,
  AddPackingUnitModalComponent,
  ToastComponent,
  LoadingOverlayComponent,
  MainMenuComponent,
  IconComponent,
  LogoComponent,
  InputOtpComponent,
  ConfirmModalComponent,
  InputFileComponent,
  McMediaComponent,
  MediaPreviewComponent,
  MainLayoutComponent,
  SideMenuComponent,
  McAvatarComponent,
  AddressModalComponent,
  EmailModalComponent,
  OtpModalComponent,
  PhoneModalComponent,
  UrlModalComponent,
  ContactInfoModalComponent,
  ManageLoginIdComponent,
  TabMenuComponent,
  MediaItemComponent,
  MediaListComponent,
  AccountStatusLabelComponent,
  ContentStatusLabelComponent,
  ReadOnlyFormRowComponent,
  ProgramTypeLabelComponent,
  ProgramGiftTypeLabelComponent,
  ProductTypeLabelComponent,
  SideMenuMasterComponent,
  DynamicGoogleMapComponent,
  RoleLabelComponent,
  ReportContentStatusLabelComponent,
  FeedbackFilterTypeLabelComponent,
  TextFeedbackModalComponent,
  ContentStatusLabelTagComponent,

];

const directives = [AutocompleteOffDirective, RequiredDirective, SideMenuDirective, ReadonlySelectDirective];

const modules = [
  CommonModule,
  RouterOutlet,
  RouterLink,
  FormsModule,
  TranslateModule,
  AntModule,
  ReactiveFormsModule,
  DndModule,
  DropzoneCdkModule,
  NgxDropzoneModule,
  CkEditorModule,
];

const pipes = [CharCountPipe, FileSizePipe, TranslateEnumsPipe, SearchPipe, ControlValidateStatusPipe, SkuAttrPipe];

@NgModule({
  declarations: [
    ...components,
    ...directives,
    ...pipes,
  ],
  imports: [...modules, CountdownComponent, NzSubMenuTitleComponent, RouterLinkActive],
  exports: [
    ...modules,
    ...components,
    ...directives,
    ...pipes,

  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
