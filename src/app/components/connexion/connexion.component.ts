import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from "@angular/forms";
import { NgOptimizedImage } from '@angular/common';


@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [FormsModule, NgOptimizedImage],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
  username: string = '';
  password: string = '';
  isConnected: boolean = false;

  logo1: string = "assets/images/logoToolbar.png";
  person: string = "assets/images/person.png";
  eyes: string = "assets/images/eye.png";

  message = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.isConnected = !!localStorage.getItem('currentUser');
  }


  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        localStorage.setItem("currentUser", JSON.stringify(response));
        localStorage.setItem("role", response.role[0]); // Stocker le premier rôle
        this.router.navigate(['/accueil']);
        this.toastr.success("Connexion réussie avec succès", "Success");
        this.username = '';
        this.password = '';
      },
      error: (error) => {
        this.message = "Nom d'utilisateur ou mot de passe incorrect";
        this.toastr.error(this.message);
        this.username = '';
        this.password = '';
        console.log(error);
      },
      complete: () => {
        console.log("Complete");
      }
    });
  }

  
}
