import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { timer } from 'rxjs';

@Directive({
  selector: 'input[mcAutocompleteOff]',
})
export class AutocompleteOffDirective implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    timer(1).subscribe(() => {
      this.elementRef.nativeElement.setAttribute('autocomplete', 'cc-off');
    });
  }
}
