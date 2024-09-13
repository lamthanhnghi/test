import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMedia, McUploadFile } from '@shared/models';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FALLBACK_IMAGE, PLACEHOLDER_IMAGE } from '@shared/constants';

@Component({
  selector: 'app-media-item',
  templateUrl: './media-item.component.html',
  styleUrl: './media-item.component.scss',
})
export class MediaItemComponent implements OnInit {
  @Input() file?: McUploadFile;
  @Input() disabled = false;
  @Input() layout: 'grid' | 'list' = 'grid';
  @Input() imageClasses = '';
  @Output() removeEvent = new EventEmitter<McUploadFile>();
  @Output() successEvent = new EventEmitter<McUploadFile>();

  ngOnInit() {
    if (this.file?.upload$ && this.file?.status === 'uploading') {
      this.file.upload$.subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.file!.percent = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          this.file!.thumbUrl = (event.body as IMedia).linkString;
          this.file!.uid = (event.body as IMedia).mediaID;
          this.file!.status = 'done';
          this.successEvent.emit(this.file);
        } else if (event instanceof Error) {
          this.file!.status = 'error';
        }
      });
    }
  }

  remove(): void {
    this.removeEvent.emit(this.file);
  }

  protected readonly PLACEHOLDER_IMAGE = PLACEHOLDER_IMAGE;
  protected readonly FALLBACK_IMAGE = FALLBACK_IMAGE;
}
