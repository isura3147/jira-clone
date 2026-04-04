import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { BoardComponent } from './pages/board/board';
import { SettingsComponent } from './pages/settings/settings';
import { LayoutComponent } from './shared/layout/layout';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: '', 
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'board', component: BoardComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '', redirectTo: 'board', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];
