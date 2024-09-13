import { HttpParams } from '@angular/common/http';

export class ApiUtils {
  static Portal = {
    Login: `auth/login`,
    ForgotPasswordSendOtp: `auth/forgot-password/send-otp`,
    ResendEmailActive: 'admin/resend-email-active',
    VerifyTokenEmail: 'admin/verify-token-email',
    CreateActiveEmailPassword: 'admin/create-password',
  };

  static Profile = {
    GetDetail: 'admin/owner-profile/get-profile',
    AddPhone: 'admin/owner-profile/phone-add',
    UpdatePhone: 'admin/owner-profile/phone-update',
    DeletePhone: 'admin/owner-profile/phone-delete',
    AddEmail: 'admin/owner-profile/email-add',
    UpdateEmail: 'admin/owner-profile/email-update',
    DeleteEmail: 'admin/owner-profile/email-delete',
    AddAddress: 'admin/owner-profile/address-add',
    UpdateAddress: 'admin/owner-profile/address-update',
    DeleteAddress: 'admin/owner-profile/address-delete',
    AddUrl: 'admin/owner-profile/url-add',
    UpdateUrl: 'admin/owner-profile/url-update',
    DeleteUrl: 'admin/owner-profile/url-delete',
    UpdateAvatar: 'admin/owner-profile/update-avatar',
    UpdateCover: 'admin/owner-profile/update-cover',
    Update: 'admin/owner-profile/update',
  };

  static RequestingPrograms = {
    GetList: 'admin-program/get-list',
    GetDetail: 'admin-program',
    GetCounters: 'admin-program/count-list',
    SetReviewing: 'admin-program/review',
    SetApproved: 'admin-program/approval',
    SetRejected: 'admin-program/reject',
    SetHidden: 'admin-program/hidden',
    SetArchived: 'admin-program/archived',
  };

  static ProductCategories = {
    GetConnectList: 'product-category/get-list',
    GetList: `product-category`,
    GetDetail: 'product-category',
    GetCounters: 'product-category/count',
    Create: 'product-category',
    Update: 'product-category',
    Delete: 'product-category',
  };

  static Banks = {
    GetList: 'admin-bank/get-list',
    GetDetail: 'admin-bank/detail',
    GetCounters: 'admin-bank/count-list',
    Create: 'admin-bank/create',
    Update: 'admin-bank/update',
    Delete: 'admin-bank/delete',
  };

  static PrivacyPolicies = {
    GetList: 'admin-privacy-policy/get-list',
    GetCounters: 'admin-privacy-policy/count-list',
    GetDetail: 'admin-privacy-policy/detail',
    Create: 'admin-privacy-policy/create',
    Update: 'admin-privacy-policy/update',
    Delete: 'admin-privacy-policy/delete',
  };

  static ProgramPolicies = {
    GetList: 'admin-program-policy/get-list',
    GetCounters: 'admin-program-policy/count-list',
    GetDetail: 'admin-program-policy/detail',
    Create: 'admin-program-policy/create',
    Update: 'admin-program-policy/update',
    Delete: 'admin-program-policy/delete',
  };

  static SalesFeePolicies = {
    GetList: 'admin-sale-fee-policy/get-list',
    GetCounters: 'admin-sale-fee-policy/count-list',
    GetDetail: 'admin-sale-fee-policy/detail',
    Create: 'admin-sale-fee-policy/create',
    Update: 'admin-sale-fee-policy/update',
    Delete: 'admin-sale-fee-policy/delete',
  };

  static OrganizationRegistrationPolicies = {
    GetList: 'admin-organization-registration-policy/get-list',
    GetCounters: 'admin-organization-registration-policy/count-list',
    GetDetail: 'admin-organization-registration-policy/detail',
    Create: 'admin-organization-registration-policy/create',
    Update: 'admin-organization-registration-policy/update',
    Delete: 'admin-organization-registration-policy/delete',
  };

  static ReturnPolicies = {
    GetList: 'admin-return-policy/get-list',
    GetCounters: 'admin-return-policy/count-list',
    GetDetail: 'admin-return-policy/detail',
    Create: 'admin-return-policy/create',
    Update: 'admin-return-policy/update',
    Delete: 'admin-return-policy/delete',
  };

  static OtherPolicies = {
    GetList: 'admin-other-policy/get-list',
    GetCounters: 'admin-other-policy/count-list',
    GetDetail: 'admin-other-policy/detail',
    Create: 'admin-other-policy/create',
    Update: 'admin-other-policy/update',
    Delete: 'admin-other-policy/delete',
  };

  static AdminCities = {
    GetDetail: 'admin-cities/detail',
    GetList: 'admin-cities/get-list',
    Create: 'admin-cities/create',
    Update: 'admin-cities/update',
  };

