import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { ePageActions } from '@shared/enums';

export class RouteUtils {
  static AccountPage = {
    Base: 'account',
    Active: 'active',
    Login: 'login',
    Signup: 'signup',
    ForgotPassword: 'forgot-password',
    ForgotVerifyOtp: 'forgot-verify-otp',
    ResetPassword: 'reset-password',
    SignupVerifyOtp: 'signup-verify-otp',
    SignupUpdateInfo: 'signup-update-info',
    UpdateInfo: 'update-info',
    SignupTermOfUse: 'term-of-use',
    Welcome: 'welcome',
    DetailInfo: 'info',
  };

  static AttributesPage = {
    Base: 'attributes',
    Detail: ':id',
    Create: 'create',
  };

  static BrandsPage = {
    Base: 'brands',
    Detail: ':id',
    Create: 'create',
  };

  static AreaTreePage = {
    Base: 'area-tree',
    CityId: ':cityId',
    DistrictId: ':districtId',
  };

  static SaleUnitsPage = {
    Base: 'sale-units',
    Detail: ':id',
    Create: 'create',
  };

  static BanksPage = {
    Base: 'banks',
    Detail: ':id',
    Create: 'create',
  };

  static CategoriesPage = {
    Base: 'categories',
    Detail: ':id',
    Create: 'create',
  };

  static PrivacyPoliciesPage = {
    Base: 'privacy-policies',
    Detail: ':id',
    Create: 'create',
  };

  static ReportsPage = {
    Base: 'reports',
    SellerReport: 'shop',
    MessageReport: 'message',
    RatingReport: 'rating',
    Detail: ':id',
  };

  static FeedbacksPage = {
    Base: 'feedbacks',
    Detail: ':id',
  };

  static ReturnPoliciesPage = {
    Base: 'return-policies',
    Detail: ':id',
    Create: 'create',
  };

  static OtherPoliciesPage = {
    Base: 'other-policies',
    Detail: ':id',
    Create: 'create',
  };

  static ShippingPoliciesPage = {
    Base: 'shipping-policies',
    Detail: ':id',
    Create: 'create',
  };

  static OrganizationRegistrationPoliciesPage = {
    Base: 'organization-registration-policies',
    Detail: ':id',
    Create: 'create',
  };

  static PaymentPoliciesPage = {
    Base: 'payment-policies',
    Detail: ':id',
    Create: 'create',
  };

  static InspectionPoliciesPage = {
    Base: 'inspection-policies',
    Detail: ':id',
    Create: 'create',
  };

  static ProgramPoliciesPage = {
    Base: 'program-policies',
    Detail: ':id',
    Create: 'create',
  };

  static SalesFeePoliciesPage = {
    Base: 'sales-fee-policies',
  };

  static DeliveryFeePoliciesPage = {
    Base: 'delivery-fee-policies',
  };

  static DeptPoliciesPage = {
    Base: 'dept-policies',
  };

  static PackedUnitsPage = {
    Base: 'packed-units',
    Detail: ':id',
    DetailPackingUnits: 'packing-units',
    DetailSellingUnits: 'selling-units',
  };

  static ProgramsPage = {
    Base: 'programs',
    Detail: ':id',
  };

  static ProfilesPage = {
    Base: 'profiles',
    Detail: ':id',
  };

  static UsersPage = {
    Base: 'users',
    Detail: ':id',
    DetailInfo: 'info',
    DetailControlPanel: 'control-panel',
  };

  static ProductsPage = {
    Base: 'products',
    List: 'list',
    ProductId: ':id',
    GeneralInfo: 'general-info',
    Events: 'events',
    Policies: 'policies',
    Prices: 'prices',
    ChangeHistory: 'change-history',
    Create: 'create',
    Edit: 'edit',
    View: 'view',
    Detail: 'detail',
    Mode: 'mode',
  };

  static GroupsPage = {
    Base: 'groups',
    Detail: ':id',
  };

  static ProfilePage = {
    Base: 'profile',
    AccountInfo: 'info',
    ControlPanel: 'control-panel',
    Documents: 'documents',
    ContentStatus: 'contentStatus',
    New: 'new',
    Edit: 'edit',
    Pending: 'pending',
    Review: 'review',
    Rejected: 'rejected',
    Approved: 'approved',
    Archived: 'archived',
  };

  static OrdersPage = {
    Base: 'orders',
    All: '',
  };

  static SalesPage = {
    Base: 'sales',
    All: '',
  };

  static GeneralSettingPage = {
    Base: 'general-setting',
    Authentication: 'authentication',
    Detail: ':id',
    Create: 'create',
  };

  static AgreementPage = {
    Base: 'agreements',
    Detail: ':id',
    Create: 'create',
  };

  static QuestionAndAnswer = {
    Base: 'question-and-answer',
    Detail: ':id',
    Create: 'create',
  };

  static ContactAndSupport = {
    Base: 'contact-and-support',
    Contact: 'contact',
    Guide: 'guide',
  };

  static UserGuide = {
    Base: 'user-guide',
    Detail: ':id',
    Create: 'create',
  };

  static NotificationManagement = {
    Base: 'notification-management',
    Detail: ':id',
  };

  static CommunityStandards = {
    Base: 'community-standards',
    Approval: 'approval',
    Detail: ':id',
    Create: 'create',
  };

  static getActionPage(route: ActivatedRoute | null | undefined, router: Router): Observable<ePageActions> {
    if (!route) {
      return of(ePageActions.Create);
    }
    return route.paramMap.pipe(
      map((params) => {
        if (params.has('id')) {
          if (router.url.split('/').pop()?.includes(ePageActions.Edit)) {
            return ePageActions.Edit;
          } else {
            return ePageActions.View;
          }
        } else {
          return ePageActions.Create;
        }
      }),
    );
  }

  static getObjectId(route: ActivatedRoute, idKey: string): Observable<string> {
    idKey = idKey.replace(':', '');
    return route.children[0].paramMap.pipe(map((params) => params.get(idKey) || ''));
  }
}
