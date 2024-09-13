import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CkEditorComponent } from './ck-editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, CKEditorModule, FormsModule],
  declarations: [CkEditorComponent],
  exports: [CkEditorComponent, CKEditorModule],
})
export class CkEditorModule {}
