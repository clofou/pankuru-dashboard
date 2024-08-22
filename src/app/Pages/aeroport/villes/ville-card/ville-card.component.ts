import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ville} from "../../../../models/Ville";
import {Aeroport} from "../../../../models/Aeroport";
import {FormsModule} from "@angular/forms";
import {GlobalCrudService} from "../../../../services/global-crud.service";
import {ToastrService} from "ngx-toastr";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-ville-card',
  standalone: true,
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './ville-card.component.html',
  styleUrl: './ville-card.component.css'
})
export class VilleCardComponent implements OnInit{
  @Input() ville!: Ville;
  @Output() isVilleEditListener = new EventEmitter()
  @Output() isVilleDeleteListener = new EventEmitter();

  isClick: boolean = false;
  aeroportList!: Aeroport[];
  showAddModal: boolean = false;
  showEditModal: boolean = false;
  showDeleteModal: boolean = false;
  selectedAeroport!: Aeroport;
  aeroportToAdd!: Aeroport;

  constructor(private crudService: GlobalCrudService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.aeroportToAdd = new Aeroport("", "", 0, 0, 0, 0, 0, this.ville)
    this.getAeroportList();
  }

  getAeroportList(){
    this.crudService.get("aeroport").subscribe({
      next: (data) => {
        this.aeroportList = data.filter((value: { ville: { id: number | undefined; }; }) => {
          return value.ville.id === this.ville.id;
        })
      },
      error: (err) => {
        console.log(err)
      }
    })

  }

  isPlierDeplier() {
    this.isClick = !this.isClick;
  }

  isDeleteButtonClicked(item: Aeroport) {
    this.showDeleteModal = !this.showDeleteModal;
    this.selectedAeroport = item;
  }
  isAddButttonClicked() {
    this.showAddModal = !this.showAddModal;
  }
  isEditButttonClicked(item: Aeroport) {
    this.showEditModal = !this.showEditModal;
    this.selectedAeroport = item;
  }

  ajouterAeroport(): void {
    if (this.aeroportToAdd.nom != "" && this.aeroportToAdd.ville.id != undefined){
      console.log(this.aeroportToAdd.ville.id);
      this.crudService.post("aeroport", this.aeroportToAdd).subscribe({
        next: () => {
          this.isAddButttonClicked();
          this.toastr.success("Aéroport modifier avec succès", "Success");
          this.getAeroportList();
        },
        error: (err) => {
          console.error("Erreur lors de la mise à jour de l'aéroport: ", err);
        }
      });
    }

  }
  modifierAeroport(aeroport: Aeroport): void {
    this.crudService.update("aeroport",this.selectedAeroport.id!, this.selectedAeroport).subscribe({
      next: () => {
        this.isEditButttonClicked(aeroport);
        this.toastr.success("Aéroport modifier avec succès", "Success");
        this.getAeroportList();
      },
      error: (err) => {
        console.error("Erreur lors de la mise à jour de l'aéroport: ", err);
      }
    });
  }
  supprimerAeroport(aeroport: Aeroport): void {
    this.crudService.delete("aeroport", aeroport.id!).subscribe({
      next: () => {
        this.toastr.error("Aéroport supprimer avec succès", "Fermer");
        this.getAeroportList(); // Mettre à jour la liste des aéroports après suppression
        this.isDeleteButtonClicked(aeroport);
      },
      error: (err) => {
        console.error("Erreur lors de la suppression de l'aéroports: ", err);
      }
    });
  }


  isDeleteVilleButtonClicked(ville: Ville) {
    this.isVilleDeleteListener.emit(ville)
  }
  isEditVilleButttonClicked(ville: Ville) {
    this.isVilleEditListener.emit(ville)
  }

}
