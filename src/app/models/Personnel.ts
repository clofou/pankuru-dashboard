export class Personnel {
  public id?: number;

  constructor(
    public nom: string = "",
    public prenom: string = "",
    public email: string = "",
    public numeroDeTelephone: string = "",
    public password: string = "0000",
    public addresse: string = "",
    public dateEmbauche: Date = new Date(),
    public dateDeNaissance: Date = new Date(),
    public poste: string = "",
    public enService: boolean = false,
  ) {}
}
