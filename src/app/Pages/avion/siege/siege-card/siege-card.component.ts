import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {GlobalCrudService} from "../../../../services/global-crud.service";
import {ToastrService} from "ngx-toastr";
import {NgClass} from "@angular/common";
import {Siege} from "../../../../models/Siege/Siege";

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
  @Input() siege!: Siege;
  siegeIsMouseEnter: boolean = false;
  showAddModal: boolean = false;

  constructor(private crudService: GlobalCrudService, private toastr: ToastrService) {
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
