import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-entete',
  imports: [],
  templateUrl: './entete.component.html'
})
export class EnteteComponent {
  auth:AuthService = inject(AuthService);
}
