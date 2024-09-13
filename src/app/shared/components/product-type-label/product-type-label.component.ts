import { Component, Input } from '@angular/core';
import { eProductTypes } from '@shared/enums';

@Component({
  selector: 'app-product-type-label',
  templateUrl: './product-type-label.component.html',
  styleUrl: './product-type-label.component.scss',
})
export class ProductTypeLabelComponent {
  @Input() type?: eProductTypes;
  protected readonly eProductTypes = eProductTypes;
}
