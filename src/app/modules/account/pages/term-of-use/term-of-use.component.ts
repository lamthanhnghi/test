import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAgreement } from '@shared/models';
import { logout, startLoading, stopLoading } from '@shared/stores';
import { RouteUtils } from '@shared/utils';
import { AuthService } from '@shared/services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-term-of-use',
  templateUrl: './term-of-use.component.html',
  styleUrls: ['./term-of-use.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class TermOfUseComponent implements OnInit {
  protected readonly RouteUtils = RouteUtils;
  checked = false;
  agreement?: IAgreement = undefined;
  constructor(
    private store$: Store,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  ngOnInit() {
    this.store$.dispatch(startLoading());
    this.authService.getAgreement().subscribe({
      next: (agreement) => {
        this.agreement = agreement;
        this.store$.dispatch(stopLoading());
      },
      error: () => {
        this.store$.dispatch(stopLoading());
      },
    });
  }

  clearSession() {
    /** clear session and redirect to login page */
    this.store$.dispatch(logout());
    this.router.navigate(['/', RouteUtils.AccountPage.Base, RouteUtils.AccountPage.Login]).then();
  }

  submit() {
    if (this.checked) {
      if (this.agreement) {
        this.store$.dispatch(startLoading());
        this.authService.addAgreement({ agreementID: this.agreement.agreementID }).subscribe({
          next: () => {
            /** redirect to welcome page */
            this.store$.dispatch(stopLoading());
            this.router.navigate(['../', RouteUtils.AccountPage.Welcome], { relativeTo: this.route }).then();
          },
          error: () => {
            this.store$.dispatch(stopLoading());
          },
        });
      }
    }
  }
}
