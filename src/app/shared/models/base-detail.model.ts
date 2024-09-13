import { Router } from '@angular/router';

export abstract class BaseDetailModel {
  isReviewer = false;

  protected constructor(options?: { router: Router }) {
    this.isReviewer = !!options?.router?.url?.startsWith('/approval');
  }
}
