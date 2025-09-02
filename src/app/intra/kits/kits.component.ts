import { Component, inject, OnInit } from '@angular/core';
import { CapteursService } from '../services/capteurs.service';
import { MachinePipe } from '../services/filtres.pipe';
import { FormsModule } from '@angular/forms';
import { Kit, KitI } from '../services/modeles';
import { apparaitAnimation } from '../../extra/services/animations';
import { UtilsService } from '../../extra/services/utils.service';

@Component({
  selector: 'app-kits',
  imports: [FormsModule, MachinePipe],
  templateUrl: './kits.component.html',
  animations: [apparaitAnimation]
})
export class KitsComponent implements OnInit {

  c: CapteursService = inject(CapteursService);
  u:UtilsService = inject(UtilsService);

  edit: string = '';
  kit?: KitI;

  ngOnInit() {
    console.log("Kits chargés", this.c.kits);
  }
  addKit() {
    this.kit = new Kit();
    this.edit = 'add';
  }
  annule() {
    this.edit = '';
    this.kit = undefined;
  }
  editKit(kit: KitI) {
    this.edit = 'edit';
    this.kit = kit;
  }
  delKit(kit: KitI) {
    this.edit = 'delete';
    this.kit = kit;
  }
  upKit() {
    this.edit == 'add' ? this.c.addKit(this.kit!) : this.c.setKit(this.kit!);
    this.edit = '';
  }
  setProgramme(programme: any) {
    const val = programme.value;
    this.kit!.params.config = val;
    console.log(val, programme.value);
  }
}
