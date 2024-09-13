import { Component, Input } from '@angular/core';
import { eProgramType } from '@shared/enums';

@Component({
  selector: 'app-program-type-label',
  templateUrl: './program-type-label.component.html',
  styleUrl: './program-type-label.component.scss',
})
export class ProgramTypeLabelComponent {
  @Input() status?: eProgramType;
  protected readonly eProgramType = eProgramType;
}
