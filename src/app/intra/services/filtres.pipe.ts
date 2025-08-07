import { Pipe, PipeTransform } from '@angular/core';
import { MachineI } from './modeles';

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
    if(!debut || debut === 0) return '0h 0mn 0s';
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
    return `${formattedHours}h ${formattedMinutes}mn ${formattedSeconds}s`;
  }
}
@Pipe({
  name: 'conso'
})
export class ConsoPipe implements PipeTransform {
  /** Durée en heures et la machine concernée */
  transform(duree: number, machine?: MachineI): string {
    if(!duree || duree === 0 || !machine) return '';
    const h = duree / 360000;
    /// Consommation : p (en watts) = voltage * amperage * temps de travail : 220v / 217 watts/h
    return (h * machine.watts).toFixed(2) + ' kW';
  }
}

@Pipe({
  name: 'machine'
})
export class MachinePipe implements PipeTransform {
  /** Durée en heures et la machine concernée */
  transform(id: string, machines?: Array<MachineI>): string {
    if(!id || !machines) return '';
    const mach = machines.find((m: MachineI) => m.id == id)!;
    return mach ? mach.marque + ' (' + mach.annee + ' - ' + mach.gaz + ')' : '';
  }
}