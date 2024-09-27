import { Injectable } from '@angular/core';
import { Fournisseur } from './fournisseur.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class FournisseurService {
  selectedFournisseurId: number = -1;
  private users: User[] = [];
  newFournisseur: any = [];
  usersTemp: any = [];


  getFournisseurs(): User[] {
    this.setApiFournisseurs();
    return this.users;
  }

  // getFournisseurById(id: number): Fournisseur | undefined {
  //   return this.fournisseurs.find(fournisseur => fournisseur.id === id);
  // }

  setApiFournisseurs() {
    const newFournisseurs = [];
    for (const user of this.usersTemp) {
      newFournisseurs.push({ username: user.username, password: user.password, email: user.email });
    }
    this.users = newFournisseurs;
  }

  // createFournisseur(nouveauFournisseur: Fournisseur) {
  //   this.fournisseurs.push(nouveauFournisseur);
  // }

  // updateFournisseur(id: number, fournisseurModifie: Fournisseur) {
  //   const index = this.fournisseurs.findIndex(fournisseur => fournisseur.id === id);
  //   if (index !== 0) {
  //     this.fournisseurs[index] = fournisseurModifie;
  //   }
  // }

  // deleteFournisseur(id: number) {
  //   const index = this.fournisseurs.findIndex(fournisseur => fournisseur.id === id);
  //   if (index !== -1) {
  //     this.fournisseurs.splice(index, 1);
  //   }
  // }

  setSelectedFournisseurId(id: number) {
    this.selectedFournisseurId = id;
  }

  getSelectedFournisseurId() {
    return this.selectedFournisseurId;
  }
}
