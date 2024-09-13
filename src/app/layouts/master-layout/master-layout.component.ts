import { AfterViewInit, Component, Inject, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { eLayouts } from '@shared/enums';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.scss'],
})
export class MasterLayoutComponent implements AfterViewInit {
  isShowMenu = true;
  layout: eLayouts = eLayouts.Scroll;
  layout$: BehaviorSubject<eLayouts> = new BehaviorSubject<eLayouts>(eLayouts.Scroll);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
  ) {
    // subscribe to router events
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const lastChildRoute = this.getLastChildRoute(this.route);
        this.layout = (this.route.children?.[0]?.snapshot.data?.['layout'] as eLayouts) || eLayouts.Scroll;
        this.isShowMenu = !!lastChildRoute.snapshot.data?.['isShowMenu'];
        this.layout$.next(this.layout);
      }
    });
  }

  ngAfterViewInit() {
    this.layout$.subscribe((layout) => {
      if (this.document) {
        if (layout === eLayouts.Fixed) {
          this.renderer.setStyle(this.document.documentElement, 'overflow', 'hidden');
        } else {
          this.renderer.setStyle(this.document.documentElement, 'overflow', 'auto');
        }
      }
    });
  }

  getLastChildRoute(route: ActivatedRoute): ActivatedRoute {
    if (route.firstChild) {
      return this.getLastChildRoute(route.firstChild);
    }
    return route;
  }

  protected readonly eLayouts = eLayouts;
}
