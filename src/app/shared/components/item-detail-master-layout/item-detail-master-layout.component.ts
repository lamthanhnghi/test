import { Component, Input } from '@angular/core';
import { IMcBreadcrumb } from '@shared/models';

@Component({
  selector: 'app-item-detail-master-layout',
  templateUrl: './item-detail-master-layout.component.html',
  styleUrl: './item-detail-master-layout.component.scss',
})
export class ItemDetailMasterLayoutComponent {
  @Input() crumbs: IMcBreadcrumb[] = [];
  @Input() shouldBeInSection = true;
}
