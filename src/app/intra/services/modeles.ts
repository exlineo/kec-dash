export interface KitI {
    id:string;
    idClient:string | number;
    client:string;
    adresse:string;
    codePostal:number;
    ville:string;
    pays:string;
    creation: Date | number;
    geo:{lat:number, lon:number};
}
export class Kit implements KitI {
    id = '';
    idClient = '';
    client = '';
    adresse = '';
    codePostal = 64000;
    ville = '';
    pays = 'France';
    creation = Date.now();
    geo = {lat:43.296146466261995, lon:-0.37489563551620225};
}
export interface CaptI {
    id:string;
    m:string;
    timestamp: number;
    duree:number;
    t_machine:number;
    t_ambiante:number;
    h_ambiante:number;
    vibrations:number;
    hall:number;
    h2o:number;
}