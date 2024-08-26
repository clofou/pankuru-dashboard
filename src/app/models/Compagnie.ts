export class Compagnie {
  public id?: number;

  constructor(
    public matricule: string = "",
    public nom: string = "",
    public logoUrl: string = "",
    public codeIATA: number = 0,
    public codeICAO: string = "",
    public numeroTelephone: string = "",
    public email: string = "",
    public siteWeb: string = "",
    public numeroLicence: string = "",
    public locked: boolean = false,
  ) {
  }
}
