import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }
  
  sendMail(email:string){
    window.open("mailto:" + atob(email) + "?subject=Contact depuis le site Internet&body=Bonjour, je suis interesse par votre offre.");
  }
  tpsTotal(d:number, f:number){
    return f - d * 60000; // Temps en minutes 
  };
  tpsArret(d:number, f:number){
    return f - d * 60000; // Temps en minutes 
  };
}
