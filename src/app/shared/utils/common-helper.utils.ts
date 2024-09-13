import { FormGroup } from '@angular/forms';
import { IMcMenuItem, IMedia, IToastState, McUploadFile } from '@shared/models';
import { HEADER_MESSAGE_KEY, MenuItemWithCounter } from '@shared/constants';
import { NavigationEnd, Scroll } from '@angular/router';
import { distinctUntilKeyChanged, filter, map, Observable, pipe, tap, UnaryFunction } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { eContentStatuses } from '@shared/enums';
import { IApprovalItem } from '@shared/requesting-product.model';

export class CommonHelpers {
  public static getFileNameEllipsis(fileName: string, maxLength = 30): string {
    const middle = Math.floor(maxLength / 2);
    const extension = fileName.split('.').pop();
    const name = fileName.split('.').slice(0, -1).join('.');
    if (name.length > maxLength) {
      return name.substr(0, middle) + '...' + name.substr(name.length - middle, name.length) + '.' + extension;
    }
    return fileName;
  }

  public static toEnglishFileName(fileName: string): string {
    return fileName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  }

  public static cloneObject<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  public static humanFileSize(bytes: number, si = false, dp = 1): string {
    const thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }
    const units = si
      ? ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
      : ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let u = -1;
    do {
      bytes /= thresh;
      ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(dp) + ' ' + units[u];
  }

  public static generateHeaderMsgKey(params: Partial<IToastState>): Record<string, string> {
    const response: Record<string, string> = {};
    if (params.title) {
      response[HEADER_MESSAGE_KEY.TITLE] = params.title;
    }
    if (params.message) {
      response[HEADER_MESSAGE_KEY.MESSAGE] = params.message;
    }

    if (response[HEADER_MESSAGE_KEY.TITLE] || response[HEADER_MESSAGE_KEY.MESSAGE]) {
      return response;
    }

    if (params.action) {
      response[HEADER_MESSAGE_KEY.ACTION] = params.action;
    }

    if (params.object) {
      response[HEADER_MESSAGE_KEY.OBJECT] = params.object;
    }

    return response;
  }

  public static boolToNumber(value: boolean): number {
    return value ? 1 : 0;
  }