  static AdminDistricts = {
    GetList: 'admin-districts/get-list',
    GetDetail: 'admin-districts/detail',
    Create: 'admin-districts/create',
    Update: 'admin-districts/update',
  };

  static AdminWards = {
    GetList: 'admin-ward/get-list',
    GetDetail: 'admin-ward/detail',
    Create: 'admin-ward/create',
    Update: 'admin-ward/update',
    Delete: 'admin-ward/delete',
  };

  static InspectionPolicies = {
    GetList: 'admin-check-goods-policy/get-list',
    GetCounters: 'admin-check-goods-policy/count-list',
    GetDetail: 'admin-check-goods-policy/detail',
    Create: 'admin-check-goods-policy/create',
    Update: 'admin-check-goods-policy/update',
    Delete: 'admin-check-goods-policy/delete',
  };

  static ShippingPolicies = {
    GetList: 'admin-delivery-policy/get-list',
    GetCounters: 'admin-delivery-policy/count-list',
    GetDetail: 'admin-delivery-policy/detail',
    Create: 'admin-delivery-policy/create',
    Update: 'admin-delivery-policy/update',
    Delete: 'admin-delivery-policy/delete',
  };

  static PaymentPolicies = {
    GetList: 'admin-payment-policy/get-list',
    GetCounters: 'admin-payment-policy/count-list',
    GetDetail: 'admin-payment-policy/detail',
    Create: 'admin-payment-policy/create',
    Update: 'admin-payment-policy/update',
    Delete: 'admin-payment-policy/delete',
  };

  static DeliveryFeePolicies = {
    GetList: 'admin-delivery-price-policy/get-list',
    GetCounters: 'admin-delivery-price-policy/count-list',
    GetDetail: 'admin-delivery-price-policy/detail',
    Create: 'admin-delivery-price-policy/create',
    Update: 'admin-delivery-price-policy/update',
    Delete: 'admin-delivery-price-policy/delete',
  };

  static DebtPolicies = {
    GetList: 'admin-debt-policy/get-list',
    GetCounters: 'admin-debt-policy/count-list',
    GetDetail: 'admin-debt-policy/detail',
    Create: 'admin-debt-policy/create',
    Update: 'admin-debt-policy/update',
    Delete: 'admin-debt-policy/delete',
  };

  static ProductGroups = {
    GetList: `product-group`,
    GetDetail: 'product-group',
    GetCounters: 'product-group/count',
    Create: 'product-group',
    Update: 'product-group',
    Delete: 'product-group',
  };

  static Feedbacks = {
    GetList: 'admin-feedback/get-list',
    GetCounters: 'admin-feedback/count-list',
    GetDetail: 'admin-feedback/detail',
    MarkUseful: 'admin-feedback/mark-useful',
    Review: 'admin-feedback/review',
    Reply: 'admin-feedback/reply',
    Handle: 'admin-feedback/handled',
  };

  static Reports = {
    GetRatingReports: 'admin-report/reported-rating/get-list',
    GetSellerReports: 'admin-report/reported-seller/get-list',
    GetMessageReports: 'admin-report/reported-message/get-list',
    GetDetailedSellerReport: 'admin-report/reported-seller/get-detail',
    GetDetailedMessageReport: 'admin-report/reported-message/get-detail',
    GetDetailedRatingReport: 'admin-report/reported-rating/get-detail',
    HandleMessageReport: 'admin-report/reported-message/handle',
    HandleSellerReport: 'admin-report/reported-seller/handle',
    HandleRatingReport: 'admin-report/reported-rating/handle',
    ReviewMessageReport: 'admin-report/reported-message/review',
    ReviewSellerReport: 'admin-report/reported-seller/review',
    ReviewRatingReport: 'admin-report/reported-rating/review',
    ReplyMessageReport: 'admin-report/reported-message/reply',
    ReplySellerReport: 'admin-report/reported-seller/reply',
    ReplyRatingReport: 'admin-report/reported-rating/reply',
    CountMessageReports: 'admin-report/reported-message/count-list',
    CountSellerReports: 'admin-report/reported-seller/count-list',
    CountRatingReports: 'admin-report/reported-rating/count-list',
  };

  static RequestingProducts = {
    GetList: 'admin-product/get-list',
    GetDetail: 'admin-product/detail',
    GetCounters: 'admin-product/count-list',
    SetReviewing: 'admin-product/review',
    SetApproved: 'admin-product/approval',
    SetRejected: 'admin-product/reject',
    SetHidden: 'admin-product/hidden',
    SetArchived: 'admin-product/archived',
    Verify: 'admin-product/verify',
  };

