import { inject, Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  a:Auth = inject(Auth);
  r:Router = inject(Router);

  con: boolean = false;
  user?:User;

  constructor() { }

  getAuth(email:string, password:string){
    console.log(email, password);
    signInWithEmailAndPassword(this.a, email, password).then((u) => {
      this.user = u.user;
      console.log(u, this.user);
      if(u.user){
        this.r.navigateByUrl('/intra');
      }
    })
  }
}
