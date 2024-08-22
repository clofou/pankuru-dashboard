enum StatutAvion {
  DISPONIBLE = "DISPONIBLE",
  MAINTENANCE = "MAINTENANCE",
  OCCUPE = "OCCUPE"
}

export class Avion{

  id?: number;

  constructor(
    public matricule: string = "",
    public nom: string = "",
    public capaciteTotale: number = 0,
    public statut: StatutAvion = StatutAvion.DISPONIBLE,
  ) {}
}