  static RequestingProfiles = {
    GetList: 'admin-profile',
    GetDetail: 'admin-profile/detail',
    GetCounters: 'admin-profile/count-seller',
    SetStatus: 'admin-profile/approval',
    Reviewing: 'admin-profile/reviewing',
    Hide: 'admin-profile/hidden-seller',
    Archive: 'admin-profile/archive-seller',
  };

  static Users = {
    GetList: 'admin',
    GetDetail: 'admin/detail',
    GetCounters: 'admin/count-list',
    Create: 'admin/create',
    SetPassword: 'admin/create-password',
    Update: 'admin/update',
    UpdateStatus: 'admin/update-status',
  };

  static Seller = {
    CheckSellerLogin: `auth/check-seller-login`,
    SignUpPhone: `auth/signup-phone`,
    SignUpEmail: `auth/signup-email`,
    CheckAgreement: `agreement/seller/check-add-agreement`,
    VerifyOtp: `auth/verify-otp`,
    ResendOtpPhone: `auth/resend-otp-phone`,
    ResendOtpEmail: `auth/resend-otp-email`,
    ForgotPasswordSendOtpPhone: `auth/forgot-password/send-otp-phone`,
    ForgotPasswordSendOtpEmail: `auth/forgot-password/send-otp-email`,
    ForgotPasswordVerifyOtp: `auth/forgot-password/verify-otp`,
    SignInPhone: `auth/signin-phone`,
    SignInEmail: `auth/signin-email`,
    SignOut: `auth/signout`,
    CreatePassword: `auth/create-password`,
    ForgotPasswordCreatePassword: `auth/forgot-password/create-password`,
    CheckInfo: `seller/check-info`,
    GetProfile: `seller-profile`,
    ProfileUpdateAvatar: `seller-profile/update-avatar`,
    ProfileUpdateCover: `seller-profile/update-cover`,
    ProfileAddAddress: `seller/profile/address-add`,
    ProfileUpdateAddress: `seller/profile/address-update`,
    ProfileDeleteAddress: `seller/profile/address-delete`,
    ProfileAddEmail: `seller/profile/email-add`,
    ProfileVerifyEmail: `seller/profile/email-verify`,
    ProfileResendOtpEmail: `seller/profile/email-resend-otp`,
    ProfileUpdateEmail: `seller/profile/email-update`,
    ProfileDeleteEmail: `seller/profile/email-delete`,
    ProfileAddPhone: `seller/profile/phone-add`,
    ProfileVerifyPhone: `seller/profile/phone-verify`,
    ProfileResendOtpPhone: `seller/profile/phone-resend-otp`,
    ProfileUpdatePhone: `seller/profile/phone-update`,
    ProfileDeletePhone: `seller/profile/phone-delete`,
    ProfileAddUrl: `seller/profile/url-add`,
    ProfileUpdateUrl: `seller/profile/url-update`,
    ProfileDeleteUrl: `seller/profile/url-delete`,
    ProfileUpdateContactInfo: `seller/profile/contact-info-update`,
    ProfileUpdateSellerLoginID: `seller/profile/seller-login-id-update`,
    ProfileGetDocuments: `seller/profile/list-document`,
    ProfileSaveDocument: `seller/profile/upload-document`,
    ProfileUpdateDocument: `seller/profile/update-document`,
    ProfileDeleteDocument: `seller/profile/delete-document`,
    ProfileChangeContentStatus: `seller/profile/change-status-document`,
    ProfileCountDocuments: `seller/profile/count-document`,
    AddInfoPerson: `seller/add-info-person`,
    UploadDocumentPerson: `seller/person/upload-document`,
    UploadDocumentBusiness: `seller/business/upload-ocument`,
    AddInfoBusiness: `seller/add-info-business`,
    ProfileUpdateInfo: `seller-profile/update-info`,
    ProfileUploadDocument: `seller-profile/update-document`,
    GetAgreement: `agreement/seller/get-agreement`,
    AddAgreement: `agreement/seller/add-agreement`,
  };

  static Cities = {
    GetList: `admin-cities/get-list`,
  };

  static District = {
    GetList: `admin-districts/get-list`,
  };

  static Languages = {
    GetList: `language/get-list`,
  };

  static FunctionalGroups = {
    GetList: `product-group/get-list`,
    GetListCategory: `product-group/get-list-category`,
  };

  static SaleUnits = {
    GetList: `admin-sale-unit/get-list`,
    GetDetail: `admin-sale-unit/detail`,
    GetCounters: `admin-sale-unit/count-list`,
    Create: `admin-sale-unit/create`,
    Update: `admin-sale-unit/update`,
    Delete: `admin-sale-unit/delete`,
  };

