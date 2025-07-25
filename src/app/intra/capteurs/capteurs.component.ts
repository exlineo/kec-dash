import { Component, effect, inject, OnInit } from '@angular/core';
import { CapteursService } from '../services/capteurs.service';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { DureePipe, TimePipe } from '../services/filtres.pipe';
import { UtilsService } from '../../extra/services/utils.service';

Chart.register(...registerables);

@Component({
  selector: 'app-capteurs',
  imports: [ FormsModule, DureePipe ],
  templateUrl: './capteurs.component.html',
  styleUrl: './capteurs.component.css'
})
export class CapteursComponent implements OnInit {

  c: CapteursService = inject(CapteursService);
  u: UtilsService = inject(UtilsService);

  dp:DureePipe = new DureePipe();
  tp:TimePipe = new TimePipe();

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
  durees:{arret:number, fonctionnement:number} = {arret:0, fonctionnement:0};
  constructor() {
    effect(() => {
      this.setStats();
    })
  }
  ngOnInit() {
  }

  getCapteursData() {
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
    const h2o: any = [];
    const etiquettes: any = [];
    this.durees = {arret:0, fonctionnement:0};

    // Calculer les temps
    const times = this.c.capteurs().map((c: any) => c.timestamp);
    times.forEach((t: any, index: number) => {
      let tmp = 0;
      if(index > 0 ){
      }
      if (index > 0 && (t - times[index - 1] > 30000 || t == 0)) {
        console.log(t - times[index - 1]);
        this.foncts.push(times.splice(tmp, index - 1));
        this.durees.fonctionnement += t - times[tmp];
        tmp = index;
      }
    });
    // Calcul du temps sans fonctionnement
    this.durees.arret = this.filtres.time_fin - this.filtres.time_debut - this.durees.fonctionnement;
    // Afficher les courbes des capteurs
    this.c.capteurs().forEach((c: any, index: number) => {
      // Données pour le chart
      ta.push(c.t_ambiante);
      ha.push(c.h_ambiante * 100);
      tm.push(c.t_machine);
      vm.push(c.vib);
      cm.push(c.hall);
      h2o.push(c.h2o);
      etiquettes.push(new Date(c.timestamp).toLocaleString());
    });

    this.lineData = {
      labels: etiquettes,
      datasets: [
        this.setChartDataset('Temperature ambiante', ta, '#ff0000'),
        this.setChartDataset('Humidité ambiante', ha, '#00ff00'),
        this.setChartDataset('Temperature machine', tm, '#0000ff')
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
}
