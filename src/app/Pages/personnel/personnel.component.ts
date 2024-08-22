import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Personnel} from "../../models/Personnel";
import {GlobalCrudService} from "../../services/global-crud.service";
import {ToastrService} from "ngx-toastr";
import {Poste} from "../../models/Poste";
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-personnel',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule
  ],
  templateUrl: './personnel.component.html',
  styleUrl: './personnel.component.css'
})
export class PersonnelComponent implements OnInit{
  showAddModal: boolean;
  showDeletedModal: boolean;
  showEditModal: boolean;
  personnelToAdd: Personnel;
  selectedPersonnel!: Personnel;
  personnelList: Personnel[];
  posteList: Poste[];
  nbreSalarie25_40: number;
  nbreSalarie41_60: number;
  percent25_40: string;
  percent41_60: string;

  constructor(private crudService: GlobalCrudService, private toastr: ToastrService) {
    this.showAddModal = false;
    this.showEditModal = false;
    this.showDeletedModal = false;
    this.nbreSalarie25_40 = 0;
    this.nbreSalarie41_60 = 0;
    this.percent25_40 = "";
    this.percent41_60 = "";
    this.personnelToAdd = new Personnel();
    this.personnelList = [];
    this.posteList = [];
  }

  ngOnInit(): void {
    this.recupererListeDePersonnels();

  }

  private recupererListeDePoste(){
    for (let personnel of this.personnelList) {
      let posteExist = this.posteList.find(poste => poste.nom === personnel.poste);
      console.log(posteExist)
      if (posteExist) {
        posteExist.nbre += 1;
      } else {
        this.posteList.push(new Poste(personnel.poste, 1));
      }
    }
  }

  isAddButtonClicked() {
    this.showAddModal = !this.showAddModal;
  }

  isEditButtonClicked(personnel: Personnel) {
    this.showEditModal = !this.showEditModal;
    this.selectedPersonnel = personnel;
  }

  isDeleteButtonClicked(personnel: Personnel) {
    this.showDeletedModal = !this.showDeletedModal;
    this.selectedPersonnel = personnel;
  }

  recupererListeDePersonnels(){
    this.crudService.get("personnel").subscribe({
      next: result => {
        this.personnelList = result;
        this.posteList = [];
        this.recupererListeDePoste();
        this.initializeStatAgeData();
        this.percent41_60 = ((this.nbreSalarie41_60*100)/this.personnelList.length).toString();
        this.percent25_40 = ((this.nbreSalarie25_40*100)/this.personnelList.length).toString()
      },
      error: err => {
        console.log("ERREUR VECNA AFFICHER: " + err);
      }
    })
  }

  ajouterPersonnel() {
    this.crudService.post("personnel", this.personnelToAdd).subscribe({
      next: () => {
        this.toastr.success("Personnel Embauche avec success.");
        this.isAddButtonClicked();
        this.recupererListeDePersonnels();
        this.personnelToAdd = new Personnel();
      },
      error: (err) => {
        this.toastr.error("Erreur lors de l'ajout du personnel.");
        console.log("ERREUR VECNA AJOUT: " + err);
      }
    })
  }

  modifierPersonnel(selectedPersonnel: Personnel) {
    this.crudService.update("personnel", selectedPersonnel.id!, selectedPersonnel).subscribe({
      next: () => {
        this.toastr.success("Personnel modifie avec success.");
        this.isEditButtonClicked(this.selectedPersonnel);
        this.recupererListeDePersonnels();
        this.selectedPersonnel = new Personnel();
      },
      error: (err) => {
        this.toastr.error("Erreur lors de la modification du personnel.");
        console.log("ERREUR VECNA MODIFIER: " + err);
      }
    })
  }

  supprimerPersonnel(selectedPersonnel: Personnel) {
    this.crudService.delete("personnel", selectedPersonnel.id!).subscribe({
      next: () => {
        this.toastr.error("Personnel Supprimer avec success.");
        this.isDeleteButtonClicked(selectedPersonnel);
        this.recupererListeDePersonnels();
        this.selectedPersonnel = new Personnel();
      },
      error: (err) => {
        this.toastr.error("Erreur lors de la suppression du personnel.");
        console.log("ERREUR VECNA SUPPRESSION: " + err);
      }
    })
  }

  private initializeStatAgeData() {
    const today = new Date();

    this.nbreSalarie25_40 = this.personnelList.filter(personnel => {
      const age = this.calculerAge(personnel.dateDeNaissance, today);
      return age >= 25 && age <= 40;
    }).length;

    this.nbreSalarie41_60 = this.personnelList.filter(personnel => {
      const age = this.calculerAge(personnel.dateDeNaissance, today);
      return age >= 41 && age <= 60;
    }).length;
  }

  private calculerAge(dateNaissance: Date, today: Date): number {
    if (dateNaissance != null){
      dateNaissance = new Date(dateNaissance);
      let age = today.getFullYear() - dateNaissance.getFullYear();
      const mois = today.getMonth() - dateNaissance.getMonth();

      if (mois < 0 || (mois === 0 && today.getDate() < dateNaissance.getDate())) {
        age--;
      }
      console.log(age);

      return age;
    }
    return 0;

  }

}
