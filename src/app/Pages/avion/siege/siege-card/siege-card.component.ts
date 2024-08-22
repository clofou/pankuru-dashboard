import {Component, Input} from '@angular/core';
import {SiegeDTO} from "../../../../models/Siege/SiegeDTO";
import {FormsModule} from "@angular/forms";
import {GlobalCrudService} from "../../../../services/global-crud.service";
import {ToastrService} from "ngx-toastr";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-siege-card',
  standalone: true,
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './siege-card.component.html',
  styleUrl: './siege-card.component.css'
})
export class SiegeCardComponent {
  @Input() siege!: any;
  siegeIsMouseEnter: boolean = false;
  showAddModal: boolean = false;

  constructor(private crudService: GlobalCrudService, private toastr: ToastrService) {
    console.log(this.siege)
  }

  showSiegeInfo() {
    this.siegeIsMouseEnter = !this.siegeIsMouseEnter
  }

  isSiegeClicked() {
    this.showAddModal = !this.showAddModal;
  }

  modifierSiege() {
    this.crudService.update("siege", this.siege.id!, this.siege).subscribe({
      next: () => {
        this.toastr.success("SiegeDTO modifie avec Succees");
        this.isSiegeClicked();
      },
      error: (err) => {
        this.toastr.error("Erreur lors de la moodification");
        console.log(err);
      }
    })
  }
}
