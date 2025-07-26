import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: string): number {
    return new Date(value).getTime();
  }

}
@Pipe({
  name: 'toDate'
})
export class ToDatePipe implements PipeTransform {

  transform(value: number | Date): string {
    return new Date(value).toLocaleDateString("fr-FR")
  }

}
@Pipe({
  name: 'duree'
})
export class DureePipe implements PipeTransform {

  transform(debut: number, fin?: number): string {
    if(!debut) return '0:0:0';
    // Convertir le timestamp en secondes
    const totalSeconds = fin && fin > debut ? Math.floor((fin - debut) / 1000) : Math.floor(debut / 1000);
    
    // Calculer les heures, minutes et secondes
    const hours = Math.floor(totalSeconds / 3600);
    const remainingSeconds = totalSeconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    
    // Formater chaque partie avec deux chiffres (ajout d'un zéro devant si nécessaire)
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    // Retourner la chaîne formatée
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

}