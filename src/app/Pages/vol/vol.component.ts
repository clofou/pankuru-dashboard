import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {GlobalCrudService} from "../../services/global-crud.service";
import {Router} from "@angular/router";
import {Vol} from "../../models/Vol";
import {ToastrService} from "ngx-toastr";
import {Aeroport} from "../../models/Aeroport";
import {Avion} from "../../models/Avion";

@Component({
  selector: 'app-vol',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './vol.component.html',
  styleUrl: './vol.component.css'
})
export class VolComponent implements OnInit{
  volList!: Vol[];
  showAddModal!: boolean;
  showEditModal!: boolean;
  showDeletedModal!: boolean;
  selectedVol!: Vol;
  volToAdd!: Vol;
  i: number;
  aeroportList: Aeroport[];
  avionList: Avion[];

  constructor(private crudService: GlobalCrudService, private route: Router, private toastr: ToastrService) {
    this.volToAdd = new Vol();
    this.showAddModal = false;
    this.showEditModal = false;
    this.showDeletedModal = false;
    this.i = 0;
    this.aeroportList = [];
    this.avionList = [];
  }

  ngOnInit(): void {
    this.getAllVol();
    this.getListAeroport();
    this.getListAvion();
  }

  getListAeroport(){
    this.crudService.get("aeroport").subscribe({
      next: (data) => {
        this.aeroportList = data;
      },
      error: (err) => {
        console.log("ERREUR VECNA AFFICHER AEROPORT: "+ err);
      }
    })
  }

  getListAvion(){
    this.crudService.get("avion").subscribe({
      next: (data) => {
        this.avionList = data;
      },
      error: (err) => {
        console.log("ERREUR VECNA AFFICHER AVION: "+ err);
      }
    })
  }

  getAllVol(){
    this.crudService.get("vol").subscribe({
      next: (data) => {
        let allVols = data;
        console.log(data);
        this.volList = allVols;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  goToPassagerPage(vol: Vol) {
    this.route.navigate(["/pankuru/passager", vol.id]).then(r => console.log(r));
  }

  IsAddVolButtonClicked() {
    this.showAddModal = !this.showAddModal;
  }

  isEditButtonClicked(selectedVol: Vol) {
    this.showEditModal = !this.showEditModal;
    this.selectedVol = selectedVol;
  }

  modifierVol(selectedVol: Vol) {
    this.selectedVol.aeroportDepart = this.aeroportList.filter((value) => {return value.id === Number(this.selectedVol.aeroportDepart)})[0];
    this.selectedVol.aeroportDArrivee = this.aeroportList.filter((value) => {return value.id === Number(this.selectedVol.aeroportDArrivee)})[0];
    this.selectedVol.avionDepart = this.avionList.filter((value) => {return value.id === Number(this.selectedVol.avionDepart)})[0];
    if (this.selectedVol.numeroDeVol =='' || this.selectedVol.avionDepart == null || this.selectedVol.aeroportDepart == null || this.selectedVol.tarifEconomiqueDeBase == 0){
      return;
    }
    this.crudService.update("vol", this.selectedVol.id!, selectedVol).subscribe({
      next: (data) => {
        console.log(data);
        this.toastr.success("Vol Modifier avec Succees");
        this.isEditButtonClicked(selectedVol);
      },
      error: (err) => {
        let errorMessage: string = "Erreur lors de la modification de l'vol";
        console.log(err);
        this.toastr.error(errorMessage);
      }
    })
  }

  isDeleteButtonClicked(selectedVol: Vol) {
    this.showDeletedModal = !this.showDeletedModal;
    this.selectedVol = selectedVol;
  }

  supprimerVol(selectedVol: Vol) {
    this.crudService.delete("vol", selectedVol.id!).subscribe(
      {
        next: () => {
          this.toastr.error("Suppresion effectue avec success.");
          this.getAllVol();
          this.isDeleteButtonClicked(selectedVol);
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("Erreur lors de la suppression.");
        }
      }
    )
  }

  ajouterVol() {
    this.volToAdd.aeroportDepart = this.aeroportList.filter((value) => {return value.id === Number(this.volToAdd.aeroportDepart)})[0];
    this.volToAdd.aeroportDArrivee = this.aeroportList.filter((value) => {return value.id === Number(this.volToAdd.aeroportDArrivee)})[0];
    this.volToAdd.avionDepart = this.avionList.filter((value) => {return value.id === Number(this.volToAdd.avionDepart)})[0];

    console.log(this.volToAdd.aeroportList);
    if (this.volToAdd.numeroDeVol.trim() =='' || this.volToAdd.avionDepart == null || this.volToAdd.aeroportDepart == null || this.volToAdd.tarifEconomiqueDeBase == 0){
      this.toastr.error("Erreur lors de l'ajout de l'vol");
      return;
    }

    this.crudService.post("vol", this.volToAdd).subscribe({
      next: (data) => {
        console.log(this.volToAdd);
        console.log(data);
        this.toastr.success("Vol "+ this.volToAdd.numeroDeVol+ " ajouter avec succeess.")
        this.getAllVol();
        this.IsAddVolButtonClicked();
      },
      error: (err) => {
        console.log(this.volToAdd);
        console.log(err);
        this.toastr.error("Erreur lors de l'ajout de l'vol")
      }
    })
  }

  ajouterEscale() {
    let avion = new Avion();
    avion.id = this.i;
    let airport = new Aeroport();
    airport.id = this.i;

    this.volToAdd.avionList.push(avion);
    this.volToAdd.aeroportList.push(airport);
    console.log(this.volToAdd.aeroportList);
    this.i--;
  }
}
