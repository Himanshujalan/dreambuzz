import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate
 } from '@angular/fire/auth-guard'


 const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
 const redirectLoggedInToHome = () => redirectLoggedInTo(['dashboard']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => 
    import('./home/home.module').then( m => m.HomePageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'profile',
    loadChildren: () => 
    import('./component/profile/profile.module').then( m => m.ProfilePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'dashboard',
    loadChildren: () => 
    import('./component/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'users',
    loadChildren: () => import('./component/users/users.module').then( m => m.UsersPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'signup',
    loadChildren: () => import('./component/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./component/forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'dream-journal',
    loadChildren: () => import('./component/dream-journal/dream-journal.module').then( m => m.DreamJournalPageModule),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
