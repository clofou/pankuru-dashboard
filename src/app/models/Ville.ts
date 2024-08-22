import {Pays} from "./Pays";

export class Ville{
  id?: number;

  constructor(
    public nom: string,
    public pays: Pays
  ) {}

  resetProperties(){
    this.id = undefined;
    this.nom = "";
  }
}
