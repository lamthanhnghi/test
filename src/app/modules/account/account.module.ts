import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteUtils } from '@shared/utils';
import { SharedModule } from '@shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ACCOUNT_FEATURE_KEY, AccountEffects, accountReducer } from '@shared/stores';
import { AuthGuard, UnauthorizedGuard } from '@core/guards';

const routes: Routes = [
  {
    path: RouteUtils.AccountPage.Login,
    canActivate: [UnauthorizedGuard],
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: RouteUtils.AccountPage.Signup,
    canActivate: [UnauthorizedGuard],
    loadChildren: () => import('./pages/sign-up/sign-up.module').then((m) => m.SignUpModule),
  },
  {
    path: RouteUtils.AccountPage.Active,
    // canActivate: [UnauthorizedGuard],
    loadChildren: () => import('./pages/active/active.module').then((m) => m.ActiveModule),
  },
  {
    path: RouteUtils.AccountPage.ForgotPassword,
    canActivate: [UnauthorizedGuard],
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then((m) => m.ForgotPasswordModule),
  },
  {
    path: RouteUtils.AccountPage.ForgotVerifyOtp,
    canActivate: [UnauthorizedGuard],
    loadChildren: () => import('./pages/verify-otp/verify-otp.module').then((m) => m.VerifyOtpModule),
    data: {
      page: 'forgot-password',
    },
  },
  {
    path: RouteUtils.AccountPage.ResetPassword,
    canActivate: [UnauthorizedGuard],
    loadChildren: () => import('./pages/reset-password/reset-password.module').then((m) => m.ResetPasswordModule),
  },
  // {
  //   path: RouteUtils.AccountPage.ForgotVerifyOtp,
  //   canActivate: [UnauthorizedGuard],
  //   loadChildren: () => import('./pages/verify-otp/verify-otp.module').then((m) => m.VerifyOtpModule),
  //   data: {
  //     page: 'signup',
  //   },
  // },
  // {
  //   path: RouteUtils.AccountPage.SignupUpdateInfo,
  //   canActivate: [UnauthorizedGuard, signupUpdateInfoGuard],
  //   loadChildren: () =>
  //     import('../update-information/update-information.module').then((m) => m.UpdateInformationModule),
  // },
  {
    path: RouteUtils.AccountPage.UpdateInfo,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../update-information/update-information.module').then((m) => m.UpdateInformationModule),
  },
  // {
  //   path: RouteUtils.AccountPage.SignupTermOfUse,
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./pages/term-of-use/term-of-use.module').then((m) => m.TermOfUseModule),
  // },
  {
    path: RouteUtils.AccountPage.Welcome,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  {
    path: '',
    redirectTo: RouteUtils.AccountPage.Login,
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    StoreModule.forFeature(ACCOUNT_FEATURE_KEY, accountReducer),
    EffectsModule.forFeature([AccountEffects]),
    SharedModule,
  ],
  exports: [],
  providers: [],
})
export class AccountModule {}
