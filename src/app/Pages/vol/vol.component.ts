import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {GlobalCrudService} from "../../services/global-crud.service";
import {Router} from "@angular/router";
import {Vol} from "../../models/Vol";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-vol',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './vol.component.html',
  styleUrl: './vol.component.css'
})
export class VolComponent implements OnInit{
  volList!: Vol[];
  showAddModal!: boolean;
  showEditModal!: boolean;
  showDeletedModal!: boolean;
  selectedVol!: Vol;
  volToAdd!: Vol;

  constructor(private crudService: GlobalCrudService, private route: Router, private toastr: ToastrService) {
    this.volToAdd = new Vol();
    this.showAddModal = false;
    this.showEditModal = false;
    this.showDeletedModal = false;
  }

  ngOnInit(): void {
    this.getAllVol();
  }

  getAllVol(){
    this.crudService.get("vol").subscribe({
      next: (data) => {
        let allVols = data;
        console.log(data);
        this.volList = allVols;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  goToPassagerPage(vol: Vol) {
    this.route.navigate(["/pankuru/passager", vol.id]).then(r => console.log(r));
  }

  IsAddVolButtonClicked() {
    this.showAddModal = !this.showAddModal;
  }

  isEditButtonClicked(selectedVol: Vol) {
    this.showEditModal = !this.showEditModal;
    this.selectedVol = selectedVol;
  }

  modifierVol(selectedVol: Vol) {
    this.crudService.update("vol", this.selectedVol.id!, selectedVol).subscribe({
      next: (data) => {
        console.log(data);
        this.toastr.success("Vol enregistre avec Succees");
        this.isEditButtonClicked(selectedVol);
      },
      error: (err) => {
        let errorMessage: string = "Erreur lors de la modification de l'vol";
        console.log(err);
        this.toastr.error(errorMessage);
      }
    })
  }

  isDeleteButtonClicked(selectedVol: Vol) {
    this.showDeletedModal = !this.showDeletedModal;
    this.selectedVol = selectedVol;
  }

  supprimerVille(selectedVol: Vol) {
    this.crudService.delete("vol", selectedVol.id!).subscribe(
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

  ajouterVol() {
    this.crudService.post("vol", this.volToAdd).subscribe({
      next: (data) => {
        console.log(data);
        this.toastr.success("Vol "+ this.volToAdd.numeroDeVol+ " ajouter avec succeess.")
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Erreur lors de l'ajout de l'vol")
      }
    })
  }
}
