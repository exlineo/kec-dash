import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-connexion',
  imports: [ FormsModule, RouterLink ],
  templateUrl: './connexion.component.html'
})
export class ConnexionComponent {
  auth:AuthService = inject(AuthService);

  id:any = {email:'', mdp:''};

  getUser(){

  }
}
