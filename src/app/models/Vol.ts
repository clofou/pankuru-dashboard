import {Aeroport} from "./Aeroport";
import {Avion} from "./Avion";

export class Vol{
  public id?: number;

  constructor(
    public numeroDeVol: string = "",
    public aeroportDepart: Aeroport = new Aeroport(),
    public aeroportDArrivee: Aeroport =  new Aeroport(),
    public dateEtHeureArrivee: Date = new Date(),
    public dateEtHeureDepart: Date = new Date(),
    public tarifEconomiqueDeBase: number = 0,
    public avionDepart: Avion = new Avion(),
    public avionList: Avion[] = [],
    public aeroportList: Aeroport[] = []
  ) {}

}
