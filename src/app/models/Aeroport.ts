import {Ville} from "./Ville";

export class Aeroport{
  id?: number;

  constructor(
    public nom: string = "",
    public codeIATA: string = "",
    public longitude: number = 0,
    public latitude: number = 0,
    public altitude: number = 0,
    public capaciteParking: number = 0,
    public nombreDePistes: number = 0,
    public ville: Ville = new Ville(),
  ) {}
}


