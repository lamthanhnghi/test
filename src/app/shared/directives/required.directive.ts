import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[mcRequired]',
})
export class RequiredDirective implements AfterViewInit {
  readonly _requiredSymbol = '*';
  _isShow = true;
  _position: 'before' | 'after' = 'before';

  @Input() set position(value: 'before' | 'after') {
    this._position = value;
      this.updateRequiredSymbol();
  }

  @Input() set placeholder(value: string) {
    if (value) {
      this.changePlaceholder(value);
    }
  }

  @Input() set isShow(value: boolean) {
    this._isShow = value;
    this.updateRequiredSymbol();
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngAfterViewInit() {
    this.updateRequiredSymbol();
  }

  updateRequiredSymbol(): void {
    const nativeElement = this.elementRef.nativeElement;
    if (nativeElement && nativeElement.tagName.toLowerCase() === 'nz-form-label'.toLowerCase()) {
      // render required symbol after label
      const labelElement = (nativeElement as HTMLElement).querySelector('label');
      const span = (labelElement as HTMLElement).querySelector('.required-symbol');
      if (labelElement && !span) {
        if (this._isShow) {
          const span = this.renderer.createElement('span');
          span.innerText = this._requiredSymbol;
          this.renderer.addClass(span, 'required-symbol');
          this.renderer.addClass(span, 'ml-1');
          this.renderer.addClass(span, 'text-red');

          this.renderer.appendChild(labelElement, span);

        } else {
          const span = (labelElement as HTMLElement).querySelector('.required-symbol');
          if (span) {
            this.renderer.removeChild(labelElement, span);
          }
        }
      }
    }
  }

  changePlaceholder(value: string): void {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'placeholder', `${value} ${this._requiredSymbol}`);
  }
}
