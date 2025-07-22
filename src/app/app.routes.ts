import { Routes } from '@angular/router';
import { ConnexionComponent } from './extra/connexion/connexion.component';
import { MentionsComponent } from './extra/mentions/mentions.component';

export const routes: Routes = [
    { path:'connexion', component:ConnexionComponent, data: { titre: 'Connexion' }},
    { path:'mentions', component:MentionsComponent, data: { titre: 'Mentions légales et conditions de vente' }},
    { path:'intra', loadComponent: () => import('./intra/accueil/accueil.component').then(m => m.AccueilComponent), data: { titre: 'Intranet' } },
    { path:'**', component:ConnexionComponent, data: { titre: 'Connexion' }}
];
