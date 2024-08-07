import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule, isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth/auth-service/auth.service';
import { MenuItemComponent } from '../Utils/menu-item/menu-item.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, MenuItemComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(private authService: AuthService) { }

  logout() {
    this.authService.logout();
  }
  logo1: string = "assets/images/logoToolbar.png";
  selectedNavItem: string = 'accueil'; // Par défaut, l'accueil est sélectionné





}

