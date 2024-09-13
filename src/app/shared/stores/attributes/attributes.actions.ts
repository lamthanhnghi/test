import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AttributesEntity } from './attributes.models';

export const AttributesActions = createActionGroup({
  source: 'Attributes/API',
  events: {
    'Load Attributes': emptyProps(),
    'Load Attributes Success': props<{ attributes: AttributesEntity[] }>(),
    'Load Attributes Failure': emptyProps(),
    'Set title': props<{ title: string }>(),
  },
});
