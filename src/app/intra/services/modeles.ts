export interface KitI {
    id:string;
    idClient:string | number;
    client:string;
    adresse?:string;
    codePostal:number;
    ville:string;
    pays:string;
    creation: Date | number;
    machine?:MachineI;
    idMachine?:string;
    geo:{lat:number, lon:number};
    params:{urgence:number, programme:number};
    abonnement?: number;
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
    machine = new Machine();
    idMachine = 'josy';
    geo = {lat:43.296146466261995, lon:-0.37489563551620225};
    params = {urgence:0, programme:0};
}
export interface MachineI{
    id:string;
    marque?:string;
    amperes:number;
    volts: number;
    watts:number; // Ampères * Volts
    gaz:string; // Gaz frigorifique utilisé
    limite?: number; // Limite de fonctionnement garantie par le constructeur
    annee?: number; // Année de construction
    chaud?:number; // Puissance à chaud
    froid?:number; // Puissance à froid
}
export class Machine implements MachineI{
    id = '';
    marque = '';
    annee = 0;
    watts = 0;
    amperes = 0;
    volts = 0;
    gaz = '';
    limite = 32;
    chaud = 0;
    froid = 0;
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

enum GazE {
    R32 = 'R32',
    R40 = 'R40',
    R410A = 'R410A',
}