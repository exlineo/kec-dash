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

  edit: string = '';
  machine?: MachineI;

  ngOnInit() {
  }
  addMach() {
    this.machine = new Machine();
    this.edit = 'add';
  }
  annule() {
    this.edit = '';
    this.machine = undefined;
  }
  editMach(mach: MachineI) {
    this.edit = 'edit';
    this.machine = mach;
  }
  delMach(mach: MachineI) {
    this.edit = 'del';
    this.machine = mach;
  }
  upMachine(){
    this.edit == 'add' ? this.c.addMachine(this.machine!) : this.c.setMachine(this.machine!);
    this.edit = '';
  }
}
