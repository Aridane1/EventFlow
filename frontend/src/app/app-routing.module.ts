import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    data: { allowedRoles: ['admin'] },
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'add-events',
    canActivate: [AuthGuard],
    data: { allowedRoles: ['admin'] },
    loadChildren: () =>
      import('./pages/add-events/add-events.module').then(
        (m) => m.AddEventsPageModule
      ),
  },

  {
    path: 'admin-page',
    canActivate: [AuthGuard],
    data: { allowedRoles: ['manager'] },
    loadChildren: () =>
      import('./pages/admin-page/admin-page.module').then(
        (m) => m.AdminPagePageModule
      ),
  },
  {
    path: 'location',
    canActivate: [AuthGuard],
    data: { allowedRoles: ['manager'] },
    loadChildren: () =>
      import('./pages/location/location.module').then(
        (m) => m.LocationPageModule
      ),
  },
  {
    path: 'modify-event',
    canActivate: [AuthGuard],
    data: { allowedRoles: ['admin'] },
    loadChildren: () =>
      import('./pages/modify-event/modify-event.module').then(
        (m) => m.ModifyEventPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'start',
    loadChildren: () =>
      import('./pages/start/start.module').then((m) => m.StartPageModule),
  },
  {
    path: 'events',
    canActivate: [AuthGuard],
    data: { allowedRoles: ['customer', 'admin'] },
    loadChildren: () =>
      import('./pages/events/events.module').then((m) => m.EventsPageModule),
  },
  {
    path: 'account',
    canActivate: [AuthGuard],
    data: { allowedRoles: ['customer', 'admin'] },
    loadChildren: () =>
      import('./pages/account/account.module').then((m) => m.AccountPageModule),
  },
  {
    path: 'search',
    canActivate: [AuthGuard],
    data: { allowedRoles: ['customer', 'admin'] },
    loadChildren: () =>
      import('./pages/search/search.module').then((m) => m.SearchPageModule),
  },
  {
    path: 'add-administrator',
    canActivate: [AuthGuard],
    data: { allowedRoles: ['manager'] },
    loadChildren: () =>
      import('./pages/add-administrator/add-administrator.module').then(
        (m) => m.AddAdministratorPageModule
      ),
  },
  {
    path: 'see-administrator',
    canActivate: [AuthGuard],
    data: { allowedRoles: ['manager'] },
    loadChildren: () =>
      import('./pages/see-users/see-administrator.module').then(
        (m) => m.SeeAdministratorPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
