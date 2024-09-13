//ROLE_SUPER_ADMIN: 10,
//   ROLE_CUSTOMER_SERVICE_ADMIN: 20,
//   ROLE_ACCOUNTANT_ADMIN: 30,
//   ROLE_OPERATION_ADMIN: 40,
//   ROLE_SHIPPING_ADMIN: 50,

export enum eRoles {
  SuperAdmin = 10,
  CustomerServiceAdmin = 20,
  AccountantAdmin = 30,
  OperationAdmin = 40,
  ShippingAdmin = 50,
  DataAdmin = 60,
}

export enum eFeedbackSortType {
  Newest = 'NEWEST',
  Oldest = 'OLDEST',
  AToZ = 'AZ',
}

export enum eFeedbackTopic {
  All = '',
  Consultation = 10, // Tu van
  Reflection = 20, // Phan anh
  Suggestion = 30, // Gop y cai tien
  Other = 40, // Khac
}

export enum eFeedbackFilterType {
  All = '',
  New = 4,
  Reviewing = 13,
  Handled = 18,
  Useful = 100,
}

export enum eReportUserType {
  All = '',
  User = 10,
  Seller = 20,
}

export enum eReportContentStatus {
  New = 4,
  Reviewing = 13,
  Handled = 18,
}

export enum eRatingReportType {
  UserComment = 39,
  SellerComment = 40,
}

export enum eMessageReportReason {
  ContactOutside = 20,
  FakeProduct = 10,
  ViolentLanguage = 30,
  OffensiveLanguage = 40,
  Other = 50,
}

export enum eShopReportReason {
  PoorQuality = 10,
  Cheat = 20,
  RatingFake = 30,
  Other = 40,
}

export enum eReportAction {
  HideComment = 10,
  BlockUser = 20,
  BlockSeller = 30,
  RejectReport = 40,
}

export enum eRatingReportReason {
  Violation = 10, // Đánh giá mang tính xúc phạm, thô tục
  Fake = 20, // Đánh giá sai sự thật
  Other = 30, // Lý do khác
}

export enum eReportType {
  Rating,
  Shop,
  Message,
}

export enum eBusinessTypes {
  Business = 0,
  Personal = 1,
}

export enum eAccountPage {
  Base = 'account',
  Login = 'login',
  Signup = 'signup',
  ForgotPassword = 'forgot-password',
  ForgotVerifyOtp = 'forgot-verify-otp',
  ResetPassword = 'reset-password',
  SignupVerifyOtp = 'signup-verify-otp',
  SignupUpdateInfo = 'signup-update-info',
  SignupUploadDocument = 'signup-upload-document',
  SignupTermOfUse = 'signup-term-of-use',
}

export enum eMediaPreview {
  Swiper = 'swiper',
  SortGrid = 'sort-grid',
}

export enum eViewMode {
  Table = 'table',
  Card = 'card',
}

export enum ePageActions {
  View = 'view',
  Edit = 'edit',
  Create = 'create',
}

export enum eDeviceTypes {
  Mobile = 'MOBILE',
  Webapp = 'WEBAPP',
}

export enum eToastStatus {
  Normal = 'normal',
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
}

export enum ePidTypes {
  Nation = 0,
  IdentifyCard = 5,
  SocialInsurance = 9,
  DrivingLicense = 12,
}

export enum eProductEventStatuses {
  Valid = 'valid',
  Expired = 'expired',
  Waiting = 'waiting',
}

export enum eAddressLabels {
  Home = 10, // nha
  Work = 20, // noi lam viec
  Other = 30, // khac
  HeadOffice = 40, // tru so
  RepresentativeOffice = 50, // van phong dai dien
}

export enum ePhoneLabels {
  Home = 10,
  Work = 20,
  Mobile = 30,
  Other = 40,
}

export enum eEmailLabels {
  Work = 10,
  Private = 20,
  Other = 30,
}

export enum eDefaultStatus {
  Default = 1,
  NotDefault = 0,
}

