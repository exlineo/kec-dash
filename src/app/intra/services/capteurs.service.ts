import { inject, Injectable, signal } from '@angular/core';
import { Firestore, collection, QuerySnapshot, query, doc, getDocs, getDoc, setDoc, where } from '@angular/fire/firestore';
import { KitI, MachineI } from './modeles';
import { UtilsService } from '../../extra/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class CapteursService {

  fire: Firestore = inject(Firestore);
  u: UtilsService = inject(UtilsService);

  kits: Array<KitI> = [];
  kit?:KitI;

  machines:Array<MachineI> = [];
  machine?:MachineI;

  capteurs = signal<Array<any>>([]);

  constructor() { this.getKits(); }

  getKits() {
    // Télécharger la liste des kits
    this.kits = [];
    getDocs(collection(this.fire, "kec-kits")).then((snap: QuerySnapshot) => {
      snap.forEach((doc) => {
        this.kits.push(doc.data() as KitI);
      });
      console.log(this.kits);
    });
    // Télécharger la liste des machines
    this.machines = [];
    getDocs(collection(this.fire, "kec-machines")).then((snap: QuerySnapshot) => {
      snap.forEach((doc) => {
        this.machines.push(doc.data() as MachineI);
      });
    });
  }
  deleteKit(id:string){

  }
  async getCapteursByKit(idKit: string, debut: number = 0, fin: number=Date.now()) {
    // ref.where("timestamp", ">=", "2017-11").where("timestamp", "<", "2017-12")
    const q = query(collection(this.fire, "kec-capteurs"),
        where("k", "==", idKit),
        where("timestamp", ">=", debut),
        where("timestamp", "<", fin));
    console.log(debut, fin);
    const snap = await getDocs(q);

    const d:any = [];
    snap.forEach((doc) => {
      d.push(doc.data());
    });
    this.capteurs.set(d); // Signaler le chargement des données des capteurs
    console.log(this.capteurs());
    // if(d.length == 0){
    //   this.u.setMsg("Données chargées", "Aucune donnée n'a été trouvée sur cette plage de temps.");
    // }else {
    //   this.u.setMsg("Données chargées", "Recueil des données des capteurs du kit");
    // }
  }
  async getCapteurByTemps(debut: number = 0, fin: number=Date.now()) {
    // ref.where("timestamp", ">=", "2017-11").where("timestamp", "<", "2017-12")
    const q = query(collection(this.fire, "kec-capteurs"), where("timestamp", ">=", debut), where("timestamp", "<", fin));
    console.log(debut, fin);
    const snap = await getDocs(q);

    const d:any = [];
    snap.forEach((doc) => {
      d.push(doc.data());
    });
    this.capteurs.set(d); // Signaler le chargement des données des capteurs
    console.log(this.capteurs());
  };
  /** Créer un nouveau kit */
  async setKit(kit: any) {
    const ref = collection(this.fire, "kec-kits");
    await setDoc(doc(ref, kit.id), kit);
  }
}