  public static dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    const ab = new ArrayBuffer(byteString.length);
    const dw = new DataView(ab);
    for (let i = 0; i < byteString.length; i++) {
      dw.setUint8(i, byteString.charCodeAt(i));
    }
    return new Blob([ab], { type: mimeString });
  }

  public static dataURItoFile(dataURI: string, fileName: string): File {
    const imageBlob = this.dataURItoBlob(dataURI);
    return new File([imageBlob], fileName, { type: 'image/jpeg' });
  }

  public static isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
  }

  public static markFormDirty(form: FormGroup): void {
    Object.values(form.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  public static markFormTouched(form: FormGroup): void {
    Object.values(form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  public static uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // eslint-disable-next-line no-bitwise
      const r = (Math.random() * 16) | 0;
      // eslint-disable-next-line no-bitwise
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  public static isImageUrl(url: string): boolean {
    const urlWithoutParameters = url?.split('?')[0];
    return urlWithoutParameters?.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
  }

  public static mediaToMcUploadFile(media: IMedia): McUploadFile {
    return {
      uid: media.mediaID,
      name: media.title || '',
      filename: media.title || '',
      url: media.linkString || '',
      mediaID: media.mediaID,
      status: 'done',
      preview: media.linkString || '',
      thumbUrl: media.linkString || '',
      type: CommonHelpers.isImageUrl(media.linkString) ? 'image' : 'file',
    };
  }

  public static getUserLoginTypes(userLogin: string): 'email' | 'phone' {
    if (userLogin.includes('@')) {
      return 'email';
    }
    return 'phone';
  }

  createQueryParams(params: Record<string, string | number | boolean | null | undefined>): string {
    const queryParams = Object.keys(params)
      .filter((key) => params[key] !== null && params[key] !== undefined)
      .map((key) => `${key}=${params[key]}`)
      .join('&');
    return `?${queryParams}`;
  }

  public static getErrorCode(error: any): string {
    return error?.error?.errorCode || error?.errorCode || '';
  }

  public static isNavigationEndObs(event: any): Observable<NavigationEnd> {
    return pipe(
      filter((e: any) => e instanceof NavigationEnd || (e instanceof Scroll && e.routerEvent instanceof NavigationEnd)),
      map((e: any) => (e instanceof NavigationEnd ? e : e.routerEvent)),
      distinctUntilKeyChanged('urlAfterRedirects'),
    )(event);
  }

  public static toNonAccentVietnamese(str: string) {
    str = str.replace(/[AÁÀÃẠÂẤẦẪẬĂẮẰẴẶ]/g, 'A');
    str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a');
    str = str.replace(/[EÉÈẼẸÊẾỀỄỆ]/, 'E');
    str = str.replace(/[èéẹẻẽêềếệểễ]/g, 'e');
    str = str.replace(/[IÍÌĨỊ]/g, 'I');
    str = str.replace(/[ìíịỉĩ]/g, 'i');
    str = str.replace(/[OÓÒÕỌÔỐỒỖỘƠỚỜỠỢ]/g, 'O');
    str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o');
    str = str.replace(/[UÚÙŨỤƯỨỪỮỰ]/g, 'U');
    str = str.replace(/[ùúụủũưừứựửữ]/g, 'u');
    str = str.replace(/[YÝỲỸỴ]/g, 'Y');
    str = str.replace(/[ỳýỵỷỹ]/g, 'y');
    str = str.replace(/Đ/g, 'D');
    str = str.replace(/đ/g, 'd');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/[\u0300\u0301\u0303\u0309\u0323]/g, ''); // Huyền sắc hỏi ngã nặng
    // eslint-disable-next-line no-misleading-character-class
    str = str.replace(/[\u02C6\u0306\u031B]/g, ''); // Â, Ê, Ă, Ơ, Ư
    return str;
  }

  public static handleSuccessApi<T>(
    service: NzNotificationService,
    title: string,
    msg: string,
  ): UnaryFunction<Observable<T>, Observable<T>> {
    return pipe(
      tap(() => {
        service.success(title, msg);
      }),
    );
  }

  public static getEnumKeyByEnumValue(myEnum: any, enumValue: number | string): string {
    const keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue);
    return keys.length > 0 ? keys[0] : '';
  }

  public static fillCountByStatus(lst: MenuItemWithCounter[], data: IApprovalItem[], firstParentId?: string): MenuItemWithCounter[] {
    return lst.map((parent) => {
      if (parent.id !== firstParentId) return parent;
      parent.children = (parent.children as (IMcMenuItem & {
        count: number;
        onClick?: () => void;
      })[])!.map((item) => {
        switch (item.id) {
          case eContentStatuses.All: {
            item.count = data.reduce((previousValue, currentValue) => {
              return previousValue + currentValue.count;
            }, 0);
            return item;
          }
          case eContentStatuses.Draft: {
            item.count = data.find((item) => item.status === eContentStatuses.Draft)?.count || 0;
            return item;
          }
          case eContentStatuses.AdminApproved: {
            item.count =
              data.find((item) => item.status === eContentStatuses.AdminApproved)?.count || 0;
            return item;
          }
          case eContentStatuses.AdminPending: {
            item.count =
              data.find((item) => item.status === eContentStatuses.AdminPending)?.count || 0;
            return item;
          }
          case eContentStatuses.AdminReviewing: {
            item.count =
              data.find((item) => item.status === eContentStatuses.AdminReviewing)?.count || 0;
            return item;
          }
          case eContentStatuses.AdminRejected: {
            item.count =
              data.find((item) => item.status === eContentStatuses.AdminRejected)?.count || 0;
            return item;
          }
          case eContentStatuses.AdminArchived: {
            item.count =
              data.find((item) => item.status === eContentStatuses.AdminArchived)?.count || 0;
            return item;
          }
          default: {
            return item;
          }
        }
      });
      return parent;
    });
  }
}