export enum eContentStatuses {
  New = 0,
  SellerPending = 1,
  SellerRejected = 2,
  SellerApproved = 3,
  AdminPending = 4,
  AdminRejected = 5,
  AdminApproved = 6,
  Published = 7,
  SellerHidden = 8,
  SellerArchived = 9,
  AdminHidden = 10,
  AdminArchived = 11,
  SellerReviewing = 12,
  AdminReviewing = 13,
  All = -1,
  Draft = 999,
  AdminProcessing = 14,
  AdminProcessingDone = 15,
}

export enum eAccountStatus {
  All = -1,
  InActivated = 0,
  Activated = 1,
  NeedInfo = 2,
  Locked = 3,
  Disabled = 4,
  NeedUpload = 5,
  ConfirmationPending = 6,
  Archived = 7,
  Hidden = 8,
}

export enum ePackedUnitType {
  All = -1,
  Packing = 0,
  Selling = 1,
}

export enum eProgramType {
  Discount = 10,
  Gift = 20,
  Combo = 30,
}

export enum eProgramGiftTypes {
  Percent = 10,
  Amount = 20,
  SimilarProduct = 30,
  Any = 40,
}

export enum eProductTypes {
  Drug = 0,
  Functional = 1,
  Supplement = 2,
  MedicalEquipment = 3,
  Other = 4,
}

export enum eSortDirections {
  Asc = 'asc',
  Desc = 'desc',
}

// ORDER_BY_NEWEST : 1,
// ORDER_BY_NAME_A_Z : 2,

export enum eProductSortTypes {
  OrderByNewest = 1,
  OrderByNameAsc = 0,
}

export enum eWeightUnits {
  NanoGram = 10,
  MicroGram = 20,
  MilliGram = 30,
  Gram = 40,
  DecaGram = 50,
  HectoGram = 60,
  KiloGram = 70,
}

export enum eSizeUnits {
  NanoMeter = 10,
  MicroMeter = 20,
  MilliMeter = 30,
  CentiMeter = 40,
  Meter = 50,
  DecaMeter = 60,
  HectoMeter = 70,
  KiloMeter = 80,
}

export enum eVolumeUnits {
  MilliLiter = 10,
  CentiLiter = 20,
  DeciLiter = 30,
  Liter = 40,
}

export enum eLayouts {
  Fixed = 'fixed',
  Scroll = 'scroll',
}

export enum eConfirmModalTypes {
  Confirm = 'confirm',
  Warning = 'warning',
  Error = 'error',
  Success = 'success',
  Processing = 'processing',
}

export enum UpdateInformationFormKeys {
  SellerCover = 'sellerCover',
  SellerAvatar = 'sellerAvatar',
  BusinessCode = 'businessCode',
  BusinessName = 'businessName',
  Email = 'email',
  Phone = 'phone',
  Address = 'address',
  CityID = 'cityID',
  DistrictID = 'districtID',
  Website = 'website',
  Duns = 'duns',
  PostalCode = 'postalCode',
  ContactFullName = 'contactFullName',
  ContactEmail = 'contactEmail',
  ContactPhone = 'contactPhone',
}

export enum eUpdateInfoStep {
  Info = 1,
  Document = 2,
}

export enum eAgreementTypes {
  Seller = 10,
  User = 20,
}

export enum eDebtCyclePeriods {
  Weekly = 10,
  Monthly = 20,
}

