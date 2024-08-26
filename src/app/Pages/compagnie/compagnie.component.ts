import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {GlobalCrudService} from "../../services/global-crud.service";
import {Router} from "@angular/router";
import {Compagnie} from "../../models/Compagnie";
import {ToastrService} from "ngx-toastr";
import {NgClass, NgStyle} from "@angular/common";

@Component({
  selector: 'app-compagnie',
  standalone: true,
  imports: [
    FormsModule,
    NgStyle,
    NgClass
  ],
  templateUrl: './compagnie.component.html',
  styleUrl: './compagnie.component.css'
})
export class CompagnieComponent implements OnInit{
  compagnieList!: Compagnie[];
  showAddModal!: boolean;
  showEditModal!: boolean;
  showDeletedModal!: boolean;
  selectedCompagnie!: Compagnie;
  compagnieToAdd!: Compagnie;

  constructor(private crudService: GlobalCrudService, private route: Router, private toastr: ToastrService) {
    this.compagnieToAdd = new Compagnie();
    this.showAddModal = false;
    this.showEditModal = false;
    this.showDeletedModal = false;
  }

  ngOnInit(): void {
    this.getAllCompagnie();
  }

  getAllCompagnie(){
    this.crudService.get("compagnie").subscribe({
      next: (data) => {
        let allCompagnies = data;
        console.log(data);
        this.compagnieList = allCompagnies;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  goToAdminCompagniePage(compagnie: Compagnie) {
    this.route.navigate(["/pankuru/admincompagnie", compagnie.id]).then(r => console.log(r));
  }

  IsAddCompagnieButtonClicked() {
    this.showAddModal = !this.showAddModal;
  }

  isEditButtonClicked(selectedCompagnie: Compagnie) {
    this.showEditModal = !this.showEditModal;
    this.selectedCompagnie = selectedCompagnie;
  }

  modifierCompagnie(selectedCompagnie: Compagnie) {
    this.crudService.update("compagnie", this.selectedCompagnie.id!, selectedCompagnie).subscribe({
      next: (data) => {
        console.log(data);
        this.toastr.success("Compagnie enregistre avec Succees");
        this.isEditButtonClicked(selectedCompagnie);
        this.getAllCompagnie();
      },
      error: (err) => {
        let errorMessage: string = "Erreur lors de la modification de l'compagnie";
        console.log(err);
        this.toastr.error(errorMessage);
      }
    })
  }

  isDeleteButtonClicked(selectedCompagnie: Compagnie) {
    this.showDeletedModal = !this.showDeletedModal;
    this.selectedCompagnie = selectedCompagnie;
  }

  supprimerVille(selectedCompagnie: Compagnie) {
    this.crudService.delete("compagnie", selectedCompagnie.id!).subscribe(
      {
        next: () => {
          this.toastr.error("Compte bloque avec success.");
          this.isDeleteButtonClicked(selectedCompagnie);
          this.getAllCompagnie();
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("Erreur lors de la suppression.");
        }
      }
    )
  }

  ajouterCompagnie() {
    if(this.compagnieToAdd.nom.trim() == "" || this.compagnieToAdd.numeroTelephone == "" || this.compagnieToAdd.matricule == ""){
      this.toastr.error("Erreur lors de l'ajout de l'compagnie")
    }else{
      this.crudService.post("compagnie", this.compagnieToAdd).subscribe({
        next: (data) => {
          console.log(data);
          this.toastr.success("Compagnie "+ this.compagnieToAdd.nom + " ajouter avec succeess.");
          this.IsAddCompagnieButtonClicked();
          this.getAllCompagnie();
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("Erreur lors de l'ajout de l'compagnie")
        }
      })
    }
  }
}
