export class Pays{
    id?: number | null;
    constructor(
      public nom: string,
      public paysImageUrl: string
    ){
    }


    public set setImageUrl(v : string) {
        this.paysImageUrl = v;
    }

    resetProperties(){
        this.id = undefined;
        this.nom = "";
        this.paysImageUrl = "";
    }

}
