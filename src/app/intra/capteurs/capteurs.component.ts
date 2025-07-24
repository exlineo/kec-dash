import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { CapteursService } from '../services/capteurs.service';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { TimePipe } from '../services/filtres.pipe';

Chart.register(...registerables);

@Component({
  selector: 'app-capteurs',
  imports: [FormsModule],
  templateUrl: './capteurs.component.html',
  styleUrl: './capteurs.component.css'
})
export class CapteursComponent implements OnInit {

  c: CapteursService = inject(CapteursService);

  lineChart: any = null;
  lineData: any = null;

  filtres: any = {
    kit: null,
    debut: null,
    fin: null,
    time_debut: 0,
    time_fin: Date.now()
  };
  constructor() {
    effect(() => {
      this.setChart();
    })
  }
  ngOnInit() {
  }

  getCapteursData() {
    // console.log(this.filtres);
    this.filtres.time_debut = new TimePipe().transform(this.filtres.debut);
    this.filtres.time_fin = new TimePipe().transform(this.filtres.fin);

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
  setChart() {
    const ta: any = []; // Temperature ambiante
    const ha: any = []; // Humidité ambiante
    const tm: any = []; // Temperature machine
    const vm: any = []; // Vibration
    const cm: any = []; // Courant
    const h2o: any = [];
    const etiquettes: any = [];

    this.c.capteurs().forEach((c) => {
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

    // console.log(ta, ha, tm, vm, cm, h2o, this.lineData);
    if (this.lineChart) {
      this.lineChart.destroy();
    }
    this.lineChart = new Chart('chartLignes', this.setChartConfig(this.lineData));
  }
}
