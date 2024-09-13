import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  catchError,
  defaultIfEmpty,
  forkJoin,
  fromEvent,
  Observable,
  of,
  Subject,
  switchMap,
  take,
  takeUntil,
  takeWhile,
} from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxImageCompressService } from 'ngx-image-compress';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { Store } from '@ngrx/store';
import { McUploadFile } from '@shared/models';
import { selectUploadProgressEntities, UploadProgressState } from '@shared/stores';
import { CommonHelpers } from '@shared/utils';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFileComponent implements OnInit, OnDestroy {
  @Input() layout: 'default' | 'custom' = 'default';
  @Input() fileList: McUploadFile[] = [];
  @Input() listenProgress = false;
  @Output() fileListChange: EventEmitter<McUploadFile[]> = new EventEmitter<McUploadFile[]>();
  @Output() fileAdded: EventEmitter<McUploadFile> = new EventEmitter<McUploadFile>();

  @Input() disabled = false;
  @Input() required = false;
  @Input() maxSize = 1.5 * 1024 * 1024; // 1.5MB
  @Input() accepts: string[] = []; // ['.png', '.jpg']
  @Input() limit = 1;
  @Input() multiple = false;
  loadingCount = 0;
  progress$ = this.store$.select(selectUploadProgressEntities);
  destroy$ = new Subject<void>();

  constructor(
    private nzMessage: NzMessageService,
    private imageCompress: NgxImageCompressService,
    private store$: Store<UploadProgressState>,
  ) {}

  ngOnInit() {
    this.progress$
      .pipe(
        takeWhile(() => this.listenProgress),
        takeUntil(this.destroy$),
      )
      .subscribe((progressEntities) => {
        const ids = this.fileList.map((i) => i.uid);
        ids.forEach((id) => {
          if (
            progressEntities[id] &&
            Number(progressEntities[id]?.percent) > Number(this.fileList.find((i) => i.uid === id)?.percent)
          ) {
            const index = this.fileList.findIndex((i) => i.uid === id);
            this.fileList[index]['percent'] = progressEntities[id]?.percent || 0;
            if (this.fileList[index]['percent'] === 100) {
              this.fileList[index]['status'] = 'done';
              this.fileList[index].mediaID = progressEntities[this.fileList[index]?.uid]?.mediaID;
              this.fileList[index].url = progressEntities[this.fileList[index]?.uid]?.url;
              this.fileList[index]['preview'] = this.fileList[index].url;
              this.fileListChange.emit(this.fileList);
            }
          }
        });
      });
  }

  onSelect(event: NgxDropzoneChangeEvent): void {
    const files = event.addedFiles;
    const observables: Observable<string>[] = [];

    if (this.multiple && files.length + this.fileList.length > this.limit) {
      this.nzMessage.error('Bạn chỉ được tải lên tối đa ' + this.limit + ' file.');
      files.splice(this.limit - this.fileList.length);
    } else if (!this.multiple && files.length + this.fileList.length > 1) {
      this.nzMessage.error('Bạn chỉ được tải lên tối đa ' + 1 + ' file.');
      files.splice(1 - this.fileList.length);
    }

    files.forEach((file) => {
      const fileType = file.type.split('/').pop() || '';
      if (
        this.accepts.length &&
        !this.accepts.map((i) => i.toLowerCase().replace('.', '')).includes(fileType.toLowerCase())
      ) {
        this.nzMessage.error(
          'File ' + CommonHelpers.getFileNameEllipsis(file.name, 10) + ' bạn tải lên sai định dạng. Vui lòng thử lại.',
        );
        return;
      }

      if ((file.size as number) > this.maxSize) {
        this.nzMessage.error(
          'File ' +
            CommonHelpers.getFileNameEllipsis(file.name, 10) +
            ' bạn tải lên vượt quá dung lượng cho phép. Vui lòng thử lại.',
        );
        return;
      }

      this.startLoading();

      // if file is image, compress it
      if (file.type.includes('image')) {
        const reader = new FileReader();
        reader.readAsDataURL(file as unknown as Blob);

        const ob = fromEvent(reader, 'load').pipe(
          take(1),
          switchMap(() => fromPromise(this.imageCompress.compressFile(reader.result as string, 1, 90, 70, 1920, 1920))),
          catchError(() => {
            this.nzMessage.error(
              'File ' + CommonHelpers.getFileNameEllipsis(file.name, 10) + ' lỗi khi tải lên. Vui lòng thử lại.',
            );
            return of('');
          }),
          defaultIfEmpty(''),
        );
        observables.push(ob);
      } else {
        // file has no preview
        observables.push(of(''));
      }
    });

    forkJoin(observables).subscribe((arrRes) => {
      arrRes.forEach((res, index) => {
        const name = CommonHelpers.toEnglishFileName(files[index].name);
        // if file is image, compress it and convert to file
        const originFileObj = res ? CommonHelpers.dataURItoFile(res, name) : files[index];
        const f: McUploadFile = {
          uid: Date.now().toString(),
          originFileObj,
          name,
          preview: res as string,
          status: 'done',
        };
        this.fileList.push(f);
        this.fileAdded.emit(f);
        this.endLoading();
      });
      this.fileListChange.emit(this.fileList);
    });
  }

  startLoading(): void {
    this.loadingCount++;
  }

  endLoading(): void {
    if (this.loadingCount <= 0) return;
    this.loadingCount--;
  }

  get renderFileSize(): string {
    return CommonHelpers.humanFileSize(this.maxSize);
  }

  get renderAccepts(): string {
    return this.accepts.join(', ');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
