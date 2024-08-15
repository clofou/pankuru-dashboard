import { HttpInterceptorFn } from '@angular/common/http';
import {AuthService} from "./auth-service/auth.service";
import {inject} from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);  // Injecter le AuthService
  const user = authService.getUserFormLocalStorage(); // Récupérer l'utilisateur depuis localStorage
  const token = user?.jwtToken; // Extraire le token de l'utilisateur s'il est disponible

  // Vérifiez si le token existe
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    // Passez la requête clonée au prochain gestionnaire
    return next(clonedReq);
  } else {
    // Passez la requête non modifiée si pas de token
    return next(req);
  }
};
