import {ClasseSiege} from "./ClasseSiege";

export class PositionSiege {
  public id?: number;

  constructor(public nom: string, public tarif: string, public classeSiege: ClasseSiege) {
  }
}
