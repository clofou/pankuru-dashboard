import { Routes } from '@angular/router';
import { AuthGuardService } from './services/auth/auth-service/auth-guard.service';
import * as Components from './Pages';

export const routes: Routes = [
    { path: "", redirectTo: "/connexion", pathMatch: "full" },
    { path: "connexion", title: "connexion", component: Components.ConnexionComponent },
    { path: "pankuru", title: "template",
        component: Components.TemplateComponent,
        children:[
            { path: "", redirectTo: "/pankuru/acceuil", pathMatch: "full"},
            { path: "acceuil", title: "acceuil", component: Components.AccueilComponent, canActivate: [AuthGuardService] },
            { path: "superadmin", title: "superadmin", component: Components.SuperAdminComponent, canActivate: [AuthGuardService] },
            { path: "compagnie", title: "compagnie", component: Components.CompagnieComponent, canActivate: [AuthGuardService] },
            { path: "faq", title: "faq", component: Components.FaqComponent, canActivate: [AuthGuardService] },
            { path: "parametre", title: "parametre", component: Components.ParametreComponent, canActivate: [AuthGuardService] },
            { path: "personnel", title: "personnel", component: Components.PersonnelComponent, canActivate: [AuthGuardService] },
            { path: "vol", title: "vol", component: Components.VolComponent, canActivate: [AuthGuardService] },
            { path: "aeroport", title: "aeroport", component: Components.AeroportComponent, canActivate: [AuthGuardService] },
            { path: "avion", title: "avion", component: Components.AvionComponent, canActivate: [AuthGuardService] },
            { path: "ville/:id", title: "ville", component: Components.VillesComponent, canActivate: [AuthGuardService] },
            { path: "siege/:id", title: "siege", component: Components.SiegeComponent, canActivate: [AuthGuardService] },
            { path: "passager/:id", title: "passage", component: Components.PassagerComponent, canActivate: [AuthGuardService] },
            { path: "admincompagnie/:id", title: "admincompagnie", component: Components.AdminCompagnieComponent, canActivate: [AuthGuardService] },

        ]
     },


];
