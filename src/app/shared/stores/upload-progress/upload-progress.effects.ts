import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as UploadProgressActions from './upload-progress.actions';
import { HttpEventType } from '@angular/common/http';
import { UploadProgressEntity } from '.';
import { Store } from '@ngrx/store';
import { IMediaUploadResponse } from '@shared/models';
import { MediaService } from '@shared/services';

@Injectable()
export class UploadProgressEffects {
  private actions$ = inject(Actions);

  constructor(
    private mediaService: MediaService,
    private store$: Store,
  ) {}

  uploadFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UploadProgressActions.uploadFile),
      mergeMap(({ payload }) => {
        return this.mediaService.upload(payload).pipe(
          tap((event) => {
            let progress: UploadProgressEntity = {
              ...payload,
              percent: 0,
            };
            if (event.type === HttpEventType.UploadProgress) {
              if (Number(event.total) > 0) {
                progress.percent = Math.round((100 * event.loaded) / Number(event.total));
                // scale to 99, because 100% will be set when response is received
                if (progress.percent === 100) {
                  progress.percent = 99;
                }
              } else {
                progress.percent = 0;
              }
            } else if (event.type === HttpEventType.Response) {
              const body = event.body as IMediaUploadResponse;
              progress = {
                ...progress,
                percent: 100,
                url: body.linkString,
                mediaID: body.mediaID,
              };
            }
            this.store$.dispatch(UploadProgressActions.upsertProgress({ progress }));
          }),
          map(() => UploadProgressActions.uploadFileSuccess()),
        );
      }),
      catchError((error) => {
        return of(UploadProgressActions.uploadError({ error }));
      }),
    ),
  );
}