  static Attributes = {
    GetList: `admin-attribute/get-list`,
    GetCounters: `admin-attribute/count`,
    GetDetail: `admin-attribute/detail`,
    Add: `admin-attribute/add`,
    Update: `admin-attribute/update`,
    GetListValue: `admin-attribute/get-list-value`,
    AddValue: `admin-attribute/add-value`,
    UpdateValue: `admin-attribute/update-value`,
  };

  static AttributeValues = {
    GetListByAttributeId: `attribute/get-attribute-value-by-attribute-id`,
  };

  static Media = {
    Upload: `media/upload`,
    UploadCkEditor: `media/upload-ck-editor`,
  };

  static Countries = {
    GetList: `country/get-list`,
  };

  static Product = {
    GetList: `product/get-list`,
    Detail: `product/detail`,
    Add: `product/add`,
    Update: `product/update`,
    Delete: `product/delete`,
    ChangeStatus: `product/change-status`,
    CheckUpdate: `product/check-update`,
  };

  static GeneralSetting = {
    GetList: `admin-general-settings/get-list`,
    GetDetail: `admin-general-settings/detail`,
    Create: `admin-general-settings/create`,
    Update: `admin-general-settings/update`,
    Delete: `admin-general-settings/delete`,
    GetCounters: 'admin-general-settings/count-list',
    CheckDraftExist: `admin-general-settings/check-draft`,
  };

  static Agreement = {
    GetList: `admin-agreement/get-list`,
    GetDetail: `admin-agreement/detail`,
    Create: `admin-agreement/create`,
    Update: `admin-agreement/update`,
    GetCounters: 'admin-agreement/count-list',
    CheckDraftExist: `admin-agreement/check-draft`,
  };

  static QuestionAndAnswer = {
    GetList: `admin-qna/get-list`,
    GetDetail: 'admin-qna/detail',
    GetCounters: 'admin-qna/count-list',
    Create: 'admin-qna/create',
    Update: 'admin-qna/update',
    Delete: 'admin-qna',
  };

  static Contact = {
    GetList: `admin-contact/get-list`,
    GetDetail: `admin-contact`,
    GetByType: `admin-contact/get-contact`,
    Create: `admin-contact/create`,
    Update: `admin-contact/update`,
    CreatePhone: `admin-contact/phone-add`,
    UpdatePhone: `admin-contact/phone-update`,
    DeletePhone: `admin-contact/phone-delete`,
    CreateEmail: `admin-contact/email-add`,
    UpdateEmail: `admin-contact/email-update`,
    DeleteEmail: `admin-contact/email-delete`,
    CreateAddress: `admin-contact/address-add`,
    UpdateAddress: `admin-contact/address-update`,
    DeleteAddress: `admin-contact/address-delete`,
  };

  static Brands = {
    GetList: `admin-brand/get-list`,
    GetDetail: `admin-brand`,
    GetCounters: 'admin-brand/count-list',
    Create: `admin-brand/create`,
    Update: `admin-brand/update`,
    Delete: `admin-brand/delete`,
  };

  static UserGuide = {
    GetList: 'admin-user-guide/get-list',
    GetCounters: 'admin-user-guide/count-list',
    GetDetail: 'admin-user-guide/detail',
    Create: 'admin-user-guide/create',
    Update: 'admin-user-guide/update',
    Delete: 'admin-user-guide/delete',
  };

  static NotificationManagement = {
    GetList: 'admin-notification/get-list',
    GetCounters: 'admin-notification/count-list',
    GetDetail: 'admin-notification/detail',
    Create: 'admin-notification/create',
    Update: 'admin-notification/update',
    Delete: 'admin-notification/delete',
  };

  static Comment = {
    GetListProductReviewRequest: `admin-comment/get-list-product-request-review`,
    CreateProductReviewRequest: `admin-comment/create-product-request-review`,
    GetListProgramReviewRequest: `admin-comment/get-list-program-request-review`,
    CreateProgramReviewRequest: `admin-comment/create-program-request-review`,
  };

  static BadWords = {
    GetList: `admin-badword/get-list`,
    GetDetail: `admin-badword/detail`,
    Create: `admin-badword/create`,
    Update: `admin-badword/update`,
    Delete: `admin-badword/delete`,
    SendApproval: `admin-badword/send-approval`,
    Review: `admin-badword/review`,
    Reject: `admin-badword/reject`,
    Approval: `admin-badword/approval`,
    GetCounters: 'admin-badword/count-list',
    CheckDraftExist: `admin-badword/check-draft`,
  };

  static genHttpParams(params: any) {
    if (!params) {
      return new HttpParams();
    }
    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null) {
        httpParams = httpParams.append(key, params[key]);
      }
    });
    return httpParams;
  }
}
