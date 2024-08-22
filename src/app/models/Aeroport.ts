import {Ville} from "./Ville";

export class Aeroport{
  id?: number;

  constructor(
    public nom: string = "",
    public codeIATA: string = "",
    public longitude: number,
    public latitude: number,
    public altitude: number,
    public capaciteParking: number = 0,
    public nombreDePistes: number = 0,
    public ville: Ville,
  ) {}
}


