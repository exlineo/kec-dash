import { Routes } from '@angular/router';
import { ConnexionComponent } from './extra/connexion/connexion.component';
import { MentionsComponent } from './extra/mentions/mentions.component';

export const routes: Routes = [
    { path:'connexion', component:ConnexionComponent, data: { titre: 'Connexion' }, title: 'KEC - Connexion'},
    { path:'mentions', component:MentionsComponent, data: { titre: 'Mentions légales et conditions de vente' }, title: 'KEC - Mention légales et conditions de vente'},
    { path:'intra', loadChildren:()=>import('./intra/routes').then( m=>m.INTRA_ROUTES ), data: { titre: 'Intranet' }, title: 'KEC - Intranet' },
    // { path:'intra', loadComponent: () => import('./intra/accueil/accueil.component').then(m => m.AccueilComponent), data: { titre: 'Intranet' } },
    { path:'**', component:ConnexionComponent, data: { titre: 'Connexion' }, title: 'KEC - Connexion'}
];
