export class Pays{
    id?: number;
    paysImageUrl?: string;
    constructor(public nom: string, paysImage: string){
        this.paysImageUrl = paysImage;
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