import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service/auth.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit {
  user!: any;
  adminProfil: string = "assets/images/Profil.png";


  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUserFormLocalStorage()
  }


}
