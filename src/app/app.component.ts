import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {InactivityService} from "./services/inactivity/inactivity.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Pankuru';

  constructor(private inactivityService: InactivityService) {
  }

  ngOnInit(): void {
  }
}
