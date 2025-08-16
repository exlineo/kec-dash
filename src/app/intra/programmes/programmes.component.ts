import { Component, inject } from '@angular/core';
import { CapteursService } from '../services/capteurs.service';
import { ConfigI } from '../services/modeles';
import { FormsModule } from '@angular/forms';
import { apparaitAnimation } from '../../extra/services/animations';

@Component({
  selector: 'app-programmes',
  imports: [FormsModule],
  templateUrl: './programmes.component.html',
    animations: [ apparaitAnimation ]
})
export class ProgrammesComponent {
  c: CapteursService = inject(CapteursService);

  edit: string = '';
  config?: ConfigI;

  addConf() {
    this.config = { duree: 0, cycles: 0, interval: 0, tempo: 0 };
    this.edit = 'add';
  }
  annule() {
    this.edit = '';
    this.config = undefined;
  }
  editConf(conf: ConfigI) {
    this.edit = 'edit';
    this.config = conf;
  }
  delConf(conf: ConfigI) {
    this.edit = 'delete';
    this.config = conf;
  }
  upConf() {
    this.edit == 'add' ? this.c.addConf(this.config!) : this.c.setConf(this.config!);
    this.edit = '';
    this.config = undefined;
  }
}
