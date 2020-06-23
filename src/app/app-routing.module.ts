import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ResolverService } from './resolver/resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  },
  { path: 'folder/:id', loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule) },
  { path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  { path: 'home/:user_id', resolve: { user: ResolverService }, loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  { path: 'register', loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterPageModule) },
  { path: 'app', loadChildren: () => import('./pages/app/app.module').then(m => m.AppPageModule) },
  { path: 'newproject', loadChildren: () => import('./pages/newproject/newproject.module').then(m => m.NewprojectPageModule) },
  { path: 'projectdetail',loadChildren: () => import('./pages/projectdetail/projectdetail.module').then(m => m.ProjectdetailPageModule) },
  { 
    path: 'projectdetail/:dev_id',
    resolve:
      { device: ResolverService },
    loadChildren: () => import('./pages/projectdetail/projectdetail.module').then(m => m.ProjectdetailPageModule)
  },
  { path: 'createapp', loadChildren: () => import('./pages/createapp/createapp.module').then(m => m.CreateappPageModule) },
  { path: 'myapp', loadChildren: () => import('./pages/myapp/myapp.module').then(m => m.MyappPageModule) },
  {
    path: 'myappdetails/:app_id',
    resolve:
      { app: ResolverService },
    loadChildren: () => import('./pages/myappdetails/myappdetails.module').then(m => m.MyappdetailsPageModule)
  },
  {
    path: 'widget',
    loadChildren: () => import('./pages/widget/widget.module').then( m => m.WidgetPageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [ResolverService]
})
export class AppRoutingModule { }
