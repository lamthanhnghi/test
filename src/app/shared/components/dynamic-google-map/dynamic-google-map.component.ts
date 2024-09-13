import { Component, ElementRef, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { timer } from 'rxjs';

@Component({
  selector: 'app-dynamic-google-map',
  templateUrl: './dynamic-google-map.component.html',
  styleUrl: './dynamic-google-map.component.scss',
})
export class DynamicGoogleMapComponent {
  @Input() set iframe(value: string) {
    if (value) {
      this.sanitizedIframe = this.sanitizer.bypassSecurityTrustHtml(value);
      timer(10).subscribe(() => {
        (this.elementRef?.nativeElement as HTMLElement)?.querySelector('iframe')?.classList?.add('max-w-full');
      });
    }
  }

  sanitizedIframe?: SafeHtml;

  constructor(
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef,
  ) {}
}
