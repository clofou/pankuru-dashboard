import {SiegeDisponibilite} from "../Enum/SiegeDisponibilite";
import {PositionSiege} from "./PositionSiege";
import {Avion} from "../Avion";

export class Siege {
  public id?: number;

  constructor(
    public numero: string = "",
    public disponibilite: SiegeDisponibilite = SiegeDisponibilite.OUI,
    public positionSiege: PositionSiege = new PositionSiege(),
    public avion: Avion = new Avion()
  ) {}
}
