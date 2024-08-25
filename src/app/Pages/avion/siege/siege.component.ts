import {Component, OnInit} from '@angular/core';
import {GlobalCrudService} from "../../../services/global-crud.service";
import {SiegeDTO} from "../../../models/Siege/SiegeDTO";
import {Avion} from "../../../models/Avion";
import {ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SiegeCardComponent} from "./siege-card/siege-card.component";
import {Siege} from "../../../models/Siege/Siege";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-siege',
  standalone: true,
  imports: [
    FormsModule,
    SiegeCardComponent,
  ],
  templateUrl: './siege.component.html',
  styleUrl: './siege.component.css'
})
export class SiegeComponent implements OnInit{
  info!: {
    "tete"  : {"nbreDeLigne": number, "placeParColonne": number[]},
    "corps" : {"nbreDeLigne": number, "placeParColonne": number[]},
    "queue" : {"nbreDeLigne": number, "placeParColonne": number[]}
  };
  errorMessage!: string;
  numeroPlace = 1;
  tarifAffaire!: number;
  avion!: Avion;
  tarifEconomique!: number;
  siegeList: Siege[] = [];
  siegeFormater: any = [];
  idAvion!: number;
  nlCorps: number; nlTete: number; nlQueue: number;
  c1: number;c2: number; c3: number;
  t1: number; t2: number; t3: number;
  q1: number; q2: number; q3: number;
  showDestructionPopup: boolean = false;
  nbrOfSiege1 = 0;

  constructor(private crudService: GlobalCrudService, private route: ActivatedRoute, private toastr: ToastrService) {

    this.errorMessage = "";
    [this.nlCorps, this.nlTete, this.nlQueue, this.c1, this.c2, this.c3, this.t1, this.t2, this.t3, this.q1, this.q2, this.q3] = [0,0,0,0,0,0,0,0,0,0,0,0];
    this.info = {
      "tete": {
        "nbreDeLigne": this.nlTete,
        "placeParColonne": [this.t1, this.t2, this.t3]
      },
      "corps": {
        "nbreDeLigne": this.nlCorps,
        "placeParColonne": [this.c1, this.c2 , this.c3]
      },
      "queue": {
        "nbreDeLigne": this.nlQueue,
        "placeParColonne": [this.q1, this.q2, this.q3],
      }
    }

    this.tarifEconomique = 25;
    this.tarifAffaire = 75;
    this.avion = new Avion();
    this.avion.id = 1;
  }

  ngOnInit() {
    //this.genererSiege();
    this.idAvion = Number(this.route.snapshot.paramMap.get('id'));
    this.recupererListeDesSieges();
  }


  recupererListeDesSieges(){
    this.crudService.get("siege").subscribe({
      next: (data) => {
        this.siegeList = data.filter((value: { avion: { id: number; }; }) => {
          return value.avion.id === this.idAvion;
        });
        console.log(this.siegeList);
        if (this.siegeList.length != 0){
          this.siegeFormater = this.trierParNumero(this.siegeList);
        }

      },
      error: (err) => {
        console.log("ERREUR VECNA AFFICHE SIEGE: " + err);
      }
    })
  }

  trierParNumero(data: Siege[]) {
    // Fonction de tri personnalisée pour trier par chiffre
    let siegeTrier: Siege[] = data.sort((a, b) => {
      const chiffreA = parseInt(a.numero.slice(1));
      const chiffreB = parseInt(b.numero.slice(1));

      // Comparaison par chiffre (ex: 1, 2, 3...)
      return chiffreA - chiffreB;
    });

    let siegeDoublementTrier: Siege[][][] = [
      [[], [], []],
      [[], [], []],
      [[], [], []]
    ];

    for(let siege of siegeTrier) {
      console.log(siege.numero[0]);

      switch (siege.numero[0]) {
        case 'A':
          siegeDoublementTrier[0][0].push(siege);
          break;
        case 'B':
          siegeDoublementTrier[0][1].push(siege);
          break;
        case 'C':
          siegeDoublementTrier[0][2].push(siege);
          break;
        case 'D':
          siegeDoublementTrier[1][0].push(siege);
          break;
        case 'E':
          siegeDoublementTrier[1][1].push(siege);
          break;
        case 'F':
          siegeDoublementTrier[1][2].push(siege);
          break;
        case 'G':
          siegeDoublementTrier[2][0].push(siege);
          break;
        case 'H':
          siegeDoublementTrier[2][1].push(siege);
          break;
        case 'I':
          siegeDoublementTrier[2][2].push(siege);
          break;
      }
    }

    return siegeDoublementTrier;
  }