export enum eWeekDays {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export enum eMenuClickEvents {
  SignOut = 'sign-out',
}

export enum eUserTypes {
  User = 10,
  Seller = 20,
}

export enum eDeliveryMethods {
  Economical = 10,
  Fast = 20,
  SuperFast = 30,
}

export enum eProgramTypes {
  Discount = 10,
  Combo = 20,
  Gift = 30,
}

export enum eProgramGiftBase {
  Quantity = 10,
  Price = 20,
}

export enum eTimeStatuses {
  All = -1,
  WaitingForEffect = 10,
  InEffect = 20,
  Expired = 30,
}

export enum eDiscountTypes {
  Percent = 10,
  Amount = 20,
}

export enum eBtnActions {
  Delete = 'delete',
  Cancel = 'cancel',
  Edit = 'edit',
  Submit = 'submit',
  Save = 'save',
  Reviewing = 'reviewing',
  SendApproval = 'send-approval',
  Approve = 'approve',
  Reject = 'reject',
  View = 'view',
  Hide = 'hide',
}

export enum ERROR_CODES {
  ERROR_CODE_PARAM_MISSING = 'ER0001',
  ERROR_CODE_PARAM_MISSING_MESS = 'Param is missing',
  ERROR_CODE_ERROR_SYSTEM = 'ER0002',
  ERROR_CODE_ERROR_SYSTEM_MESS = 'System is error',
  ERROR_CODE_USERLOGIN_WAS_EXISTING = 'MSG0044',
  ERROR_CODE_USERLOGIN_WAS_EXISTING_MESS = 'UserLogin was existing',
  ERROR_CODE_USER_IS_NOT_EXISTING = 'MSG0020',
  ERROR_CODE_USER_IS_NOT_EXISTING_MESS = 'User is not existing',
  ERROR_CODE_USER_OR_PASSWORD_IS_NOT_CORRECT = 'MSG0021',
  ERROR_CODE_USER_OR_PASSWORD_IS_NOT_CORRECT_MESS = 'User or Password is not correct',
  ERROR_CODE_OTP_EXPIRED = 'MSG0043',
  ERROR_CODE_OTP_EXPIRED_MESS = 'OTP was expired',
  ERROR_CODE_OTP_IS_NOT_CORRECT = 'MSG0008',
  ERROR_CODE_OTP_IS_NOT_CORRECT_MESS = 'OTP is not correct',
  ERROR_CODE_USER_IS_DISABLE = 'MSG0045',
  ERROR_CODE_USER_IS_DISABLE_MESS = 'User is disable',
  ERROR_CODE_USER_IS_INACTIVE = 'MSG0046',
  ERROR_CODE_USER_IS_INACTIVE_MESS = 'User is inactived',
  ERROR_CODE_OTP_WAS_BLOCKED = 'MSG0047',
  ERROR_CODE_OTP_WAS_BLOCKED_MESS = 'OTP was blocked',
  ERROR_CODE_UUID_IS_NOT_CORRECT = 'MSG0049',
  ERROR_CODE_UUID_IS_NOT_CORRECT_MESS = 'UUID is not correct',
  ERROR_CODE_USER_HAVE_BLOCKED_OTP = 'MSG0050',
  ERROR_CODE_USER_HAVE_BLOCKED_OTP_MESS = 'User have blocked OTP',
  ERROR_CODE_CATEGORY_IS_NOT_EXISTING = 'MSG0051',
  ERROR_CODE_CATEGORY_IS_NOT_EXISTING_MESS = 'Category is not existing',
  ERROR_CODE_PRODUCT_IS_NOT_EXISTING = 'MSG0052',
  ERROR_CODE_PRODUCT_IS_NOT_EXISTING_MESS = 'Product is not existing',
  ERROR_CODE_SELLER_IS_NOT_EXISTING = 'MSG0053',
  ERROR_CODE_SELLER_IS_NOT_EXISTING_MESS = 'Seller is not existing',
  ERROR_CODE_SELLER_INFO_IS_NOT_UPDATED = 'MSG0054',
  ERROR_CODE_SELLER_INFO_IS_NOT_UPDATED_MESS = 'Seller Info is not updated',
  ERROR_CODE_SELLER_DOCUMENT_IS_NOT_UPDATED = 'MSG0055',
  ERROR_CODE_SELLER_DOCUMENT_IS_NOT_UPDATED_MESS = 'Seller Document is not updated',
  ERROR_CODE_SELLER_AGREEMENT_IS_NOT_UPDATED = 'MSG0056',
  ERROR_CODE_SELLER_AGREEMENT_IS_NOT_UPDATED_MESS = 'Seller Agreement is not updated',
  ERROR_CODE_AGREEMENT_IS_NOT_EXISTING = 'MSG0057',
  ERROR_CODE_AGREEMENT_IS_NOT_EXISTING_MESS = 'Agreement is not existing',
  ERROR_CODE_SELLER_LOGIN_WAS_EXISTING = 'MSG0058',
  ERROR_CODE_SELLER_LOGIN_WAS_EXISTING_MESS = 'Seller Login was existing',
  ERROR_CODE_SELLER_OR_PASSWORD_IS_NOT_CORRECT = 'MSG0059',
  ERROR_CODE_SELLER_OR_PASSWORD_IS_NOT_CORRECT_MESS = 'Seller or Password is not correct',
  ERROR_CODE_SELLER_IS_DISABLE = 'MSG0060',
  ERROR_CODE_SELLER_IS_DISABLE_MESS = 'Seller is disable',
  ERROR_CODE_SELLER_IS_INACTIVE = 'MSG0061',
  ERROR_CODE_SELLER_IS_INACTIVE_MESS = 'Seller is inactived',
  ERROR_CODE_SELLER_HAVE_BLOCKED_OTP = 'MSG0062',

