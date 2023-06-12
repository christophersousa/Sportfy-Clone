import { Routes } from "@angular/router";
import { authGuard } from "./guards/auth.guard";

export const Router : Routes = [
  {
    path: '',
    redirectTo: 'player',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginModule),
  },
  {
    path: 'player',
    loadChildren: () => import('./pages/player/player.module').then( m => m.PlayerModule),
    canMatch: [authGuard]
  }
]
