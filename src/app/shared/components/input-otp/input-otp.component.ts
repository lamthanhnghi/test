import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { Subject, timer } from 'rxjs';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-input-otp',
  templateUrl: './input-otp.component.html',
  styleUrls: ['./input-otp.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputOtpComponent),
      multi: true,
    },
  ],
})
export class InputOtpComponent implements AfterViewInit, OnInit, ControlValueAccessor {
  _otp = '';
  @Input() triggerSubject!: Subject<void>;
  @Input() disabled = false;
  @Input() autoFocusSubmit = true;
  @Input() acceptedChars = /^[0-9a-zA-Z]$/;
  @Input() length = 4;
  @Input() countdownFrom = 5;
  @Output() resend: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() isTimeout: EventEmitter<boolean> = new EventEmitter<boolean>();
  readonly _specialKeys: string[] = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Enter'];
  @ViewChildren('otpInput') inputRefs = new QueryList<ElementRef>();
  @ViewChild('countdownComponent', { static: false }) countdownComponent!: CountdownComponent;
  inputArray: HTMLInputElement[] = [];
  countdownConfig!: CountdownConfig;
  timeLeft = 30;

  get countdownUnit(): string {
    return this.countdownFrom > 60 ? 'common.minute(s)' : 'common.second(s)';
  }

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.countdownConfig = {
      leftTime: this.countdownFrom,
      demand: true,
      format: `${this.countdownFrom > 60 ? 'mm:' : ''}ss`,
    };
    this.triggerSubject.pipe().subscribe(() => {
      this.countdownConfig.leftTime = this.countdownFrom;
      this.timeLeft = this.countdownFrom;
      this.cd.detectChanges();
      this.countdownComponent?.begin();
      // reset input
      this.inputArray.forEach((item) => {
        item.value = '';
      });
      this.inputArray[0].focus();
      this.writeValue('');
    });
  }

  ngAfterViewInit(): void {
    this.countdownComponent?.begin();
    this.inputArray = this.inputRefs.toArray().map((item) => item.nativeElement);
    this.inputArray[0].focus();
    const form = this.inputArray[0].closest('form');
    let submitButton: HTMLButtonElement | null = null;
    if (form && this.autoFocusSubmit) {
      submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    }
    this.inputArray.forEach((item, index) => {
      item.addEventListener('keydown', (event: KeyboardEvent) => {
        const focusNext = (curIndex: number) => {
          if (curIndex < this.inputArray.length - 1) {
            timer(10).subscribe(() => {
              this.inputArray[curIndex + 1].focus();
            });
          } else {
            focusSubmit(curIndex);
          }
        };

        const focusPrev = (curIndex: number) => {
          if (curIndex > 0) {
            timer(10).subscribe(() => {
              this.inputArray[curIndex - 1].focus();
            });
          }
        };

        const focusSubmit = (curIndex: number) => {
          if (curIndex === this.inputArray.length - 1) {
            timer(10).subscribe(() => {
              this.inputArray[curIndex].blur();
              if (submitButton) {
                submitButton.focus();
              }
            });
          }
        };

        // accepted keys: 0-9 a-z A-Z, backspace, delete, tab, arrow keys
        // max length: 1
        // prevent default if not accepted

        // handle paste from clipboard
        if ((event.ctrlKey || event.metaKey) && (event.key === 'V' || event.key === 'v')) {
          event.preventDefault();
          navigator.clipboard
            .readText()
            .then((clipText) => {
              const pastedTextArr =
                clipText.length >= this.length ? clipText.substring(0, this.length).split('') : clipText.split('');
              if (pastedTextArr.some((char) => !RegExp(this.acceptedChars).test(char))) {
                return;
              }
              pastedTextArr.forEach((char, i) => {
                this.inputArray[i].value = char;
                this.inputArray[i]?.blur();
              });
              this.writeValue(this.otp);
              if (pastedTextArr.length < this.length) {
                this.inputArray[pastedTextArr.length - 1].focus();
              } else {
                if (submitButton) {
                  timer(10).subscribe(() => {
                    submitButton?.focus();
                  });
                } else {
                  this.inputArray[this.length - 1].focus();
                }
              }
            })
            .catch((err) => {
              console.warn(err);
            });
          return;
        }

        if (!/^[0-9a-zA-Z]$/.test(event.key) && !this._specialKeys.includes(event.key)) {
          event.preventDefault();
        } else {
          event.preventDefault();
          if (event.key === 'Backspace') {
            item.value = '';
            this.writeValue(this.otp);
            focusPrev(index);
          } else if (event.key === 'Delete') {
            item.value = '';
            this.writeValue(this.otp);
            focusNext(index);
          } else if (event.key === 'ArrowLeft') {
            focusPrev(index);
          } else if (event.key === 'ArrowRight' || event.key === 'Tab') {
            focusNext(index);
            // } else if (event.key === 'Enter') {
            // clickSubmit(index);
          } else {
            item.value = event.key;
            this.writeValue(this.otp);
            focusNext(index);
          }
        }
      });
    });
  }

  get otp(): string {
    return (
      this.inputRefs
        ?.toArray()
        ?.map((item) => item?.nativeElement?.value)
        .join('') || ''
    );
  }

  onChange(value: string) {}

  onTouched() {}

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: string): void {
    this._otp = value;
    this.onChange(this._otp);
  }

  onResend(): void {
    this.resend.emit(true);
    this.cd.detectChanges();
  }

  onCountdown(event: CountdownEvent): void {
    this.timeLeft = event.left / 1000;
    if (this.timeLeft === 0) {
      this.isTimeout.emit(true);
    } else {
      this.isTimeout.emit(false);
    }
  }

  // validate time left, if time left is 0, return error to this formControl
}