  // admin
  ERROR_CODE_ADMIN_LOGIN_WAS_EXISTING = 'MSG0123',
  ERROR_CODE_ADMIN_LOGIN_WAS_EXISTING_MESS = 'Admin Login was existing',
  ERROR_CODE_ADMIN_OR_PASSWORD_IS_NOT_CORRECT = 'MSG0124',
  ERROR_CODE_ADMIN_OR_PASSWORD_IS_NOT_CORRECT_MESS = 'Admin or Password is not correct',
  ERROR_CODE_ADMIN_IS_DISABLE = 'MSG0125',
  ERROR_CODE_ADMIN_IS_DISABLE_MESS = 'Admin is disable',
  ERROR_CODE_ADMIN_IS_INACTIVE = 'MSG0126`',
  ERROR_CODE_ADMIN_IS_INACTIVE_MESS = 'Admin is inactived',
  ERROR_CODE_ADMIN_HAVE_BLOCKED_OTP = 'MSG0127',
  ERROR_CODE_ADMIN_HAVE_BLOCKED_OTP_MESS = 'Admin have blocked OTP',
  ERROR_CODE_ADMIN_IS_NOT_EXISTING = 'MSG0128',
  ERROR_CODE_ADMIN_IS_NOT_EXISTING_MESS = 'Admin is not existing',

  ERROR_CODE_ADMIN_EMAIL_TOKEN_ACTIVE_IS_NOT_CORRECT = 'MSG0129',
  ERROR_CODE_ADMIN_EMAIL_TOKEN_ACTIVE_IS_NOT_CORRECT_MESS = 'Token is not correct',

  ERROR_CODE_ACCOUNT_STATUS_IS_NOT_CORRECT = 'MSG0130',
  ERROR_CODE_ACCOUNT_STATUS_IS_NOT_CORRECT_MESS = 'Account Status is not correct',

  ERROR_CODE_MEDIA_IS_NOT_EXISTING = 'MSG0131',
  ERROR_CODE_MEDIA_IS_NOT_EXISTING_MESS = 'Media is not existing',

  ERROR_CODE_ORDER_STATUS_IS_NOT_CORRECT = 'MSG0132',
  ERROR_CODE_ORDER_STATUS_IS_NOT_CORRECT_MESS = 'Order Status is not correct',

  ERROR_CODE_INVALID_DATE = 'MSG0133',
  ERROR_CODE_INVALID_DATE_MESS = 'Provided date is invalid',

  ERROR_CODE_PRICE_SCHEDULE_IS_NOT_EXISTING = 'MSG0134',
  ERROR_CODE_PRICE_SCHEDULE_IS_NOT_EXISTING_MESS = 'Price Schedule is not existing',

  ERROR_CODE_STOCK_IS_NOT_EXISTING = 'MSG0135',
  ERROR_CODE_STOCK_IS_NOT_EXISTING_MESS = 'Stock is not existing',

  ERROR_CODE_CONTENT_STATUS_DRAFT_IS_EXISTING = 'MSG0136',
  ERROR_CODE_CONTENT_STATUS_DRAFT_IS_EXISTING_MESS = 'Content Status Draft is existing',

