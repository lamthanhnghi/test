import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsModule } from './layouts/layouts.module';
import { MasterLayoutComponent } from './layouts/master-layout/master-layout.component';
import { eLayouts, eRoles } from '@shared/enums';
import { AuthGuard, RolesGuard } from '@core/guards';
import { RouteUtils } from '@shared/utils';

const routes: Routes = [
  {
    path: '',
    component: MasterLayoutComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () => import('@modules/home/home.module').then((m) => m.HomeModule),
        data: { title: 'Home', hideHeader: true, breadcrumb: 'Home', layout: eLayouts.Scroll },
      },
      {
        path: RouteUtils.CategoriesPage.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () => import('@modules/categories/categories.module').then((m) => m.CategoriesModule),
        data: {
          title: 'Categories',
          hideHeader: false,
          breadcrumb: 'Categories',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.DataAdmin, eRoles.OperationAdmin],
        },
      },
      {
        path: RouteUtils.BanksPage.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () => import('@modules/banks/banks.module').then((m) => m.BanksModule),
        data: {
          title: 'Banks',
          hideHeader: false,
          breadcrumb: 'Banks',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.DataAdmin, eRoles.OperationAdmin],
        },
      },
      {
        path: RouteUtils.AttributesPage.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () => import('@modules/attributes/attributes.module').then((m) => m.AttributesModule),
        data: {
          title: 'Attributes',
          hideHeader: false,
          breadcrumb: 'Attributes',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.DataAdmin, eRoles.OperationAdmin],
        },
      },
      {
        path: RouteUtils.GroupsPage.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () => import('@modules/product-groups/product-groups.module').then((m) => m.ProductGroupsModule),
        data: {
          title: 'Groups',
          hideHeader: false,
          breadcrumb: 'Groups',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.DataAdmin, eRoles.OperationAdmin],
        },
      },
      {
        path: RouteUtils.PackedUnitsPage.Base,
        canActivate: [AuthGuard, RolesGuard],

        loadChildren: () => import('@modules/packed-units/packed-units.module').then((m) => m.PackedUnitsModule),
        data: {
          title: 'Packed Units',
          hideHeader: false,
          breadcrumb: 'Packed Units',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.DataAdmin, eRoles.OperationAdmin],
        },
      },
      {
        path: RouteUtils.ProgramsPage.Base,
        canActivate: [AuthGuard, RolesGuard],

        loadChildren: () => import('@modules/programs/programs.module').then((m) => m.ProgramsModule),
        data: {
          title: 'Programs',
          hideHeader: false,
          breadcrumb: 'Programs',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.OperationAdmin],
        },
      },
      {
        path: RouteUtils.UsersPage.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () => import('@modules/users/users.module').then((m) => m.UsersModule),
        data: {
          title: 'Users',
          hideHeader: false,
          breadcrumb: 'Users',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.DataAdmin],
        },
      },
      {
        path: RouteUtils.ProductsPage.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () => import('@modules/products/products.module').then((m) => m.ProductsModule),
        data: {
          title: 'Products',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.OperationAdmin],
        },
      },
      {
        path: RouteUtils.SaleUnitsPage.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () => import('@modules/sale-units/sale-units.module').then((m) => m.SaleUnitsModule),
        data: {
          title: 'Sale Units',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.DataAdmin],
        },
      },
      {
        path: RouteUtils.BrandsPage.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () => import('@modules/brands/brands.module').then((m) => m.BrandsModule),
        data: {
          title: 'Brands',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.DataAdmin],
        },
      },
      {
        path: RouteUtils.PrivacyPoliciesPage.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () =>
          import('@modules/privacy-policies/privacy-policies.module').then((m) => m.PrivacyPoliciesModule),
        data: {
          title: 'Privacy Policies',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.DataAdmin, eRoles.OperationAdmin],
        },
      },
      {
        path: RouteUtils.ProgramPoliciesPage.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () =>
          import('@modules/program-policies/program-policies.module').then((m) => m.ProgramPoliciesModule),
        data: {
          title: 'Program Policies',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.DataAdmin, eRoles.OperationAdmin],
        },
      },
      {
        path: 'account',
        loadChildren: () => import('@modules/account/account.module').then((m) => m.AccountModule),
        data: { title: 'Account', hideHeader: true, breadcrumb: 'Account', layout: eLayouts.Scroll },
      },
      // todo: check this
      {
        path: RouteUtils.ProfilesPage.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () => import('@modules/profiles/profiles.module').then((m) => m.ProfilesModule),
        data: {
          title: 'Profile',
          hideHeader: true,
          breadcrumb: 'Profile',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.OperationAdmin],
        },
      },
      {
        path: RouteUtils.ProfilePage.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () => import('@modules/profile-management/profile.module').then((m) => m.ProfileModule),
        data: {
          title: 'Profile',
          hideHeader: true,
          breadcrumb: 'Profile',
          layout: eLayouts.Scroll,
          roles: [eRoles.SuperAdmin, eRoles.OperationAdmin, eRoles.DataAdmin],
        },
      },
      {
        path: RouteUtils.GeneralSettingPage.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () =>
          import('@modules/general-setting/general-setting.module').then((m) => m.GeneralSettingModule),
        data: {
          title: 'General Setting',
          hideHeader: true,
          breadcrumb: 'General Setting',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.DataAdmin, eRoles.OperationAdmin],
        },
      },
      {
        path: RouteUtils.AgreementPage.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () => import('@modules/agreements/agreements.module').then((m) => m.AgreementsModule),
        data: {
          title: 'Agreements',
          hideHeader: true,
          breadcrumb: 'Agreements',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.DataAdmin, eRoles.OperationAdmin],
        },
      },
      {
        path: RouteUtils.QuestionAndAnswer.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () =>
          import('@modules/question-and-answer/question-and-answer.module').then((m) => m.QuestionAndAnswerModule),
        data: {
          title: 'Question and Answer',
          hideHeader: true,
          breadcrumb: 'Question and Answer',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.DataAdmin, eRoles.OperationAdmin],
        },
      },
      {
        path: RouteUtils.ContactAndSupport.Contact,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () => import('@modules/contact/contact.module').then((m) => m.ContactModule),
        data: {
          title: 'Contact and Support',
          hideHeader: true,
          breadcrumb: 'Contact and Support',
          layout: eLayouts.Scroll,
          roles: [eRoles.SuperAdmin, eRoles.DataAdmin],
        },
      },
      {
        path: RouteUtils.UserGuide.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () => import('@modules/user-guide-mgt/user-guide-mgt.module').then((m) => m.UserGuideMgtModule),
        data: {
          title: 'User guide',
          hideHeader: true,
          breadcrumb: 'User guide',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.DataAdmin],
        },
      },
      {
        path: RouteUtils.SalesFeePoliciesPage.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () =>
          import('@modules/sales-fee-policies/sales-fee-policies.module').then((m) => m.SalesFeePoliciesModule),
        data: {
          title: 'Sales Fee Policies',
          hideHeader: true,
          breadcrumb: 'Sales Fee Policies',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.DataAdmin, eRoles.OperationAdmin],
        },
      },
      {
        path: RouteUtils.OrganizationRegistrationPoliciesPage.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () =>
          import('@modules/organization-registration-policies/organization-registration-policies.module').then(
            (m) => m.OrganizationRegistrationPoliciesModule,
          ),
        data: {
          title: 'Organization Registration Policies',
          hideHeader: true,
          breadcrumb: 'Organization Registration Policies',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.DataAdmin, eRoles.OperationAdmin],
        },
      },
      {
        path: RouteUtils.ReturnPoliciesPage.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () =>
          import('@modules/return-policies/return-policies.module').then((m) => m.ReturnPoliciesModule),
        data: {
          title: 'Return Policies',
          hideHeader: true,
          breadcrumb: 'Return Policies',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.DataAdmin, eRoles.OperationAdmin],
        },
      },
      {
        path: RouteUtils.OtherPoliciesPage.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () => import('@modules/other-policies/other-policies.module').then((m) => m.OtherPoliciesModule),
        data: {
          title: 'Other Policies',
          hideHeader: true,
          breadcrumb: 'Other Policies',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.DataAdmin, eRoles.OperationAdmin],
        },
      },
      {
        path: RouteUtils.ShippingPoliciesPage.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () =>
          import('@modules/shipping-policies/shipping-policies.module').then((m) => m.ShippingPoliciesModule),
        data: {
          title: 'Shipping Policies',
          hideHeader: true,
          breadcrumb: 'Shipping Policies',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.DataAdmin, eRoles.OperationAdmin],
        },
      },
      {
        path: RouteUtils.AreaTreePage.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () => import('@modules/area-trees/area-trees.module').then((m) => m.AreaTreesModule),
        data: {
          title: 'Area Trees',
          hideHeader: true,
          breadcrumb: 'Area Trees',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.DataAdmin, eRoles.OperationAdmin],
        },
      },
      {
        path: RouteUtils.InspectionPoliciesPage.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () =>
          import('@modules/inspection-policies/inspection-policies.module').then((m) => m.InspectionPoliciesModule),
        data: {
          title: 'Inspection Policies',
          hideHeader: true,
          breadcrumb: 'Inspection Policies',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.DataAdmin, eRoles.OperationAdmin],
        },
      },
      {
        path: RouteUtils.PaymentPoliciesPage.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () =>
          import('@modules/payment-policies/payment-policies.module').then((m) => m.PaymentPoliciesModule),
        data: {
          title: 'Payment Policies',
          hideHeader: true,
          breadcrumb: 'Payment Policies',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.DataAdmin, eRoles.OperationAdmin],
        },
      },
      {
        path: RouteUtils.DeliveryFeePoliciesPage.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () =>
          import('@modules/delivery-fee-policies/delivery-fee-policies.module').then(
            (m) => m.DeliveryFeePoliciesModule,
          ),
        data: {
          title: 'Delivery Fee Policies',
          hideHeader: true,
          breadcrumb: 'Delivery Fee Policies',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.DataAdmin, eRoles.OperationAdmin],
        },
      },
      {
        path: RouteUtils.ReportsPage.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () => import('@modules/report/report.module').then((m) => m.ReportModule),
        data: {
          title: 'Reports',
          hideHeader: true,
          breadcrumb: 'Reports',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.CustomerServiceAdmin],
        },
      },
      {
        path: RouteUtils.FeedbacksPage.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () => import('@modules/feedback/feedback.module').then((m) => m.FeedbackModule),
        data: {
          title: 'Feedbacks',
          hideHeader: true,
          breadcrumb: 'Feedbacks',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.CustomerServiceAdmin],
        },
      },
      {
        path: RouteUtils.DeptPoliciesPage.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () => import('@modules/debt-policies/debt-policies.module').then((m) => m.DebtPoliciesModule),
        data: {
          title: 'Dept Policies',
          hideHeader: true,
          breadcrumb: 'Dept Policies',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.DataAdmin, eRoles.OperationAdmin],
        },
      },
      {
        path: RouteUtils.NotificationManagement.Base,
        canActivate: [AuthGuard, RolesGuard],
        loadChildren: () =>
          import('@modules/notification-management/notification-management.module').then(
            (m) => m.NotificationManagementModule,
          ),
        data: {
          title: 'Notification Management',
          hideHeader: true,
          breadcrumb: 'Notification Management',
          layout: eLayouts.Fixed,
          roles: [eRoles.SuperAdmin, eRoles.DataAdmin, eRoles.OperationAdmin],
        },
      },
      {
        path: 'community-standards',
        loadChildren: () =>
          import('@modules/community-standards/community-standards.route').then((m) => m.COMMUNITY_STANDARDS_ROUTES),
        canActivate: [AuthGuard, RolesGuard],
        data: {
          roles: [eRoles.SuperAdmin, eRoles.DataAdmin],
        },
      },
      {
        path: 'approval/community-standards',
        loadChildren: () =>
          import('@modules/community-standards/community-standards.route').then((m) => m.COMMUNITY_STANDARDS_ROUTES),
        canActivate: [AuthGuard, RolesGuard],
        data: {
          roles: [eRoles.SuperAdmin, eRoles.OperationAdmin],
        },
      },
    ],
  },
  {
    path: 'design-system',
    loadChildren: () => import('@modules/design-system/design-system.module').then((m) => m.DesignSystemModule),
  },
  {
    path: '**',
    loadChildren: () => import('@modules/page-not-found/page-not-found.module').then((m) => m.PageNotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }), LayoutsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
