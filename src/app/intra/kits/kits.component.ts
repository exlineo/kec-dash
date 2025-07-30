import { Component, inject, OnInit } from '@angular/core';
import { CapteursService } from '../services/capteurs.service';
import { ToDatePipe } from '../services/filtres.pipe';
import { FormsModule } from '@angular/forms';
import { Kit, KitI } from '../services/modeles';
import { apparaitAnimation } from '../../extra/services/animations';

@Component({
  selector: 'app-kits',
  imports: [ ToDatePipe, FormsModule ],
  templateUrl: './kits.component.html',
  animations: [ apparaitAnimation ]
})
export class KitsComponent implements OnInit{

  c:CapteursService = inject(CapteursService);

  edit:boolean = false;
  delete:boolean = false;
  kit?:KitI;

  ngOnInit(){
  }
  addKit(){
    this.kit = new Kit();
    this.edit = true;
  }
  annule(){
    this.edit = false;
    this.delete = false;
    this.kit = undefined;
  }
  editKit(kit:KitI){
    this.edit = true;
    this.delete = false;
    this.kit = kit;
  }
  delKit(kit:KitI){
    this.delete = true;
    this.edit = false;
    this.kit = kit;
  }
}
