import { Component, inject } from '@angular/core';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-pied',
  imports: [],
  templateUrl: './pied.component.html'
})
export class PiedComponent {
  u: UtilsService = inject(UtilsService);
}
