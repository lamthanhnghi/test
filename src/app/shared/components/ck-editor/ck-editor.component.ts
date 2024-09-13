import { Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomUploadAdapter } from './custom-upload-adaptor';
import { HttpClient } from '@angular/common/http';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { MediaService } from '@shared/services';

@Component({
  selector: 'app-ck-editor',
  templateUrl: './ck-editor.component.html',
  styleUrl: './ck-editor.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CkEditorComponent),
      multi: true,
    },
  ],
})
export class CkEditorComponent implements ControlValueAccessor {
  editor = DecoupledEditor as any;
  value = '';
  @Input() isDisabled = false;
  onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  constructor(
    private http: HttpClient,
    private mediaService: MediaService,
  ) {}

  public onReady(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new CustomUploadAdapter(loader, this.http, this.mediaService);
    };

    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.getEditableElement());
  }

  writeValue(value: any): void {
    this.value = value;
    this.onChange(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
