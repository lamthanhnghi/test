import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IMedia, Media } from '@shared/models';
import { ACCEPTED_IMAGE_EXTENSIONS } from '@shared/constants';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrl: './media-list.component.scss',
})
export class MediaListComponent implements OnChanges {
  @Input() items: (Media & IMedia)[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'].currentValue?.length > 0) {
      this.items.forEach((i) => {
        const extension = i.linkString.match(/\.([0-9a-z]+)(?:[?#]|$)/i)?.[1] || '';
        if (ACCEPTED_IMAGE_EXTENSIONS.includes(`.${extension}`) || i.mediaType == 0) {
          i.mediaFileType = 'image';
        } else {
          i.mediaFileType = 'pdf';
        }
      });
    }
  }
}
