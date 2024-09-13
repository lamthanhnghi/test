import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { NzSelectComponent } from 'ng-zorro-antd/select';

@Directive({ selector: '[appReadonlySelect]' })
export class ReadonlySelectDirective implements AfterViewInit {
  _readonly = false;
  @Input() set appReadonlySelect(value: boolean) {
    this._readonly = value;
    this.updateState();
  }
  constructor(
    private element: ElementRef<NzSelectComponent>,
    private renderer: Renderer2,
  ) {}

  ngAfterViewInit(): void {
    this.updateState();
  }

  updateState(): void {
    // select nz-select element
    const selectElement = this.element.nativeElement;
    // set readonly attribute
    if (this._readonly) {
      this.renderer.addClass(selectElement, 'pointer-events-none');
      this.renderer.setAttribute(selectElement, 'aria-readonly', 'true');
      // select nz-select-arrow
      const selectArrow = (selectElement as unknown as HTMLElement).querySelector('.ant-select-arrow');
      // set display none
      if (selectArrow) {
        this.renderer.setStyle(selectArrow, 'display', 'none');
      }
    } else {
      this.renderer.removeClass(selectElement, 'pointer-events-none');
      this.renderer.removeAttribute(selectElement, 'aria-readonly');
      // select nz-select-arrow
      const selectArrow = (selectElement as unknown as HTMLElement).querySelector('.ant-select-arrow');
      // set display block
      if (selectArrow) {
        this.renderer.setStyle(selectArrow, 'display', 'block');
      }
    }
  }
}
