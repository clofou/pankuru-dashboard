import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth/auth-service/auth.service';
import { MenuItemComponent } from './menu-item/menu-item.component';

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
    this.role = this.authService.getUserFormLocalStorage().roles[0];
    if (this.role == 'ROLE_ADMIN') {
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

