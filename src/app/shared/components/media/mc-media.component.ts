import { Component, EventEmitter, Input, OnDestroy, Output, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { McUploadFile } from '@shared/models';
import { CommonHelpers } from '@shared/utils';
import { UploadProgressState } from '@shared/stores';
import { ACCEPTED_IMAGE_EXTENSIONS } from '@shared/constants';

@Component({
  selector: 'mc-media',
  templateUrl: './mc-media.component.html',
  styleUrls: ['./mc-media.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class McMediaComponent implements OnDestroy {
  destroy$ = new Subject<void>();
  _media?: McUploadFile = undefined;
  @Input() set media(media: McUploadFile | undefined) {
    if (media) {
      this._media = media;
      this._media['icon'] = this.getIcon(media);
      this._media['percent'] = 0;
    } else {
      this._media = {
        uid: CommonHelpers.uuid(),
        name: 'Error',
        url: '',
        type: '',
        size: 0,
        status: 'error',
        icon: 'color:file-corrupted',
        percent: 0,
      };
    }
  }
  @Input() disabled = false;
  @Input() showProgress = false;
  @Input() showInfo = true;
  @Input() layout: 'default' | 'square' = 'default';

  @Output() removeClicked: EventEmitter<McUploadFile> = new EventEmitter<McUploadFile>();

  constructor(private store$: Store<UploadProgressState>) {}

  getIcon(media: McUploadFile): string {
    const url = media.url || 'no-url';
    // get extension from url
    const extension = url.match(/\.([0-9a-z]+)(?:[?#]|$)/i)?.[1] || '';
    if (media.originFileObj?.type.includes('image') || ACCEPTED_IMAGE_EXTENSIONS.includes(`.${extension}`)) {
      return '';
    } else {
      return 'color:file-pdf';
    }
  }

  onRemove(): void {
    this.removeClicked.emit(this._media);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
