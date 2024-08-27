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
      next: () => {
        let role;
        console.log(this.authService.getUserFormLocalStorage());
        role = this.authService.getUserFormLocalStorage().roles[0];
        if (role == 'ROLE_ADMIN') {
          this.router.navigateByUrl("/pankuru/compagnie")
        } else{
          this.router.navigate(['/pankuru']);
        }

        this.toastr.success("Connexion réussie avec succès", "Success");
        this.username = '';
        this.password = '';
      },
      error: (err: Error) => {
        if(err.message == "Error Code: 404\n" +
          "Message: Http failure response for http://localhost:8080/personne/signin: 404 OK"){
          this.toastr.error("Nom d'utilisateur ou mot de passe incorrect");
        } else {
          this.toastr.error(err.message);
        }

        console.log(err.message);
        this.username = '';
        this.password = '';

      },
      complete: () => {
        console.log("Complete");
      }
    });
  }


}