  genererSiege(){
    this.nbrOfSiege1 = 0;
    this.info = {
      "tete": {
        "nbreDeLigne": this.nlTete,
        "placeParColonne": [this.t1, this.t2, this.t3]
      },
      "corps": {
        "nbreDeLigne": this.nlCorps,
        "placeParColonne": [this.c1, this.c2 , this.c3]
      },
      "queue": {
        "nbreDeLigne": this.nlQueue,
        "placeParColonne": [this.q1, this.q2, this.q3],
      }
    }

    if (this.info.tete.nbreDeLigne != 0){

      for (let i=1; i<=this.info.tete.nbreDeLigne; i++){
        let compteur = 1
        for (let j of this.info.tete.placeParColonne){
          let lettre = "A";
          switch (compteur) {
            case 2: lettre = "B"; break;
            case 3: lettre = "C"; break;
          }
          this.enregistrerSiege(j, lettre, compteur, "AFFAIRE")
          compteur++;
        }
      }

    }

    if (this.info.corps.nbreDeLigne != 0){

      for (let i=1; i<=this.info.corps.nbreDeLigne; i++){
        let compteur = 1
        for (let j of this.info.corps.placeParColonne){
          let lettre = "D";
          switch (compteur) {
            case 2: lettre = "E"; break;
            case 3: lettre = "F"; break;
          }
          this.enregistrerSiege(j, lettre, compteur, "ECONOMIQUE");
          compteur++;
        }
      }

    }

    if (this.info.queue.nbreDeLigne != 0){

      for (let i=1; i<=this.info.queue.nbreDeLigne; i++){
        let compteur = 1
        for (let j of this.info.queue.placeParColonne){
          let lettre = "G";
          switch (compteur) {
            case 2: lettre = "H"; break;
            case 3: lettre = "I"; break;
          }
          this.enregistrerSiege(j, lettre, compteur, "ECONOMIQUE")
          compteur++;
        }
      }
    }
    if (this.errorMessage == ""){
    }
  };

  enregistrerSiege(j: number, lettre: string, compteur: number, classe: string){
    let position = "GAUCHE"
    switch (compteur) {
      case 2: position = "MILEU"; break;
      case 3: position = "DROITE"; break;
    }
    for (let k= 1; k<= j; k++){
      let siege: SiegeDTO = new SiegeDTO(lettre+this.numeroPlace.toString(), classe, position, this.tarifEconomique, this.avion);
      this.crudService.post("siege", siege).subscribe({
        next: () => {
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = "err"
        },
        complete: () => {
          this.nbrOfSiege1++;
          let total: number =
            this.info.tete.nbreDeLigne*(this.info.tete.placeParColonne[0]+this.info.tete.placeParColonne[1]+this.info.tete.placeParColonne[2]) +
            this.info.corps.nbreDeLigne*(this.info.corps.placeParColonne[0]+this.info.corps.placeParColonne[1]+this.info.corps.placeParColonne[2])+
            this.info.queue.nbreDeLigne*(this.info.queue.placeParColonne[0]+this.info.queue.placeParColonne[1]+this.info.queue.placeParColonne[2]);

          console.log(total);
          console.log(this.nbrOfSiege1);
          if (this.nbrOfSiege1 === total){
            this.recupererListeDesSieges();
            this.toastr.success("Toutes les Sieges ont etes GENEREES");
          }
        }
      })
      this.numeroPlace++;
    }
  }

  detruireSiege() {
    let nbrOfSiege = 0;
    console.log(this.siegeList.length);
    for(let siege of this.siegeList){
      this.crudService.delete("siege", siege.id!).subscribe({
        next: () => {},
        error: (err) => {
          this.toastr.error("Erreur lors de la suppression des sieges");
          console.log(err);
        },
        complete: () => {
          nbrOfSiege++;
          console.log(nbrOfSiege);
          if (nbrOfSiege === this.siegeList.length){
            this.recupererListeDesSieges();
            this.closePopup();
            this.toastr.error("Toutes les Sieges ont etes Supprimes");
          }
        }
      })
    }

  }

  closePopup() {
    this.showDestructionPopup = !this.showDestructionPopup;
  }
}
