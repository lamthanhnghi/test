import { Pipe, PipeTransform } from '@angular/core';
import {
  eAddressLabels,
  eAgreementTypes,
  eBusinessTypes,
  eDebtCyclePeriods, eDeliveryMethods, eDiscountTypes,
  eEmailLabels, eFeedbackTopic, eMessageReportReason,
  ePhoneLabels,
  ePidTypes,
  eProductTypes, eProgramGiftBase, eProgramGiftTypes, eProgramTypes, eRatingReportReason, eReportUserType,
  eRoles, eShopReportReason,
  eSizeUnits, eTimeStatuses, eUserTypes,
  eVolumeUnits,
  eWeekDays,
  eWeightUnits
} from '@shared/enums';
import { CommonHelpers } from '@shared/utils';

type EnumName =
  | 'pid_types'
  | 'business_types'
  | 'product_types'
  | 'weight_units'
  | 'volume_units'
  | 'size_units'
  | 'agreement_types'
  | 'debt_cycle_periods'
  | 'week_days'
  | 'phone_labels'
  | 'email_labels'
  | 'address_labels'
  | 'roles'
  | "report_user_type"
  | 'rating_report_reason'
  | 'message_report_reason'
  | 'shop_report_reason'
  | 'user_types'
  | 'feedback_topic'
  | 'delivery_methods'
  | 'program_types'
  | 'discount_types'
  | 'program_gift_types'
  | 'program_gift_base'
  | 'time_statuses'

@Pipe({
  name: 'enumKey',
})
export class TranslateEnumsPipe implements PipeTransform {
  transform(value: any, enumName: EnumName): any {
    if (CommonHelpers.isNullOrUndefined(value)) return '';

    switch (enumName) {
      case 'roles':
        return `enums.${enumName}.${this.getEnumKeys(eRoles, value)}`;
      case 'pid_types':
        return `enums.${enumName}.${this.getEnumKeys(ePidTypes, value)}`;
      case 'business_types':
        return `enums.${enumName}.${this.getEnumKeys(eBusinessTypes, value)}`;
      case 'product_types':
        return `enums.${enumName}.${this.getEnumKeys(eProductTypes, value)}`;
      case 'weight_units':
        return `enums.${enumName}.${this.getEnumKeys(eWeightUnits, value)}`;
      case 'volume_units':
        return `enums.${enumName}.${this.getEnumKeys(eVolumeUnits, value)}`;
      case 'size_units':
        return `enums.${enumName}.${this.getEnumKeys(eSizeUnits, value)}`;
      case 'agreement_types':
        return `enums.${enumName}.${this.getEnumKeys(eAgreementTypes, value)}`;
      case 'debt_cycle_periods':
        return `enums.${enumName}.${this.getEnumKeys(eDebtCyclePeriods, value)}`;
      case 'week_days':
        return `enums.${enumName}.${this.getEnumKeys(eWeekDays, value)}`;
      case 'phone_labels':
        return `enums.${enumName}.${this.getEnumKeys(ePhoneLabels, value)}`;
      case 'email_labels':
        return `enums.${enumName}.${this.getEnumKeys(eEmailLabels, value)}`;
      case 'address_labels':
        return `enums.${enumName}.${this.getEnumKeys(eAddressLabels, value)}`;
      case 'rating_report_reason':
        return `enums.${enumName}.${this.getEnumKeys(eRatingReportReason, value)}`;
      case 'message_report_reason':
        return `enums.${enumName}.${this.getEnumKeys(eMessageReportReason, value)}`;
      case 'shop_report_reason':
        return `enums.${enumName}.${this.getEnumKeys(eShopReportReason, value)}`;
      case 'report_user_type':
        return `enums.${enumName}.${this.getEnumKeys(eReportUserType, value)}`;
      case 'user_types':
        return `enums.${enumName}.${this.getEnumKeys(eUserTypes, value)}`;
      case 'feedback_topic':
        return `enums.${enumName}.${this.getEnumKeys(eFeedbackTopic, value)}`;
      case 'delivery_methods':
        return `enums.${enumName}.${this.getEnumKeys(eDeliveryMethods, value)}`;
      case 'program_types':
        return `enums.${enumName}.${this.getEnumKeys(eProgramTypes, value)}`;
      case 'discount_types':
        return `enums.${enumName}.${this.getEnumKeys(eDiscountTypes, value)}`;
      case 'program_gift_types':
        return `enums.${enumName}.${this.getEnumKeys(eProgramGiftTypes, value)}`;
      case 'program_gift_base':
        return `enums.${enumName}.${this.getEnumKeys(eProgramGiftBase, value)}`;
      case 'time_statuses':
        return `enums.${enumName}.${this.getEnumKeys(eTimeStatuses, value)}`;
      default:
        return `enums.${enumName}.${value}`;
    }
  }

  getEnumKeys = (e: object, value: any) => {
    return this.toUnderscore(Object.keys(e)[Object.values(e).indexOf(value)]);
  };

  toUnderscore = (str: string) => {
    return str
      .replace(/([A-Z])/g, '_$1')
      .toLowerCase()
      .slice(1);
  };
}
