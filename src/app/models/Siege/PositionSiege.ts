import {ClasseSiege} from "./ClasseSiege";

export class PositionSiege {
  public id?: number;

  constructor(
    public nom: string = "",
    public tarif: number = 0,
    public classeSiege: ClasseSiege = new ClasseSiege()
  ) {}
}
