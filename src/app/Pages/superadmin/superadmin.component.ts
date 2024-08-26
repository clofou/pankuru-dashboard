import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import { SuperAdmin } from '../../models/SuperAdmin';
import {GlobalCrudService} from "../../services/global-crud.service";

@Component({
  selector: 'app-superadmin',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './superadmin.component.html',
  styleUrl: './superadmin.component.css'
})
export class SuperAdminComponent implements OnInit{
  superadminList!: SuperAdmin[];
  showAddModal!: boolean;
  showEditModal!: boolean;
  showDeletedModal!: boolean;
  selectedSuperAdmin!: SuperAdmin;
  superadminToAdd!: SuperAdmin;

  constructor(private crudService: GlobalCrudService, private toastr: ToastrService) {
    this.superadminToAdd = new SuperAdmin();
    this.showAddModal = false;
    this.showEditModal = false;
    this.showDeletedModal = false;
  }

  ngOnInit(): void {
    this.getAllSuperAdmin();
  }

  getAllSuperAdmin(){
    this.crudService.get("superadmin").subscribe({
      next: value => {
          this.superadminList = value
          console.log(this.superadminList);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  IsAddSuperAdminButtonClicked() {
    this.showAddModal = !this.showAddModal;
    console.log(this.showAddModal);
  }

  isEditButtonClicked(selectedSuperAdmin: SuperAdmin) {
    this.showEditModal = !this.showEditModal;
    this.selectedSuperAdmin = selectedSuperAdmin;
  }

  modifierSuperAdmin(selectedSuperAdmin: SuperAdmin) {
    this.crudService.update("superadmin", this.selectedSuperAdmin.id!, selectedSuperAdmin).subscribe({
      next: (data) => {
        console.log(data);
        this.toastr.success("SuperAdmin enregistre avec Succees");
        this.isEditButtonClicked(selectedSuperAdmin);
        this.getAllSuperAdmin();
      },
      error: (err) => {
        let errorMessage: string = "Erreur lors de la modification de l'superadmin";
        console.log(err);
        this.toastr.error(errorMessage);
      }
    })
  }

  isDeleteButtonClicked(selectedSuperAdmin: SuperAdmin) {
    this.showDeletedModal = !this.showDeletedModal;
    this.selectedSuperAdmin = selectedSuperAdmin;
  }

  supprimerSuperAdmin(selectedSuperAdmin: SuperAdmin) {
    this.crudService.delete("superadmin", selectedSuperAdmin.id!).subscribe(
      {
        next: () => {
          this.toastr.error("Suppresion effectue avec success.");
          this.isDeleteButtonClicked(selectedSuperAdmin);
          this.getAllSuperAdmin();
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("Erreur lors de la suppression.");
        }
      }
    )
  }

  ajouterSuperAdmin() {
    this.crudService.post("superadmin", this.superadminToAdd).subscribe({
      next: (data) => {
        console.log(data);
        this.IsAddSuperAdminButtonClicked();
        this.getAllSuperAdmin();
        this.toastr.success("SuperAdmin "+ this.superadminToAdd.nom + " ajouter avec succeess.")
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Erreur lors de l'ajout de l'superadmin")
      }
    })
  }
}
