import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class FormValidators {
  public static MustMatch(controlName: string, matchingControlName: string, errorName = 'mustMatch'): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (matchingControl?.errors && !matchingControl?.errors[errorName]) {
        const errors = { ...formGroup.errors };
        delete errors[errorName];
        return { ...errors };
      }
      if (control?.value !== matchingControl?.value) {
        matchingControl?.setErrors({ [errorName]: true });
        return { ...formGroup.errors, [errorName]: true };
      } else {
        matchingControl?.setErrors(null);
        const errors = { ...formGroup.errors };
        delete errors[errorName];
        return { ...errors };
      }
    };
  }

  // Validate email or phone number
  public static MustBeEmailOrPhoneNumber(errorName = 'phoneOrMailPattern'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailRegex = new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
      const phoneRegex = new RegExp('^[0-9]{10}$');
      const value = control.value;
      if (value) {
        if (emailRegex.test(value) || phoneRegex.test(value)) {
          return null;
        } else {
          return { [errorName]: true };
        }
      }
      return null;
    };
  }

  // validate password:
  // 1. at least 8 characters
  // 2. at least 1 uppercase letter
  // 3. at least 1 lowercase letter
  // 4. at least 1 number

  public static MustBeValidPassword(errorName = 'passwordPattern'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');
      const value = control.value;
      if (value) {
        if (passwordRegex.test(value)) {
          return null;
        } else {
          return { [errorName]: true };
        }
      }
      return null;
    };
  }

  // Validate email or phone number
  public static MustBeEmail(errorName = 'mailPattern'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailRegex = new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
      const value = control.value;
      if (value) {
        if (emailRegex.test(value)) {
          return null;
        } else {
          return { [errorName]: true };
        }
      }
      return null;
    };
  }
  //Validate Url pattern
  public static MustUrl(errorName = 'urlPattern'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const urlRegex = new RegExp(/^(http:\/\/|https:\/\/).+/);
      const value = control.value;
      if (value) {
        if (urlRegex.test(value)) {
          return null;
        } else {
          return { [errorName]: true };
        }
      }
      return null;
    };
  }

  //Validate Url DUNs pattern
  public static MustDuns(errorName = 'dunsPattern'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const urlRegex = new RegExp(/^[0-9]{9}$/);
      const value = control.value;
      if (value) {
        if (urlRegex.test(value)) {
          return null;
        } else {
          return { [errorName]: true };
        }
      }
      return null;
    };
  }

  public static MustBePhone(errorName = 'phonePattern'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phoneRegex = new RegExp('^[0-9]{10}$');
      const value = control.value;
      if (value) {
        if (phoneRegex.test(value)) {
          return null;
        } else {
          return { [errorName]: true };
        }
      }
      return null;
    };
  }

  public static MustBePhoneInternational(errorName = 'phonePatternInternational'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phoneRegex = new RegExp(/^[0-9\(\)\-\+\s]{10,18}$/);
      const value = control.value;
      if (value) {
        if (phoneRegex.test(value)) {
          return null;
        } else {
          return { [errorName]: true };
        }
      }
      return null;
    };
  }

  public static MustBePostalCode(errorName = 'postalCodePattern'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const postalCodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;
      const value = control.value;
      if (value) {
        if (postalCodeRegex.test(value)) {
          return null;
        } else {
          return { [errorName]: true };
        }
      }
      return null;
    };
  }

  public static RequiredArray(errorName = 'requiredArray'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value && Array.isArray(value) && value.length > 0) {
        return null;
      }
      return { [errorName]: true };
    };
  }
}
