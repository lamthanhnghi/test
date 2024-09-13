import { eToastStatus } from '@shared/enums';

export interface IToastState {
  status: eToastStatus | '';
  title: string;
  message: string;
  action?: string;
  object?: string;
}
