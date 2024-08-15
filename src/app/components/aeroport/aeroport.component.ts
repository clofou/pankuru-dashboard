import {Component, OnInit} from '@angular/core';
import {GlobalCrudService} from "../../services/global-crud.service";
import {RouterLink} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Aeroport} from "../../models/Aeroport";
import { PaysCardComponent } from '../Utils/pays-card/pays-card.component';
import { Pays } from '../../models/Pays';
import { PaysComponent } from "../localite/pays/pays.component";

@Component({
  selector: 'app-aeroport',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FormsModule,
    NgIf,
    RouterLink,
    NgForOf,
    PaysCardComponent,
    PaysComponent
],
  templateUrl: './aeroport.component.html',
  styleUrl: './aeroport.component.css'
})
export class AeroportComponent implements OnInit{

  aeroportList!: Aeroport[];
  selectedAeroport!: Aeroport;
  aeroportToAdd!: Aeroport;
  showDeleteModal!: boolean;
  showAddModal!: boolean;
  showEditModal!: boolean;


  constructor(private crudService: GlobalCrudService, private toastr: ToastrService) {
    console.log("Hi");
    this.showAddModal = false;
    this.showEditModal = false;
    this.showDeleteModal = false;
    this.aeroportToAdd = new Aeroport("","", 0.0, 0, 0.0, 0, 0, 0 );
    console.log("Hi6");
  }

  ngOnInit(): void {
    console.log("Hi2");
    this.recupererDonnes();
  }

  recupererDonnes(): void {
    this.crudService.get("aeroport").subscribe({
      next: (data) => {
        console.log(data);
        this.aeroportList = data;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des aéroports: ", err);
      }
    });
  }

  // Delete Airport
  openDeleteModal(aeroport: Aeroport): void {
    this.selectedAeroport = aeroport;
    this.showDeleteModal = true;
  }
  confirmDelete(): void {
    this.crudService.delete("aeroport",this.selectedAeroport.id!).subscribe({
      next: () => {
        this.toastr.error("Aéroport supprimer avec succès", "Fermer");
        this.recupererDonnes(); // Mettre à jour la liste des aéroports après suppression
        this.closeDeleteModal();
      },
      error: (err) => {
        console.error("Erreur lors de la suppression de l'aéroports: ", err);
      }
    });
  }
  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }



  // Edit Airport
  openEditModal(aeroport: Aeroport): void {
    this.selectedAeroport = aeroport; // Copier l'objet aéroport
    this.showEditModal = true;
  }
  onEditSubmit(): void {
    this.crudService.update("aeroport",this.selectedAeroport.id!, this.selectedAeroport).subscribe({
      next: () => {
        this.closeEditModal();
        this.toastr.success("Aéroport modifier avec succès", "Success");
        this.recupererDonnes();
      },
      error: (err) => {
        console.error("Erreur lors de la mise à jour de l'aéroport: ", err);
      }
    });
  }
  closeEditModal(): void {
    this.showEditModal = false;
  }

  // Add Airport
  openAddModal(): void {
    this.showAddModal = true;
  }
  onAddSubmit(): void {
    if (this.aeroportToAdd.nom != "" && this.aeroportToAdd.villeId != undefined){
      this.crudService.post("aeroport", this.aeroportToAdd).subscribe({
        next: () => {
          this.closeEditModal();
          this.toastr.success("Aéroport modifier avec succès", "Success");
          this.recupererDonnes();
        },
        error: (err) => {
          console.error("Erreur lors de la mise à jour de l'aéroport: ", err);
        }
      });
    }

  }
  closeAddModal(): void {
    this.showEditModal = false;
  }

}
