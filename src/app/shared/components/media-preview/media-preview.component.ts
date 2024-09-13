import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import Swiper from 'swiper';
import { timer } from 'rxjs';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { eMediaPreview } from '@shared/enums';
import { McUploadFile } from '@shared/models';
import { CommonHelpers } from '@shared/utils';

@Component({
  selector: 'mc-media-preview',
  templateUrl: './media-preview.component.html',
  styleUrls: ['./media-preview.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MediaPreviewComponent {
  readonly eMediaPreview = eMediaPreview;
  @Input() layout: eMediaPreview = eMediaPreview.SortGrid;
  @Input() customGridClasses = '';
  @Input() lstMedia: McUploadFile[] = [];
  @Output() lstMediaChange: EventEmitter<McUploadFile[]> = new EventEmitter<McUploadFile[]>();
  @Output() removeMedia: EventEmitter<McUploadFile> = new EventEmitter<McUploadFile>();

  @Input() disabled = false;

  draggingFile: McUploadFile | null = null;

  @ViewChild('swiper', { static: false }) swiperRef!: ElementRef<any>;
  previewVisible = false;
  filePreview: McUploadFile | null = null;

  preview(file: McUploadFile): void {
    this.previewVisible = true;
    this.filePreview = file;
  }
  remove(file: McUploadFile): void {
    this.removeMedia.emit(file);
    if (this.layout === eMediaPreview.Swiper) {
      const swiper = this.swiperRef?.nativeElement?.swiper as Swiper;
      swiper &&
        timer(10).subscribe(() => {
          swiper.update();
        });
    } else {
      this.lstMedia = this.lstMedia.filter((x) => x !== file);
      this.lstMediaChange.emit(this.lstMedia);
    }
  }

  onStart(item: McUploadFile): void {
    this.draggingFile = CommonHelpers.cloneObject(item);
  }

  onDragged(item: McUploadFile, list: McUploadFile[], effect: DropEffect): void {
    if (effect === 'move') {
      const index = list.indexOf(item);
      list.splice(index, 1);
    }
  }

  onDrop(event: DndDropEvent, list?: McUploadFile[]): void {
    if (list && event.dropEffect === 'move') {
      let index = event.index;

      if (typeof index === 'undefined') {
        index = list.length;
      }

      this.draggingFile && list.splice(index, 0, this.draggingFile);
      this.draggingFile = null;
    }
  }

  // Swiper Actions

  next(): void {
    const swiper = this.swiperRef.nativeElement.swiper as Swiper;
    swiper && swiper.slideNext();
  }

  prev(): void {
    const swiper = this.swiperRef.nativeElement.swiper as Swiper;
    swiper && swiper.slidePrev();
  }
}
