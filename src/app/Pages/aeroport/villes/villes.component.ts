import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Ville} from "../../../models/Ville";
import {GlobalCrudService} from "../../../services/global-crud.service";
import {ToastrService} from "ngx-toastr";
import {FormsModule} from "@angular/forms";
import {VilleCardComponent} from "./ville-card/ville-card.component";
import {Pays} from "../../../models/Pays";

@Component({
  selector: 'app-villes',
  standalone: true,
  imports: [
    FormsModule,
    VilleCardComponent
  ],
  templateUrl: './villes.component.html',
  styleUrl: './villes.component.css'
})
export class VillesComponent implements OnInit{
  idPays!: number | null;
  villeList!: Ville[];
  villeToAdd!: Ville;
  selectedVille!: Ville;
  showAddModal: boolean;
  showDeletedModal: boolean;
  showEditModal: boolean;

  constructor(
    private crudService: GlobalCrudService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private route1: Router)
  {
    this.showAddModal = false;
    this.showDeletedModal = false;
    this.showEditModal = false;
    console.log("hello");
  }

  ngOnInit(): void {
    this.idPays = Number(this.route.snapshot.paramMap.get('id'));
    this.villeToAdd = new Ville("", new Pays("", ""));
    this.getListVilles();
  }

  getListVilles(){
    console.log("HIIII");
    this.crudService.get("ville").subscribe({
      next: (data) => {
        console.log(data);
        this.villeList = data.filter(((value: { pays: { id: number | null; }; }) => {
          return value.pays.id === this.idPays;
        }));
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  ajouterVille() {
    console.log(this.villeToAdd);
    let pays: Pays = new Pays("", "");
    pays.id = this.idPays;
    this.villeToAdd.pays = pays;
    this.crudService.post("ville", this.villeToAdd).subscribe(

      {
        next: () => {
          this.toastr.success("Ville ajoute avec success")
          this.getListVilles();
          this.isAddButttonClicked();
          this.villeToAdd.resetProperties();
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  supprimerVille(selectedVille: Ville) {
    this.crudService.delete("ville", selectedVille.id!).subscribe(
      {
        next: () => {
          this.getListVilles();
          this.selectedVille.resetProperties();
          this.toastr.error("Ville Supprimer")
          this.isDeleteButtonClicked(selectedVille);
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }
  modifierVille(selectedVille: Ville) {
    this.crudService.update("ville", selectedVille.id!, selectedVille).subscribe(
      {
        next: () => {
          this.toastr.success("Ville Modifier avec Success");
          this.isEditButtonClicked(selectedVille);
          this.selectedVille.resetProperties();
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  protected isAddButttonClicked() {
    this.showAddModal = !this.showAddModal;
    console.log("dd" + this.showAddModal);
  }
  protected isDeleteButtonClicked(ville: Ville){
    this.selectedVille = ville;
    this.showDeletedModal = !this.showDeletedModal;
  }

  protected isEditButtonClicked(ville: Ville) {
    this.selectedVille = ville
    this.showEditModal = !this.showEditModal;
  }

  navigateBack() {
    this.route1.navigate(["/pankuru/aeroport"]);
    console.log("hhdjdj");
  }
}
