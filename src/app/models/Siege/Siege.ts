import {SiegeDisponibilite} from "../Enum/SiegeDisponibilite";
import {PositionSiege} from "./PositionSiege";
import {Avion} from "../Avion";

export class Siege {
  public id?: number;

  constructor(public numero: string, public disponibilite: SiegeDisponibilite, public positionSiege: PositionSiege, public avion: Avion ) {
  }
}
