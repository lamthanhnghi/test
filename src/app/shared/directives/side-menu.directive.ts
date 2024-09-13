import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[mcSideMenu]',
})
export class SideMenuDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
