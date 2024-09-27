import { Injectable } from '@angular/core';
import { Produit } from './produit.model';

@Injectable({
  providedIn: 'root',
})
export class CommandeService {
  commandeList:any = [];

  getCommande(){
    this.setApiCommandes();
    return this.commandeList;
  }

  setApiCommandes(){
    const newCommandes: any = [];
    for (const commande of this.commandeList) {
      newCommandes.push({ id_reservation:commande.id_reservation, nom_salle: commande.nom_salle, capacite: commande.capacite, equipements: commande.equipements, localisation: commande.localisation, username: commande.username, duree: commande.duree });
    }
    this.commandeList = newCommandes;
  }
}
