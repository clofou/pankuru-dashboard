import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule, isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth/auth-service/auth.service';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { UtilFunction } from '../utils-functions';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, MenuItemComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  selectedNavItem: string = 'acceuil';
  logo1: string = "assets/images/logoToolbar.png";
  role!: string;

  constructor(private authService: AuthService, private route: Router) { 
  }
  
  
  ngOnInit(): void {
    this.role = this.authService.getUserFormLocalStorage().role[0];
    if (this.role == 'ROLE_ADMIN') {
      this.route.navigateByUrl("/pankuru/compagnie")
      this.selectedNavItem = 'compagnie';
    }
  }
  logout() {
    this.authService.logout();
  }
  gotoPage(page: string) {
    this.selectedNavItem = page;
    this.route.navigateByUrl("/pankuru/"+page)
  }



}

