import { Component, Input } from '@angular/core';
import { eRoles } from '@shared/enums';

@Component({
  selector: 'app-role-label',
  templateUrl: './role-label.component.html',
  styleUrl: './role-label.component.scss',
})
export class RoleLabelComponent {
  @Input() type?: eRoles;
  protected readonly eRoles = eRoles;
}
