import { Component, OnInit } from '@angular/core';
import { Pays } from '../../../models/Pays';
import { GlobalCrudService } from '../../../services/global-crud.service';
import { PaysCardComponent } from '../../Utils/pays-card/pays-card.component';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pays',
  standalone: true,
  imports: [
    PaysCardComponent,
    FormsModule,

  ],
  templateUrl: './pays.component.html',
  styleUrl: './pays.component.css'
})
export class PaysComponent implements OnInit {
  paysList!: Pays[];
  paysToAdd!: Pays;
  paysSelected!: Pays;
  showModal: boolean;
  showDeleteModal: boolean;
  showAddModal: boolean;

  constructor(private crudService: GlobalCrudService, private toastr: ToastrService, private route: Router) {
    this.paysToAdd = new Pays("", "");
    this.showModal = false;
    this.showDeleteModal = false;
    this.showAddModal = false;
  }

  ngOnInit(): void {
    this.getAllPays();
    this.getAllVilles();
    this.getAllAeroport();
  }

  ajouterPays() {
    this.crudService.post("pays", this.paysToAdd).subscribe(
      {
        next: () => {
          this.toastr.success("Pays ajoute avec success")
          this.getAllPays();
          this.isAddButttonClicked();
          this.paysToAdd.resetProperties;
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  supprimerPays(selectedPays: Pays) {
    this.crudService.delete("pays", selectedPays.id!).subscribe(
      {
        next: () => {
          this.getAllPays();
          this.paysSelected.resetProperties;
          this.isDeleteButtonClicked(selectedPays);
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }
  goToVilles(idPays: number) {
    this.route.navigate(["/pankuru/ville", idPays])
  }

  isEditButtonClicked(pay: Pays) {
    this.showModal = !this.showModal;
    this.paysSelected = pay;
  }

  isDeleteButtonClicked(pay: Pays) {
    this.showDeleteModal = !this.showDeleteModal;
    this.paysSelected = pay;
  }
  isAddButttonClicked() {
    this.showAddModal = !this.showAddModal;
  }

  modifierPays(selectedPays: Pays) {
    this.crudService.update("pays", selectedPays.id!, selectedPays).subscribe(
      {
        next: () => {
          this.toastr.success("Pays Modifier avec Success"),
            this.isEditButtonClicked(selectedPays);
          this.paysSelected.resetProperties;
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  getAllPays() {
    this.crudService.get("pays").subscribe(
      {
        next: (data) => {
          this.paysList = data;
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }
  getAllVilles() {
    if (localStorage.getItem("villesList") == null) {
      this.crudService.get("ville").subscribe({
        next: (data) => {
          localStorage.setItem("villesList", JSON.stringify(data));
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }
  getAllAeroport() {

    if (localStorage.getItem("aeroportList") == null) {
      this.crudService.get("aeroport").subscribe({
        next: (data) => {
          localStorage.setItem("aeroportList", JSON.stringify(data));
        },
        error: (err) => {
          console.log(err)
        }
      })
    }

  }

}
