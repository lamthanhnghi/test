import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICountry } from '@shared/models';

export const CountriesActions = createActionGroup({
  source: 'Countries/API',
  events: {
    'Load Countries': emptyProps(),
    'Load Countries Success': props<{ countries: ICountry[] }>(),
    'Load Countries Failure': emptyProps(),
    'Clear Countries': emptyProps(),
  },
});
