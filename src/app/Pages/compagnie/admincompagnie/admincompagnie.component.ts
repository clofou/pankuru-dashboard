import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import { AdminCompagnie } from '../../../models/AdminCompagnie';
import {GlobalCrudService} from "../../../services/global-crud.service";
import { Compagnie } from '../../../models/Compagnie';

@Component({
  selector: 'app-admincompagnie',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './admincompagnie.component.html',
  styleUrl: './admincompagnie.component.css'
})
export class AdminCompagnieComponent implements OnInit{
  admincompagnieList!: AdminCompagnie[];
  showAddModal!: boolean;
  showEditModal!: boolean;
  showDeletedModal!: boolean;
  selectedAdminCompagnie!: AdminCompagnie;
  admincompagnieToAdd!: AdminCompagnie;
  idCompagnie: number = 0;

  constructor(private crudService: GlobalCrudService, private route: ActivatedRoute, private toastr: ToastrService) {
    this.admincompagnieToAdd = new AdminCompagnie();
    this.showAddModal = false;
    this.showEditModal = false;
    this.showDeletedModal = false;
  }

  ngOnInit(): void {
    this.idCompagnie = Number(this.route.snapshot.paramMap.get('id'));
    this.getAllAdminCompagnie();
  }

  getAllAdminCompagnie(){
    this.crudService.get("admincompagnie").subscribe({
      next: value => {
        console.log(value);
        if(value.length != 0){
          this.admincompagnieList = value.filter((value: { compagnie: { id: number; }; }) => {
            return value.compagnie.id == this.idCompagnie;
          });
          console.log(this.admincompagnieList);
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }

  IsAddAdminCompagnieButtonClicked() {
    this.showAddModal = !this.showAddModal;
    console.log(this.showAddModal);
  }

  isEditButtonClicked(selectedAdminCompagnie: AdminCompagnie) {
    this.showEditModal = !this.showEditModal;
    this.selectedAdminCompagnie = selectedAdminCompagnie;
  }

  modifierAdminCompagnie(selectedAdminCompagnie: AdminCompagnie) {
    let compagnie: Compagnie = new Compagnie();
    compagnie.id = this.idCompagnie;
    this.selectedAdminCompagnie.compagnie = compagnie;
    this.crudService.update("admincompagnie", this.selectedAdminCompagnie.id!, selectedAdminCompagnie).subscribe({
      next: (data) => {
        console.log(data);
        this.toastr.success("AdminCompagnie enregistre avec Succees");
        this.isEditButtonClicked(selectedAdminCompagnie);
        this.getAllAdminCompagnie();
      },
      error: (err) => {
        let errorMessage: string = "Erreur lors de la modification de l'admincompagnie";
        console.log(err);
        this.toastr.error(errorMessage);
      }
    })
  }

  isDeleteButtonClicked(selectedAdminCompagnie: AdminCompagnie) {
    this.showDeletedModal = !this.showDeletedModal;
    this.selectedAdminCompagnie = selectedAdminCompagnie;
  }

  supprimerAdminCompagnie(selectedAdminCompagnie: AdminCompagnie) {
    this.crudService.delete("admincompagnie", selectedAdminCompagnie.id!).subscribe(
      {
        next: () => {
          this.toastr.error("Suppresion effectue avec success.");
          this.isDeleteButtonClicked(selectedAdminCompagnie);
          this.getAllAdminCompagnie();
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("Erreur lors de la suppression.");
        }
      }
    )
  }

  ajouterAdminCompagnie() {
    let compagnie: Compagnie = new Compagnie();
    compagnie.id = this.idCompagnie;
    this.admincompagnieToAdd.compagnie = compagnie;
    this.crudService.post("admincompagnie", this.admincompagnieToAdd).subscribe({
      next: (data) => {
        console.log(data);
        this.IsAddAdminCompagnieButtonClicked();
        this.getAllAdminCompagnie();
        this.toastr.success("AdminCompagnie "+ this.admincompagnieToAdd.nom + " ajouter avec succeess.")
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("Erreur lors de l'ajout de l'admincompagnie")
      }
    })
  }
}
