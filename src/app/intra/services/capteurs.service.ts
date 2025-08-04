import { inject, Injectable, signal } from '@angular/core';
import { Firestore, collection, QuerySnapshot, query, doc, getDocs, getDoc, setDoc, where, deleteDoc } from '@angular/fire/firestore';
import { KitI, MachineI } from './modeles';
import { UtilsService } from '../../extra/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class CapteursService {

  fire: Firestore = inject(Firestore);
  u: UtilsService = inject(UtilsService);

  kits: Array<KitI> = [];
  kit?: KitI;

  machines: Array<MachineI> = [];
  machine?: MachineI;

  capteurs = signal<Array<any>>([]);

  constructor() { this.getKits(); }
  /** Obtenir la liste des kits disponibles */
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

  async getCapteursByKit(idKit: string, debut: number = 0, fin: number = Date.now()) {
    // ref.where("timestamp", ">=", "2017-11").where("timestamp", "<", "2017-12")
    const q = query(collection(this.fire, "kec-capteurs"),
      where("k", "==", idKit),
      where("timestamp", ">=", debut),
      where("timestamp", "<", fin));
    console.log(debut, fin);
    const snap = await getDocs(q);

    const d: any = [];
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
  async getCapteurByTemps(debut: number = 0, fin: number = Date.now()) {
    // ref.where("timestamp", ">=", "2017-11").where("timestamp", "<", "2017-12")
    const q = query(collection(this.fire, "kec-capteurs"), where("timestamp", ">=", debut), where("timestamp", "<", fin));
    console.log(debut, fin);
    const snap = await getDocs(q);

    const d: any = [];
    snap.forEach((doc) => {
      d.push(doc.data());
    });
    this.capteurs.set(d); // Signaler le chargement des données des capteurs
    console.log(this.capteurs());
  };
  /** Créer un nouveau kit */
  async setKit(kit: KitI) {
    const ref = collection(this.fire, "kec-kits");
    await setDoc(doc(ref, kit.id), kit).then(() => this.u.setMsg("Mise à jour du kit", "C'est ok pour la mise à jour du kit"));
  }
  /** Créer un nouveau kit */
  async setMachine(machine: MachineI) {
    const ref = collection(this.fire, "kec-machines");
    await setDoc(doc(ref, machine.id), machine).then(() => this.u.setMsg("Mise à jour de la machine", "C'est ok pour la mise à jour de la machine"));
  }
  async deleteKit(id: string) {
    await deleteDoc(doc(this.fire, "kec-kits", id)).then(() => this.u.setMsg("Suppression du kit", "C'est ok pour la suppresion du kit"));
  }
  async deleteMachine(id: string) {
    await deleteDoc(doc(this.fire, "kec-machines", id)).then(() => this.u.setMsg("Suppresion de la machine", "C'est ok pour la suppression de la machine"));
  }
}
