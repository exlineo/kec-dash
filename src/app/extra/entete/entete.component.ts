import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-entete',
  imports: [ RouterLink ],
  templateUrl: './entete.component.html'
})
export class EnteteComponent {
  auth:AuthService = inject(AuthService);
}
