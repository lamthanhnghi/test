import { Component, Input, ViewEncapsulation } from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Store } from '@ngrx/store';
import { CommonHelpers } from '@shared/utils';
import { startLoading, stopLoading } from '@shared/stores';
import { PROFILE_COVER_SIZE } from '@shared/constants';
import { ProfileService } from '@shared/services';
import * as AuthActions from '@shared/auth/auth.actions';

@Component({
  selector: 'app-avatar',
  templateUrl: './mc-avatar.component.html',
  styleUrls: ['./mc-avatar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class McAvatarComponent {
  _src = '';
  destroy$: Subject<void> = new Subject<void>();
  @Input() set src(src: string) {
    if (src) {
      this.loadImage(src);
    }
  }

  @Input() shape: 'circle' | 'normal' = 'normal';
  @Input() size: number | string = 32;
  @Input() hasBorder = false;
  @Input() hasShadow = false;
  @Input() allowChange = false;

  constructor(
    private imageCompress: NgxImageCompressService,
    private store$: Store,
    private profileService: ProfileService,
  ) {}
  updateAvatar(): void {
    this.imageCompress
      .uploadFile()
      .then(({ image, orientation }) => {
        this.store$.dispatch(startLoading());
        this.imageCompress
          .compressFile(
            image,
            orientation,
            100,
            PROFILE_COVER_SIZE.quality,
            PROFILE_COVER_SIZE.maxWidth,
            PROFILE_COVER_SIZE.maxHeight,
          )
          .then((result) => {
            // to file formData
            const imageBlob = CommonHelpers.dataURItoBlob(result);
            const imageFile = new File([imageBlob], 'profile_cover.jpg', { type: 'image/jpeg' });
            const formData = new FormData();
            formData.append('file_avatar', imageFile);
            this.profileService.updateAvatar(formData).subscribe({
              next: (res) => {
                this._src = res?.sellerAvatar || '';
                // this.store$.dispatch(
                //   showToast({
                //     status: eToastStatus.Success,
                //     title: 'msg.success',
                //     message: 'profile_page.update_cover_success',
                //   }),
                // );
                this.store$.dispatch(AuthActions.getUser());
                this.store$.dispatch(stopLoading());
              },
              error: () => {
                this.store$.dispatch(stopLoading());
              },
            });
          })
          .catch(() => {
            this.store$.dispatch(stopLoading());
          });
      })
      .catch(() => {
        this.store$.dispatch(stopLoading());
      });
  }

  loadImage(src: string): void {
    const imageElement = new Image();
    imageElement.src = src;
    fromEvent(imageElement, 'load')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this._src = src;
      });
  }
}
