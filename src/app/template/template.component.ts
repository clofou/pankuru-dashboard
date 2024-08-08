import { Component } from '@angular/core';
import { NavBarComponent } from '../components/Utils/nav-bar/nav-bar.component';
import { SearchBarComponent } from '../components/Utils/search-bar/search-bar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [NavBarComponent, SearchBarComponent, RouterOutlet],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css'
})
export class TemplateComponent {

}
