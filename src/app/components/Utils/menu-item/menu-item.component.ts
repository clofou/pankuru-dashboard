import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth-service/auth.service';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [NgFor, NgIf, CommonModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css'
})
export class MenuItemComponent {

  selectedNavItem: string = 'Acceuil'; // Par défaut, l'accueil est sélectionné
  role: string = '';
  roleRequis = '';


  @Input({ required: true }) menuItemTitle!: string;
  @Input({ required: true }) menuItemIcon!: string;
  @Input({ required: true }) route!: string;


  constructor(private authService: AuthService, private router: Router, @Inject(PLATFORM_ID) private platformId: any) {

    this.role = this.authService.getRole();
    this.roleRequis = this.displayByRole.ROLE_ADMINCOMPAGNIE.includes(this.menuItemTitle) ? 'ROLE_ADMINCOMPAGNIE' : 'ROLE_ADMIN';

    if (isPlatformBrowser(this.platformId)) {

      const savedNavItem = localStorage.getItem('selectedNavItem');
      if (savedNavItem) {
        this.selectedNavItem = savedNavItem;

      }
    }
  }

  displayByRole = {
    "ROLE_ADMINCOMPAGNIE": ["Acceuil", "Vols", "Personnels", "Aeroports", "Faq", "Connexion", "Parametre"],
    "ROLE_ADMIN": ["Admin", "Super Admin", "Compagnies", "Connexion", "Parametre"],
  }


  selectItem() {
    this.selectedNavItem = this.menuItemTitle;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('selectedNavItem', this.menuItemTitle);
    }
  }

  gotoPage() {
    this.router.navigate([this.route]);
  }
  
}
