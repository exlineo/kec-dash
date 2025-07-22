import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EnteteComponent } from "./extra/entete/entete.component";
import { PiedComponent } from "./extra/pied/pied.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EnteteComponent, PiedComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Dashboard Kit Eco Cooling';
}
