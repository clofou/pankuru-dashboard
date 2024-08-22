import { Component, OnInit } from '@angular/core';
import { Pays } from '../../../models/Pays';
import { GlobalCrudService } from '../../../services/global-crud.service';
import { PaysCardComponent } from './pays-card/pays-card.component';
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
  }

  isAddButttonClicked() {
    this.showAddModal = !this.showAddModal;
  }
  isEditButtonClicked(pay: Pays) {
    this.showModal = !this.showModal;
    this.paysSelected = pay;
  }
  isDeleteButtonClicked(pay: Pays) {
    this.showDeleteModal = !this.showDeleteModal;
    console.log(this.showDeleteModal);
    this.paysSelected = pay;
  }


  ajouterPays() {
    this.crudService.post("pays", this.paysToAdd).subscribe(
      {
        next: () => {
          this.toastr.success("Pays ajoute avec success")
          this.getAllPays();
          this.isAddButttonClicked();
          this.paysToAdd.resetProperties();
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }
  modifierPays(selectedPays: Pays) {
    this.crudService.update("pays", selectedPays.id!, selectedPays).subscribe(
      {
        next: () => {
          this.toastr.success("Pays Modifier avec Success");
          this.isEditButtonClicked(selectedPays);
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
          this.isDeleteButtonClicked(selectedPays);
          console.log("DELETE");
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

  goToVilles(idPays: number) {
    this.route.navigate(["/pankuru/ville", idPays]).then(r => console.log(r));
  }

}
