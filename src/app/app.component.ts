import { Component, HostListener, inject } from '@angular/core';
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
  ar: ActivatedRoute = inject(ActivatedRoute);
  u: UtilsService = inject(UtilsService);

  titre = 'Dashboard Kit Eco Cooling';

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    console.log(width);
    width < 890 ? this.u.isMobile = true : this.u.isMobile = false;
  }

  // ngOnInit(): void {
  //   this.ar.data.subscribe(data => {
  //     this.titre = 'KEC - ' + data['titre'];
  //   });
  // }
}
