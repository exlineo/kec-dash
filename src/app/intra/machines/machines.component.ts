import { Component, inject } from '@angular/core';
import { Machine, MachineI } from '../services/modeles';
import { CapteursService } from '../services/capteurs.service';
import { FormsModule } from '@angular/forms';
import { apparaitAnimation } from '../../extra/services/animations';

@Component({
  selector: 'app-machines',
  imports: [ FormsModule ],
  templateUrl: './machines.component.html',
    animations: [ apparaitAnimation ]
})
export class MachinesComponent {
  c: CapteursService = inject(CapteursService);

  edit: boolean = false;
  delete: boolean = false;
  machine?: MachineI;

  ngOnInit() {
  }
  addMach() {
    this.machine = new Machine();
    this.edit = true;
  }
  annule() {
    this.edit = false;
    this.delete = false;
    this.machine = undefined;
  }
  editMach(mach: MachineI) {
    this.edit = true;
    this.delete = false;
    this.machine = mach;
  }
  delMach(mach: MachineI) {
    this.delete = true;
    this.edit = false;
    this.machine = mach;
  }
}
