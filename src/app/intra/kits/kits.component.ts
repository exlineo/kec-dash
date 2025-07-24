import { Component, inject, OnInit } from '@angular/core';
import { CapteursService } from '../services/capteurs.service';
import { ToDatePipe } from '../services/filtres.pipe';
import { FormsModule } from '@angular/forms';
import { Kit, KitI } from '../services/modeles';

@Component({
  selector: 'app-kits',
  imports: [ ToDatePipe, FormsModule ],
  templateUrl: './kits.component.html',
  styleUrl: './kits.component.css'
})
export class KitsComponent implements OnInit{

  c:CapteursService = inject(CapteursService);

  edit:boolean = false;
  kit:KitI = new Kit();

  ngOnInit(){
    if(this.c.kits.length == 0) this.c.getKits();
  }
}
