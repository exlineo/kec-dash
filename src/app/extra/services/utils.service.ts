import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  msg?: { titre: string, infos: string };
  classe: string = 'invalide';

  isMobile:boolean = false;

  sendMail(email: string) {
    window.open("mailto:" + atob(email) + "?subject=Contact depuis le site Internet&body=Bonjour, je suis interesse par votre offre.");
  }
  tpsTotal(d: number, f: number) {
    return f - d * 60000; // Temps en minutes 
  };
  tpsArret(d: number, f: number) {
    return f - d * 60000; // Temps en minutes 
  };
  /** Afficher un message */
  setMsg(titre?: string, infos?: string, classe?: string) {
    if(classe) this.classe = classe;
    if (titre && infos) {
      this.msg = { titre, infos };
      // this.load = false;
      setTimeout(() => { this.msg = undefined }, 3000);
    } else {
      this.msg = undefined;
    };
  }

}
