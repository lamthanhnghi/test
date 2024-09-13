import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-read-only-form-row',
  templateUrl: './read-only-form-row.component.html',
  styleUrl: './read-only-form-row.component.scss',
})
export class ReadOnlyFormRowComponent {
  @Input() text: string = '';
  @Input() value?: string | number | null = '';
  @Input() hasContent = false;
}
