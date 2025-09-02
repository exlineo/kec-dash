import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UtilsService } from '../../extra/services/utils.service';

@Component({
  selector: 'app-accueil',
  imports: [RouterOutlet, RouterLink ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  u:UtilsService = inject(UtilsService);
}
