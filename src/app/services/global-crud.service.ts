import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth-service/auth.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GlobalCrudService {

  public baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient, private authService: AuthService) {}

  private createAuthorizationHeader(): HttpHeaders {
    const username = this.authService.getUsername();
    const password = this.authService.getPassword();
    const credentials = btoa(`${username}:${password}`);
    return new HttpHeaders({
      'Authorization': `Basic ${credentials}`
    });
  }

  /**
   * Récupère des données à partir d'un point de terminaison spécifié.
   *
   * @param {string} name - Le nom du point de terminaison.
   * @return {Observable<any>} Un observable qui émet les données récupérées.
   */
  get(name: string): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get(`${this.baseUrl}/${name}/afficher`, { headers });
  }  

  /**
   * Envoie une requête POST à l'endpoint spécifié pour créer une nouvelle ressource.
   *
   * @param {string} name - Le nom de l'endpoint.
   * @param {Object} object - Les données à envoyer dans le corps de la requête.
   * @return {Observable<Object>} Un observable qui émet la réponse du serveur.
   */
  post(name: string, object: Object): Observable<Object> {
    const headers = this.createAuthorizationHeader();
    return this.http.post(`${this.baseUrl}/${name}/ajout`, object, { headers });
  }


  /**
   * Met à jour un objet dans la collection spécifiée.
   *
   * @param {string} name - Le nom de l'endpoint.
   * @param {number} id - L'ID de l'objet à mettre à jour.
   * @param {Object} object - L'objet mis à jour.
   * @return {Observable<Object>} Un observable qui émet l'objet mis à jour.
   */
  update(name: string,id: number, object: Object): Observable<Object> {
    const headers = this.createAuthorizationHeader();
    return this.http.put(`${this.baseUrl}/${name}/modifier/${id}`, object, { headers });
  }

  /**
    * Supprime un objet d'une collection spécifiée.
    *
    * @param {string} name - Le nom de l'endpoint .
    * @param {number} id - L'ID de l'objet à supprimer.
    * @return {Observable<any>} Un observable qui émet la réponse du serveur.
    */
  delete(name: string,id: number): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.delete(`${this.baseUrl}/${name}/supprimer/${id}`, { headers });
  }
}
