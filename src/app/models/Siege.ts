import {Avion} from "./Avion";

export class Siege {
  id?: number;
  disponibilite?: boolean;

  constructor(
    public numeroSiege: string,
    public classeSiege: string,
    public positionSiege: string,
    public tarif: number,
    public avion: Avion
  ) {}
}
