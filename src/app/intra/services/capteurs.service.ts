import { inject, Injectable } from '@angular/core';
import { Firestore, collection, QuerySnapshot, query, doc, getDocs, getDoc, setDoc, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CapteursService {

  fire: Firestore = inject(Firestore);

  kits: Array<any> = [];
  capteurs: Array<any> = [];

  constructor() { }

  getKits() {

  }
  getCapteurs() {

  }
  getCapteursByKit() {

  }
  async getCapteurByTemps(debut: number = 0, fin: number=Date.now()) {
    // ref.where("timestamp", ">=", "2017-11").where("timestamp", "<", "2017-12")
    const q = query(collection(this.fire, "kec-capteurs"), where("timestamp", ">=", debut), where("timestamp", "<", fin));
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }
  /** Créer un nouveau kit */
  async setKit(kit: any) {
    const ref = collection(this.fire, "kec-kits");
    await setDoc(doc(ref, kit.id), kit);
  }
}
