import { Route } from "@angular/router";
import { AccueilComponent } from "./accueil/accueil.component";
import { ProfilComponent } from "./profil/profil.component";
import { ReglagesComponent } from "./reglages/reglages.component";
import { KitsComponent } from "./kits/kits.component";
import { InfosComponent } from "./infos/infos.component";
import { CapteursComponent } from "./capteurs/capteurs.component";

export const INTRA_ROUTES: Route[] = [
  {
    path: '', component: AccueilComponent, children: [
      { path: '', component: InfosComponent, title: 'KEC - Intranet' },
      { path: 'profil', component: ProfilComponent, title: 'KEC - Profil' },
      { path: 'capteurs', component: CapteursComponent, title: 'KEC - Données des kits' },
      { path: 'reglages', component: ReglagesComponent, title: 'KEC - Réglage des kits' },
      { path: 'kits', component:KitsComponent, title: 'KEC - Gestion des kits'}
    ]
  }
];