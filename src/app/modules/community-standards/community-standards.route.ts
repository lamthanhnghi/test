import { Routes } from '@angular/router';
import { communityStandardsDetailResolver } from '@modules/community-standards/resolvers/community-standards-detail.resolver';
import { communityStandardsGuard } from '@modules/community-standards/guards/community-standards.guard';
import { RouteUtils } from '@shared/utils';
import { BadWordsService } from '@shared/bad-words.service';

export const COMMUNITY_STANDARDS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/community-standards-list/community-standards-list.component').then(
        (m) => m.CommunityStandardsListComponent,
      ),
    data: { title: 'menu.community_standards.base' },
    canActivate: [communityStandardsGuard],
    runGuardsAndResolvers: 'pathParamsOrQueryParamsChange',
  },
  {
    path: `${RouteUtils.CommunityStandards.Create}`,
    loadComponent: () =>
      import('./pages/community-standards-detail/community-standards-detail.component').then(
        (m) => m.CommunityStandardsDetailComponent,
      ),
  },
  {
    path: `${RouteUtils.CommunityStandards.Detail}`,
    loadComponent: () =>
      import('./pages/community-standards-detail/community-standards-detail.component').then(
        (m) => m.CommunityStandardsDetailComponent,
      ),
    providers: [BadWordsService],
    resolve: {
      dataResolved: communityStandardsDetailResolver,
    },
  },
];
