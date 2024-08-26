import {Compagnie} from "./Compagnie";

export class SuperAdmin {
  public id?: number;

  constructor(
    public nom: string = "",
    public prenom: string = "",
    public email: string = "",
    public numeroDeTelephone: string = "",
    public password: string = "0000",
    public addresse: string = "",
    public dateDeNaissance: Date = new Date()
  ) {}
}
