import {Component} from '@angular/core';
import {PaysComponent} from "./pays/pays.component";
import {SiegeComponent} from "../avion/siege/siege.component";


@Component({
  selector: 'app-aeroport',
  standalone: true,
  imports: [PaysComponent, SiegeComponent],
  templateUrl: './aeroport.component.html',
  styleUrl: './aeroport.component.css'
})
export class AeroportComponent{
}
