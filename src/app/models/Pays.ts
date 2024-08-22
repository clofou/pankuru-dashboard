export class Pays{
    id?: number | null;

    constructor(
      public nom: string = "",
      public paysImageUrl: string = "",
    ){}


    resetProperties(){
        this.id = undefined;
        this.nom = "";
        this.paysImageUrl = "";
    }

}
