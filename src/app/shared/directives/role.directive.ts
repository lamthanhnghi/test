import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAuthState } from '@shared/models';
import { selectUser } from '@shared/auth';
import { eRoles } from '@shared/enums';
import { filter, take } from 'rxjs';

@Directive({
  selector: '[appRole]',
  standalone: true,
})
export class RoleDirective implements OnInit {
  @Input() appRole: eRoles[] = [];
  role!: eRoles;

  // Check if the user has the required role, if not, remove the element from the DOM
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store$: Store<IAuthState>,
  ) {
    this.store$
      .select(selectUser)
      .pipe(
        filter((item) => !!item?.adminID),
        take(1),
      )
      .subscribe((user) => {
        this.role = user!.adminRole!;
      });
  }

  ngOnInit() {
    if (this.appRole.includes(this.role)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
