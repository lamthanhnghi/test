import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap } from 'rxjs';
import * as EmailModalActions from './email-modal.actions';

@Injectable()
export class EmailModalEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmailModalActions.initEmailModal),
      switchMap(() => of(EmailModalActions.loadEmailModalSuccess({ emailModal: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(EmailModalActions.loadEmailModalFailure({ error }));
      }),
    ),
  );
}
