import { Component, Input } from '@angular/core';
import { eProgramGiftTypes } from '@shared/enums';

@Component({
  selector: 'app-program-gift-type-label',
  templateUrl: './program-gift-type-label.component.html',
  styleUrl: './program-gift-type-label.component.scss',
})
export class ProgramGiftTypeLabelComponent {
  @Input() status?: eProgramGiftTypes;
  protected readonly eProgramGiftTypes = eProgramGiftTypes;
}
