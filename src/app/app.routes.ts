import { Routes } from '@angular/router';
import { AuthGuardService } from './services/auth/auth-service/auth-guard.service';
import * as Components from './components';

export const routes: Routes = [
    { path: "", redirectTo: "/connexion", pathMatch: "full" },
    { path: "connexion", title: "connexion", component: Components.ConnexionComponent },
    { path: "accueil", title: "accueil", component: Components.AccueilComponent, canActivate: [AuthGuardService] },
];