  ERROR_CODE_AGREEMENT_STATUS_NOT_ALLOW = 'MSG0137',
  ERROR_CODE_AGREEMENT_STATUS_NOT_ALLOW_MESS = 'Agreement Status not allow',

  ERROR_CODE_DRAFT_AGREEMENT_EXISTED = 'MSG0138',
  ERROR_CODE_DRAFT_AGREEMENT_EXISTED_MESS = 'Draft Agreement existed',

  ERROR_CODE_AGREEMENT_NOT_FOUND = 'MSG0139',
  ERROR_CODE_AGREEMENT_NOT_FOUND_MESS = 'Agreement not found',

  ERROR_CODE_NOT_ALLOW_CHANGE_AGREEMENT_TYPE = 'MSG0140',
  ERROR_CODE_NOT_ALLOW_CHANGE_AGREEMENT_TYPE_MESS = 'Not allow change agreement type',

  ERROR_CODE_PENDING_ADMIN_SETTING_EXISTED = 'MSG0141',
  ERROR_CODE_PENDING_ADMIN_SETTING_EXISTED_MESS = 'Pending Admin Setting existed',

  ERROR_CODE_ADMIN_SETTING_NOT_FOUND = 'MSG0142',
  ERROR_CODE_ADMIN_SETTING_NOT_FOUND_MESS = 'Admin Setting not found',

  ERROR_CODE_ADMIN_SETTING_STATUS_NOT_ALLOW = 'MSG0143',
  ERROR_CODE_ADMIN_SETTING_STATUS_NOT_ALLOW_MESS = 'Admin Setting Status not allow',

  ERROR_CODE_DRAFT_ADMIN_SETTING_EXISTED = 'MSG0144',
  ERROR_CODE_DRAFT_ADMIN_SETTING_EXISTED_MESS = 'Draft Admin Setting existed',

  ERROR_CODE_REVIEWING_ADMIN_SETTING_EXISTED = 'MSG0145',
  ERROR_CODE_REVIEWING_ADMIN_SETTING_EXISTED_MESS = 'Reviewing Admin Setting existed',

  ERROR_CODE_REVIEWING_AGREEMENT_EXISTED = 'MSG0146',
  ERROR_CODE_REVIEWING_AGREEMENT_EXISTED_MESS = 'Reviewing Agreement existed',

  ERROR_CODE_PENDING_AGREEMENT_EXISTED = 'MSG0147',
  ERROR_CODE_PENDING_AGREEMENT_EXISTED_MESS = 'Pending Agreement existed',

  ERROR_CODE_PRODUCT_CATEGORY_IS_NOT_EXISTING = 'MSG0148',
  ERROR_CODE_PRODUCT_CATEGORY_IS_NOT_EXISTING_MESS = 'Product category is not existing',

  ERROR_CODE_ATTRIBUTE_VALUE_IS_NOT_EXISTING = 'MSG0149',
  ERROR_CODE_ATTRIBUTE_VALUE_IS_NOT_EXISTING_MESS = 'Attribute Value is not existing.',

  ERROR_CODE_PRODUCT_CATEGORY_NAME_IS_EXISTING = 'MSG0218',
  ERROR_CODE_PRODUCT_CATEGORY_NAME_IS_EXISTING_MESS = 'Product category name is existing',

  ERROR_CODE_SUB_CATEGORY_NAME_IS_DUPLICATED = 'MSG0219',
  ERROR_CODE_SUB_CATEGORY_NAME_IS_DUPLICATED_MESS = 'Sub category name is duplicated',

  ERROR_CODE_PRODUCT_CATEGORY_SHORT_NAME_IS_EXISTING = 'MSG0220',
  ERROR_CODE_PRODUCT_CATEGORY_SHORT_NAME_IS_EXISTING_MESS = 'Product category short name is existing',

  CONTENT_CANNOT_ADD = 'MSG0243',
  CONTENT_CANNOT_ADD_MESS = 'Content cannot add',

  ERROR_CODE_BAD_WORD_IS_EXISTING = 'MSG0248',
  ERROR_CODE_BAD_WORD_IS_EXISTING_MESS = 'Bad word is existing',
}
