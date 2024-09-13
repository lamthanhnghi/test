import { Component } from '@angular/core';
import { RouteUtils } from '@shared/utils';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  protected readonly RouteUtils = RouteUtils;
}
