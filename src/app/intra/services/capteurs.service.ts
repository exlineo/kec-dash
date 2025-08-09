import { inject, Injectable, signal } from '@angular/core';
import { Firestore, collection, QuerySnapshot, query, doc, getDocs, getDoc, setDoc, where, deleteDoc, addDoc } from '@angular/fire/firestore';
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
  async getCapteurByTemps(debut: number = 0, fin: number = Date.now(), kit?:KitI) {
    // ref.where("timestamp", ">=", "2017-11").where("timestamp", "<", "2017-12")
    let q:any;
    if(kit){
      q = query(collection(this.fire, "kec-capteurs"), where("k", "==", kit.id), where("timestamp", ">=", debut), where("timestamp", "<", fin));
    }else{
      q = query(collection(this.fire, "kec-capteurs"), where("timestamp", ">=", debut), where("timestamp", "<", fin));
    }
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
  getKit(id: string) {
    getDoc(doc(this.fire, "kec-kits", id)).then((doc) => {
      this.kit = doc.data() as KitI;
    });
  }
  addKit(kit: any) {
    console.log("Add kit", kit);
    delete(kit.machine);
    kit.params.urgence = Number(kit.params.urgence);
    kit.params.programme = Number(kit.params.programme);
    const ref = collection(this.fire, "kec-kits");
    addDoc(ref, {...kit}).then(() => {
      this.kits.push(kit);
      this.u.setMsg("Ajout d'un kit", "Cool, le kit a été ajouté");
    });
  }
  async setKit(kit: KitI) {
    if(kit.machine) delete(kit.machine);
    kit.params.urgence = Number(kit.params.urgence);
    kit.params.programme = Number(kit.params.programme);
    const ref = collection(this.fire, "kec-kits");
    await setDoc(doc(ref, kit.id), kit).then(() => this.u.setMsg("Mise à jour du kit", "C'est ok pour la mise à jour du kit"));
  }
  /** Créer une nouvelle machine */
  async addMachine(machine: MachineI) {
    const ref = collection(this.fire, "kec-machines");
    addDoc(ref, {...machine}).then(() => {
      this.machines.push(machine);
      this.u.setMsg("Ajout de la machine", "C'est ok pour l'ajout de la machine");
    });
  }
  setMachine(machine: any) {
    const ref = collection(this.fire, "kec-machines");
    setDoc(doc(ref, machine.id), {...machine}).then(() => this.u.setMsg("Mise à jour de la machine", "C'est ok pour la mise à jour de la machine"));
  }
  deleteKit(id: string) {
    deleteDoc(doc(this.fire, "kec-kits", id)).then(() => {
      const index = this.kits.findIndex((k: KitI) => k.id == id);
      this.kits.splice(index, 1);
      this.u.setMsg("Suppression du kit", "C'est ok pour la suppresion du kit")});
  }
  deleteMachine(id: string) {
    deleteDoc(doc(this.fire, "kec-machines", id)).then(() => {
      const index = this.machines.findIndex((m: MachineI) => m.id == id);
      this.machines.splice(index, 1);
      this.u.setMsg("Suppresion de la machine", "C'est ok pour la suppression de la machine");
    });
  }
}
