import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { TranslateModule } from '@ngx-translate/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { CommonModule } from '@angular/common';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { Store } from '@ngrx/store';
import { ILoadingState, McUploadFile } from '@shared/models';
import { startLoading, stopLoading } from '@shared/stores';
import { CommonHelpers } from '@shared/utils';
import { NzUploadComponent, NzUploadListComponent } from 'ng-zorro-antd/upload';
import { NzUploadFile } from 'ng-zorro-antd/upload/interface';
import { debounceTime, forkJoin, Observable, of, Subject, takeUntil } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [
    NzButtonComponent,
    TranslateModule,
    CommonModule,
    NzSpinComponent,
    NzUploadComponent,
    NzUploadListComponent,
    ImageCropperComponent,
  ],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadFileComponent),
      multi: true,
    },
  ],
})
export class UploadFileComponent implements ControlValueAccessor, OnDestroy {
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef<NzUploadComponent>;
  @ViewChild('cropperModalTpl', { static: false }) cropperModalTpl?: TemplateRef<any>;
  @Input() multiple = false;
  @Input() ratio = 1;
  @Input() disabled = false;
  @Input() isDisabled = false;
  @Input() accept?: string | string[];
  @Input() limit = 0;
  @Input() enableCrop = true;
  @Input() minImageWidth = 800;
  @Output() fileLoading = new EventEmitter<boolean>();
  files: McUploadFile[] = [];
  originalFiles: McUploadFile[] = [];
  compressedUrl?: any = '';
  croppedImage?: any = '';
  imageDropEvent?: ImageCroppedEvent = undefined;
  modalRef?: NzModalRef;
  dataURLs: string[] = [];
  currentCropIndex = 0;

  beforeUpload$ = new Subject<NzUploadFile[]>();
  destroy$ = new Subject<void>();

  // form
  onChange: any = () => {};
  onTouch: any = () => {};

  constructor(
    private sanitizer: DomSanitizer,
    private modal: NzModalService,
    private imageCompress: NgxImageCompressService,
    private store$: Store<ILoadingState>,
    private notificationService: NzNotificationService,
  ) {
    this.beforeUpload$.pipe(debounceTime(50), takeUntil(this.destroy$)).subscribe(async (fileList) => {
      if (this.limit === 0) {
        return;
      }
      this.store$.dispatch(startLoading());
      if (this.limit > 0) {
        if (fileList.length > this.limit) {
          this.notificationService.warning('Thông báo', 'Vượt quá số lượng file tối đa cho phép!');
        }
        fileList = fileList.slice(0, this.limit);
      }

      fileList = await this.removeSmallImage(fileList, this.minImageWidth, this.ratio);

      if (!fileList.length) {
        this.store$.dispatch(stopLoading());
        return;
      }

      const promises = fileList.map(async (nzFile) => {
        if (this.isImage(nzFile)) {
          const base64 = await this.fileToBase64(nzFile as unknown as File);
          return this.imageCompress.compressFile(base64, 0, 100, 100, this.minImageWidth);
        } else {
          return nzFile;
        }
      });
      const names = fileList.map((nzFile) => nzFile.name);
      Promise.all([...promises]).then((results) => {
        this.dataURLs = results.filter((result) => typeof result === 'string') as string[];
        this.originalFiles = fileList.filter((nzFile) => !this.isImage(nzFile));
        const compressedFiles = this.dataURLs.map(async (result, index) =>
          this.base64ToFile(result as string, names[index]),
        );
        Promise.all(compressedFiles).then((compressedFiles) => {
          this.originalFiles.push(...(compressedFiles as unknown as McUploadFile[]));
          this.store$.dispatch(stopLoading());
          this.compressCallback();
        });
      });
    });
  }

  beforeUpload = (file: NzUploadFile, fileList: NzUploadFile[]): boolean => {
    this.beforeUpload$.next(fileList);

    return false;
  };

  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }

  base64ToFile(base64: string, filename: string): File {
    const arr = base64.split(',');
    const mime = arr[0]?.match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  compressCallback(): void {
    if (this.enableCrop && this.dataURLs?.length) {
      this.files = this.originalFiles.filter((nzFile) => !this.isImage(nzFile as unknown as NzUploadFile));
      this.handleModalCrop();
    } else {
      this.files = this.originalFiles.map(
        (nzFile) =>
          ({
            name: nzFile.name,
            status: 'uploading',
            lastModified: nzFile.lastModified,
            size: nzFile.size,
            type: nzFile.type,
            originFileObj: nzFile as unknown as File,
          }) as McUploadFile,
      );
      this.onChange(this.files);
    }
  }

  handleModalCrop(): void {
    this.fileLoading.emit(true);
    this.currentCropIndex = 0;
    this.compressedUrl = this.dataURLs[this.currentCropIndex];

    // show modal
    this.modalRef = this.modal.create({
      nzContent: this.cropperModalTpl,
      nzFooter: null,
      nzClassName: 'modal-lg',
      nzClosable: false,
      nzKeyboard: false,
      nzCentered: true,
    });
  }

  confirmCrop({ blob }: ImageCroppedEvent): void {
    if (!blob) {
      this.compressedUrl = '';
      return;
    }
    const croppedFile = new File([blob], this.originalFiles[this.currentCropIndex].name, {
      type: this.originalFiles[this.currentCropIndex].type,
    });
    this.files.push({
      uid: CommonHelpers.uuid(),
      originFileObj: croppedFile,
      name: croppedFile.name,
      type: croppedFile.type,
      size: croppedFile.size,
      status: 'uploading',
      thumbUrl: URL.createObjectURL(croppedFile),
    });
    if (this.currentCropIndex === this.dataURLs.length - 1) {
      this.onChange(this.files);
      this.modalRef?.close();
      return;
    }
    this.currentCropIndex += 1;
    this.compressedUrl = this.dataURLs[this.currentCropIndex];
  }

  removeURL(index: number): void {
    this.dataURLs.splice(index, 1);
    this.originalFiles.splice(index, 1);
    this.compressedUrl = this.dataURLs[this.currentCropIndex];
    if (this.currentCropIndex >= this.dataURLs.length) {
      if (this.files?.length) {
        this.onChange(this.files);
      }
      this.modalRef?.close();
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    if (!event?.objectUrl) {
      return;
    }
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    this.imageDropEvent = event;
  }

  removeSmallImage(files: NzUploadFile[], minWidth: number, ratio: number): Promise<NzUploadFile[]> {
    return new Promise((resolve) => {
      const obs$ = files.map((file) => {
        if (!this.isImage(file)) {
          return of(file as NzUploadFile);
        }
        const img = new Image();
        img.src = URL.createObjectURL(file as unknown as File);
        return new Observable((observer) => {
          img.onload = () => {
            if (img.width >= minWidth && img.height >= minWidth / ratio) {
              observer.next(file);
              observer.complete();
            } else {
              this.notificationService.warning('Thông báo', `Ảnh ${file.name} không đạt kích thước tối thiểu`);
              observer.next(null);
              observer.complete();
            }
          };
        });
      });

      forkJoin([...obs$]).subscribe((result) => {
        resolve(result.filter((r) => !!r) as NzUploadFile[]);
      });
    });
  }

  isImage(file: NzUploadFile): boolean {
    return file?.type?.split('/')[0] === 'image';
  }

  imageLoaded() {
    this.fileLoading.emit(false);
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(files: McUploadFile[]): void {
    this.files = files ?? [];
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
