import { Component, inject, OnInit } from '@angular/core';
import { CapteursService } from '../services/capteurs.service';
import { MachinePipe, ToDatePipe } from '../services/filtres.pipe';
import { FormsModule } from '@angular/forms';
import { Kit, KitI } from '../services/modeles';
import { apparaitAnimation } from '../../extra/services/animations';

@Component({
  selector: 'app-kits',
  imports: [ ToDatePipe, FormsModule, MachinePipe ],
  templateUrl: './kits.component.html',
  animations: [ apparaitAnimation ]
})
export class KitsComponent implements OnInit{

  c:CapteursService = inject(CapteursService);

  edit:string = '';
  kit?:KitI;

  ngOnInit(){
  }
  addKit(){
    this.kit = new Kit();
    this.edit = 'add';
  }
  annule(){
    this.edit = '';
    this.kit = undefined;
  }
  editKit(kit:KitI){
    this.edit = 'edit';
    this.kit = kit;
  }
  delKit(kit:KitI){
    this.edit = 'delete';
    this.kit = kit;
  }
  upKit(){
    this.edit == 'add' ? this.c.addKit(this.kit!) : this.c.setKit(this.kit!);
    this.edit = '';
  }
}
