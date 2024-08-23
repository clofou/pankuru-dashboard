import {Siege} from "./Siege/Siege";
import {Reservation} from "./Reservation";

export class Passager {
  public id?: number;

  constructor(
    public nom: string = "",
    public prenom: string = "",
    public numeroDePassPort = "",
    public numeroDeVisa = "",
    public siege: Siege = new Siege(),
    public reservation: Reservation = new Reservation()

  ) {}


}
