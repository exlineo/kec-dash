import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-connexion',
  imports: [],
  templateUrl: './connexion.component.html'
})
export class ConnexionComponent {
  auth:AuthService = inject(AuthService);
}
