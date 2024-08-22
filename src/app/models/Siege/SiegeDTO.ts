import {Avion} from "../Avion";

export class SiegeDTO {
  constructor(
    public numeroSiege: string,
    public classeSiege: string,
    public positionSiege: string,
    public tarif: number,
    public avion: Avion
  ) {}
}
