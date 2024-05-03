import { Injectable } from '@angular/core';
import { Produit } from './produit.model';

@Injectable({
  providedIn: 'root',
})
export class CommandeService {
  commandeList: { [key: string]: Produit } = {};

  getCommande(){
    return this.commandeList;
  }

  ajouterCommande(panierList: { [key: string]: Produit }): void {
    for (const key in panierList) {
      if (panierList.hasOwnProperty(key)) {
        const produit = panierList[key];
        this.commandeList[key] = produit;
      }
    }
  }

  supprimerCommande(produit: Produit): void {

  }
}
