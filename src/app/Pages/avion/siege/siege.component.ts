import {Component, OnInit} from '@angular/core';
import {GlobalCrudService} from "../../../services/global-crud.service";
import {SiegeDTO} from "../../../models/Siege/SiegeDTO";
import {Avion} from "../../../models/Avion";
import {ActivatedRoute} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SiegeCardComponent} from "./siege-card/siege-card.component";
import {Siege} from "../../../models/Siege/Siege";
import {SiegeDisponibilite} from "../../../models/Enum/SiegeDisponibilite";

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

  ngOnInit() {
    //this.genererSiege();
    this.idAvion = Number(this.route.snapshot.paramMap.get('id'));
    this.recupererListeDesSieges();

  }

  errorMessage!: string;
  numeroPlace = 1;
  tarifAffaire!: number;
  avion!: Avion;
  tarifEconomique!: number;
  siegeList: any = [];
  idAvion!: number;
  nlCorps: number = 0;
  nlTete: number = 0;
  nlQueue: number = 0;
  c1: number = 0;
  c2: number = 0;
  c3: number = 0;
  t1: number = 0;
  t2: number = 0;
  t3: number = 0;
  q1: number = 0;
  q2: number = 0;
  q3: number = 0;
  showDestructionPopup: boolean = false;

  constructor(private crudService: GlobalCrudService, private route: ActivatedRoute) {

    this.errorMessage = "";
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

    this.tarifEconomique = 2000;
    this.tarifAffaire = 8000
    this.avion = new Avion();
    this.avion.id = 1;
  }

  recupererListeDesSieges(){
    this.crudService.get("siege").subscribe({
      next: (data) => {
        this.siegeList = data.filter((value: { avion: { id: number; }; }) => {
          return value.avion.id === this.idAvion;
        });
        if (this.siegeList.length != 0){
          console.log(this.trierParNumero(this.siegeList));
        }

      },
      error: (err) => {
        console.log("ERREUR VECNA AFFICHE SIEGE: " + err);
      }
    })
  }

  trierParNumero(data: Siege[]) {
    // Fonction de tri personnalisée pour trier par lettre puis par chiffre
    return data.sort((a, b) => {
      const [lettreA, chiffreA] = [a.numero[0], parseInt(a.numero.slice(1))];
      const [lettreB, chiffreB] = [b.numero[0], parseInt(b.numero.slice(1))];

      // Comparaison par lettre (ex: A, B, C...)
      if (lettreA !== lettreB) {
        return lettreA.localeCompare(lettreB);
      }

      // Comparaison par chiffre (ex: 1, 2, 3...)
      return chiffreA - chiffreB;
    });
  }


  genererSiege(){
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
          let lettre;
          let position = "";
          if (compteur === 1){
            lettre = "A";
            position = "GAUCHE";
          }
          if (compteur === 2){
            lettre = "B";
            position = "MILIEU";
          }
          if (compteur === 3){
            lettre = "C";
            position = "DROITE";
          }
          for (let k= 1; k<= j; k++){
            let siege: SiegeDTO = new SiegeDTO(lettre+this.numeroPlace.toString(), "AFFAIRE", position, this.tarifEconomique, this.avion);
            this.crudService.post("siege", siege).subscribe({
              next: () => {
              },
              error: (err) => {
                console.log(err);
              }
            })
            this.numeroPlace++;
          }
          compteur++;
        }
      }

    }

    if (this.info.corps.nbreDeLigne != 0){

      for (let i=1; i<=this.info.corps.nbreDeLigne; i++){
        let compteur = 1
        for (let j of this.info.corps.placeParColonne){
          let lettre;
          let position = "";
          if (compteur === 1){
            lettre = "D";
            position = "GAUCHE";
          }
          if (compteur === 2){
            lettre = "E";
            position = "MILIEU";
          }
          if (compteur === 3){
            lettre = "F"
            position = "DROITE";
          }
          for (let k= 1; k<= j; k++){
            let siege: SiegeDTO = new SiegeDTO(lettre+this.numeroPlace.toString(), "ECONOMIQUE", position, this.tarifEconomique, this.avion);
            this.crudService.post("siege", siege).subscribe({
              next: () => {
              },
              error: (err) => {
                console.log(err);
              }
            })
            this.numeroPlace++;
          }
          compteur++;
        }
      }

    }

    if (this.info.queue.nbreDeLigne != 0){

      for (let i=1; i<=this.info.queue.nbreDeLigne; i++){
        let compteur = 1
        for (let j of this.info.queue.placeParColonne){
          let lettre;
          let position = "";
          if (compteur === 1){
            lettre = "G";
            position = "GAUCHE";
          }
          if (compteur === 2){
            lettre = "H";
            position = "MILIEU";
          }
          if (compteur === 3){
            lettre = "I"
            position = "DROITE";
          }
          for (let k= 1; k<= j; k++){
            let siege: SiegeDTO = new SiegeDTO(lettre+this.numeroPlace.toString(), "ECONOMIQUE", position, this.tarifEconomique, this.avion);
            this.crudService.post("siege", siege).subscribe({
              next: () => {
              },
              error: (err) => {
                console.log(err);
              }
            })
            this.numeroPlace++;
          }
          compteur++;
        }
      }

    }
    this.recupererListeDesSieges();
  };

  enresgistrerSiege(j: number, lettre: string, position: string, classe: string){

  }

  reorganiserSieges(sieges: any[]) {
    const result: any = {
      tete: [],
      corps: [],
      queue: []
    };

    const sections = [
      { section: "tete", lettreDebut: "A", lettreFin: "C", places: this.info.tete.placeParColonne },
      { section: "corps", lettreDebut: "D", lettreFin: "F", places: this.info.corps.placeParColonne },
      { section: "queue", lettreDebut: "G", lettreFin: "I", places: this.info.queue.placeParColonne }
    ];

    sections.forEach(({ section, lettreDebut, lettreFin, places }) => {
      const siegesSection = sieges.filter(siege => siege.numero.charAt(0) >= lettreDebut && siege.numero.charAt(0) <= lettreFin);
      let compteur = 0;
      let ligneC: any = [];

      siegesSection.forEach((siege, index) => {
        ligneC.push(siege);

        // Si la ligne est complète, on l'ajoute au résultat et on réinitialise
        if (ligneC.length === places[compteur]) {
          result[section].push(ligneC);
          ligneC = [];
          compteur = (compteur + 1) % places.length; // Passer à la colonne suivante
        }
      });

      // Ajouter la dernière ligne si elle n'est pas vide
      if (ligneC.length > 0) {
        result[section].push(ligneC);
      }
    });

    return result;
  }

  trierSiegesParNumero(sieges: any[]) {
    return sieges.sort((a, b) => {
      // Extraire les chiffres des numéros de siège
      const chiffreA = parseInt(a.numero.match(/\d+/)[0], 10);
      const chiffreB = parseInt(b.numero.match(/\d+/)[0], 10);

      // Comparer les chiffres
      return chiffreA - chiffreB;
    });
  }

  detruireSiege() {
    for (let siege of this.siegeList){
      this.crudService.delete("siege", siege.id!).subscribe({
        next: () => {

        },
        error: (err) => {
          console.log("Erreur lors de la suppression des sieges" + err);

        }
      })
    }
    this.closePopup();
    this.recupererListeDesSieges();
  }

  closePopup() {
    this.showDestructionPopup = !this.showDestructionPopup;
  }

  transformerSieges(sections: any): any {
    function groupSeatsByRow(seats:any[], columnsPerRow:any) {
      const result = [];
      for (let i = 0; i < seats.length; i += columnsPerRow) {
        const row = seats.slice(i, i + columnsPerRow);
        const formattedRow = row.map((seat, index) => seat ? [seat] : []);
        result.push(formattedRow);
      }
      return result;
    }

    function processSection(section:any[], columnsPerRow:any) {
      const seats = section.flatMap(row => row);
      const placeParColonne = groupSeatsByRow(seats, columnsPerRow);
      return {
        nbreDeLigne: placeParColonne.length,
        placeParColonne: placeParColonne
      };
    }

    const tete = processSection(sections.tete, 3); // 3 colonnes par ligne pour 'tete'
    const corps = processSection(sections.corps, 3); // 3 colonnes par ligne pour 'corps'
    const queue = processSection(sections.queue, 3); // 3 colonnes par ligne pour 'queue'

    return { tete, corps, queue };
  }
}
