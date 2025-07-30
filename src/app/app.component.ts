import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { EnteteComponent } from "./extra/entete/entete.component";
import { PiedComponent } from "./extra/pied/pied.component";
import { UtilsService } from './extra/services/utils.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EnteteComponent, PiedComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  ar:ActivatedRoute = inject(ActivatedRoute);
  u:UtilsService = inject(UtilsService);

  titre = 'Dashboard Kit Eco Cooling';

  // ngOnInit(): void {
  //   this.ar.data.subscribe(data => {
  //     this.titre = 'KEC - ' + data['titre'];
  //   });
  // }
}
