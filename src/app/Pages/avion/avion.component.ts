import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {GlobalCrudService} from "../../services/global-crud.service";
import {Router} from "@angular/router";
import {Avion} from "../../models/Avion";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-avion',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './avion.component.html',
  styleUrl: './avion.component.css'
})
export class AvionComponent implements OnInit{
  avionList!: Avion[];
  showAddModal!: boolean;
  showEditModal!: boolean;
  showDeletedModal!: boolean;
  selectedAvion!: Avion;
  avionToAdd!: Avion;

  constructor(private crudService: GlobalCrudService, private route: Router, private toastr: ToastrService) {
    this.avionToAdd = new Avion();
    this.showAddModal = false;
    this.showEditModal = false;
    this.showDeletedModal = false;
  }

  ngOnInit(): void {
    this.getAllAvion();
  }

  getAllAvion(){
    this.crudService.get("avion").subscribe({
      next: (data) => {
        let allAvions = data;
        console.log(data);
        this.avionList = allAvions;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  goToSiegePage(avion: Avion) {
    this.route.navigate(["/pankuru/siege", avion.id]).then(r => console.log(r));
  }

  IsAddAvionButtonClicked() {
    this.showAddModal = !this.showAddModal;
  }

  isEditButtonClicked(selectedAvion: Avion) {
    this.showEditModal = !this.showEditModal;
    this.selectedAvion = selectedAvion;
  }

  modifierAvion(selectedAvion: Avion) {
    this.crudService.update("avion", this.selectedAvion.id!, selectedAvion).subscribe({
      next: (data) => {
        console.log(data);
        this.toastr.success("Avion enregistre avec Succees");
        this.isEditButtonClicked(selectedAvion);
      },
      error: (err) => {
        let errorMessage: string = "Erreur lors de la modification de l'avion";
        console.log(err);
        this.toastr.error(errorMessage);
      }
    })
  }

  isDeleteButtonClicked(selectedAvion: Avion) {
    this.showDeletedModal = !this.showDeletedModal;
    this.selectedAvion = selectedAvion;
  }

  supprimerVille(selectedAvion: Avion) {
    this.crudService.delete("avion", selectedAvion.id!).subscribe(
      {
        next: () => {
          this.toastr.error("Suppresion effectue avec success.");
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("Erreur lors de la suppression.");
        }
      }
    )
  }

  ajouterAvion() {
    this.crudService.post("avion", this.avionToAdd).subscribe({
      next: (data) => {
        console.log(data);
        this.toastr.success("Avion "+ this.avionToAdd.nom + " ajouter avec succeess.")
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Erreur lors de l'ajout de l'avion")
      }
    })
  }
}
