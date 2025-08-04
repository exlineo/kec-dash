import { Component, effect, inject, OnInit } from '@angular/core';
import { CapteursService } from '../services/capteurs.service';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { ConsoPipe, DureePipe, TimePipe } from '../services/filtres.pipe';
import { UtilsService } from '../../extra/services/utils.service';
import { KitI, MachineI } from '../services/modeles';

Chart.register(...registerables);

@Component({
  selector: 'app-capteurs',
  imports: [FormsModule, DureePipe, ConsoPipe],
  templateUrl: './capteurs.component.html'
})
export class CapteursComponent implements OnInit {

  c: CapteursService = inject(CapteursService);
  u: UtilsService = inject(UtilsService);

  dp: DureePipe = new DureePipe();
  tp: TimePipe = new TimePipe();

  lineChart: any = null;
  lineData: any = null;

  filtres: any = {
    kit: null,
    debut: null,
    fin: null,
    time_debut: 0,
    time_fin: Date.now()
  };
  foncts: Array<Array<number>> = []; // Tableau des temps de fonctionnement
  durees: { arret: number, fonctionnement: number } = { arret: 0, fonctionnement: 0 };
  constructor() {
    effect(() => {
      this.setStats();
    })
  }
  ngOnInit() {
  }
  /** Kit choisi */
  setKit(kit: string) {
    this.c.kit = this.c.kits.find((k: KitI) => k.id == kit);
    this.c.kit!.machine = this.c.machines.find((m: MachineI) => m.id == this.c.kit!.idMachine);
  }

  /** Rechercher des données */
  getCapteursData() {
    if (this.c.kits.length == 0 && this.filtres.kit && this.filtres.kit != '') this.c.kit = this.c.kits.find((k: KitI) => k.id == this.filtres.kit);
    // console.log(this.filtres);
    this.filtres.time_debut = this.tp.transform(this.filtres.debut);
    this.filtres.time_fin = this.tp.transform(this.filtres.fin);
    console.log(this.filtres);
    this.c.getCapteurByTemps(this.filtres.time_debut, this.filtres.time_fin);
  }
  setChartConfig(data: any) {
    return {
      type: 'line',
      data
    }
  }
  /** Paramétrer un set de données pour le chart */
  setChartDataset(label: string, data: any, color: string) {
    return {
      label,
      data,
      borderColor: color,
      backgroundColor: color,
      pointStyle: 'circle',
      pointRadius: 2,
      pointHoverRadius: 10
    }
  }
  /** Traiter les données reçus */
  setStats() {
    const ta: any = []; // Temperature ambiante
    const ha: any = []; // Humidité ambiante
    const tm: any = []; // Temperature machine
    const vm: any = []; // Vibration
    const cm: any = []; // Courant
    const urge:any = []; // Urgence déclenché pour voir si l'aspersion est interdite
    const h2o: any = [];
    const etiquettes: any = [];
    this.durees = { arret: 0, fonctionnement: 0 };

    // Récupérer l'ensemble des timestamps
    const times = this.c.capteurs().map((c: any) => c.timestamp);
    // console.log("Ecarts trouvés", this.sommeEcarts(times));
    // Calculer le temps de fonctionnement
    // times.forEach((t: any, index: number) => {
    //   let tmp = 0;
    //   if (index > 0 && (t - times[index - 1] > 30000 || t == 0)) {
    //     this.foncts.push(times.splice(tmp, index - 1));
    //     tmp = index;
    //   };
    // });
    // // Calculer le temps de fonctionnement de la machine
    // this.foncts.forEach((f: any) => {
    //   if (f.length > 0) {
    //     this.durees.fonctionnement += f[f.length - 1] - f[0]
    //   }
    // });
    // Calcul du temps sans fonctionnement
    this.durees.fonctionnement = times[times.length - 1] - times[0] - this.sommeEcarts(times);
    this.durees.arret = this.filtres.time_fin - this.filtres.time_debut - this.durees.fonctionnement;
    let tmp:any;
    // Afficher les courbes des capteurs
    this.c.capteurs().forEach((c: any, index: number) => {
      // Données pour le chart
      ta.push(c.t_ambiante);
      ha.push(c.h_ambiante * 100);
      c.t_machine < -30 && tmp ? tm.push(tmp.t_machine) : tm.push(c.t_machine);
      // tm.push(c.t_machine);
      vm.push(c.vib);
      cm.push(c.hall);
      h2o.push(c.h2o);
      urge.push(c.u * 50);
      etiquettes.push(new Date(c.timestamp).toLocaleString());
      tmp = c;
      // console.log("tmp : ", tmp.t_machine, "c : ", c.t_machine);
    });

    this.lineData = {
      labels: etiquettes,
      datasets: [
        this.setChartDataset('Temperature ambiante', ta, '#ff0000'),
        this.setChartDataset('Humidité ambiante', ha, '#00ff00'),
        this.setChartDataset('Temperature machine', tm, '#0000ff'),
        this.setChartDataset("Interdiction d'aspersion", urge, '#939393ff')
        // this.setChartDataset('Vibration', vm, '#ff00ff'),
        // this.setChartDataset('Courant', cm, '#ffff00'),
        // this.setChartDataset('H2O', h2o, '#00ffff'),
      ]
    };

    console.log(this.foncts, this.durees, this.dp.transform(this.durees.fonctionnement));
    // console.log(ta, ha, tm, vm, cm, h2o, this.lineData);
    if (this.lineChart) {
      this.lineChart.destroy();
    }
    this.lineChart = new Chart('chartLignes', this.setChartConfig(this.lineData));
  }
  /** Calcul des écarts importants pour les soustraire au temps de fonctionnement de la machine*/
  sommeEcarts(timestamps: Array<number>) {
    let sommeEcartsMs = 0;

    for (let i = 1; i < timestamps.length; i++) {
      const ecartMs = timestamps[i] - timestamps[i - 1];
      if (ecartMs > 30000) { // 30 000 ms = 30 secondes
        sommeEcartsMs += ecartMs;
      }
    }

    return sommeEcartsMs;
  }
  /** Récupérer les paramètres d'une aspersion */
  // &p=" + asp_encours + ":" + programmes[asp_programme].duree + ":" + programmes[asp_programme].cycles + ":" + programmes[asp_programme].interval + ":" + programmes[asp_programme].tempo + " HTTP/1.1";
  getParams(str:string){
    const p = str.split(':');
    return {
      encours: p[0],
      duree: p[1],
      cycles: p[2],
      interval: p[3],
      tempo: p[4]
    };
  }
}
