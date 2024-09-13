import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { McUploadFile } from '@shared/models';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { CommonHelpers } from '@shared/utils';
import { MediaService } from '@shared/services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-design-system',
  templateUrl: './design-system.component.html',
  styleUrl: './design-system.component.scss',
})
export class DesignSystemComponent implements OnInit {
  disabled = false;
  draggingFile: any = null;
  isReadOnly = true;
  destroy$ = new Subject<void>();

  /** handle Images or Files */
  coverControl = new FormControl<McUploadFile[]>([]);
  covers: McUploadFile[] = [];

  constructor(private mediaService: MediaService) {}

  ngOnInit() {
    this.coverControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((files) => {
      this.covers.push(...(files ?? []));
      this.covers.forEach((file) => {
        file.upload$ = this.mediaService.upload(file);
      });
    });
  }

  /** handle upload files */
  /** upload success */
  uploadCoverSuccess(media: McUploadFile): void {
    /** should set ids to form controls */
    // this.form.controls[eProgramFormKeys.coverMediaID].setValue(media.uid);
  }

  /** remove genuine doc */
  removeCover(media: McUploadFile): void {
    this.covers = this.covers.filter((item) => item.uid !== media.uid);
    /** should remove ids to form controls */
    // this.form.controls[eProgramFormKeys.coverMediaID].setValue(this.covers.map((item) => ({ mediaID: item.uid })));
    // this.form.controls[eProgramFormKeys.coverMediaID].setValue([]);
  }

  onStart(item: any): void {
    this.draggingFile = CommonHelpers.cloneObject(item);
  }

  onDragged(item: any, list: any[], effect: DropEffect): void {
    if (effect === 'move') {
      const index = list.indexOf(item);
      list.splice(index, 1);
    }
  }

  onDrop(event: DndDropEvent, list?: any[]): void {
    if (list && event.dropEffect === 'move') {
      let index = event.index;
      if (typeof index === 'undefined') {
        index = list.length;
      }
      list.splice(index, 0, this.draggingFile);
      this.draggingFile = null;
    }
  }
}
