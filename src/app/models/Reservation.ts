import {StatutReservation} from "./Enum/StatutReservation";
import {Vol} from "./Vol";

export class Reservation {
  public id?: number;

  constructor(
    public dateReservation: string = "" ,
    public nombreDepassager: number = 1,
    public statut: StatutReservation = StatutReservation.EN_ATTENTE,
    public dateAnnulation: string = "",
    public raisonAnnulation: string = "",
    public vol: Vol = new Vol()
  ) {}
}
