import { Injectable } from '@angular/core';
import { Produit } from './produit.model'; // Importez le modèle

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  selectedProduitId: number = -1;
  private produits: Produit[] = [{
    id: 1,
    nom: 'Costume 2 pièces',
    type: 'costume',
    genre: 'homme',
    taille: 'xxs',
    prix: 19.99,
    etat: 'bon-etat',
    fournisseur:'Nike',
    nombre:5,
  }, {
    id: 2,
    nom: 'T-shirt rouge',
    type: 't-shirt',
    genre: 'homme',
    taille: 'xs',
    prix: 19.99,
    etat: 'bon-etat',
    fournisseur:'Nike',
    nombre:5,
  },{
    id: 3,
    nom: 'Jean blue',
    type: 'jean',
    genre: 'homme',
    taille: 's',
    prix: 19.99,
    etat: 'tres-bon-etat',
    fournisseur:'Puma',
    nombre:5,
  },{
    id: 4,
    nom: 'Pantalon beige',
    type: 'pantalon',
    genre: 'homme',
    taille: 'm',
    prix: 19.99,
    etat: 'tres-bon-etat',
    fournisseur:'Puma',
    nombre:5,
  },{
    id: 5,
    nom: 'Costume 3 pièces',
    type: 'costume',
    genre: 'femme',
    taille: 'xxs',
    prix: 19.99,
    etat: 'bon-etat',
    fournisseur:'Puma',
    nombre:5,
  },{
    id: 6,
    nom: 'T-shirt vert',
    type: 't-shirt',
    genre: 'femme',
    taille: 'xs',
    prix: 19.99,
    etat: 'bon-etat',
    fournisseur:'Puma',
    nombre:5,
  },{
    id: 7,
    nom: 'Jean noir',
    type: 'jean',
    genre: 'femme',
    taille: 's',
    prix: 19.99,
    etat: 'tres-bon-etat',
    fournisseur:'Nike',
    nombre:5,
  },{
    id: 8,
    nom: 'Pantalon blanc',
    type: 'pantalon',
    genre: 'femme',
    taille: 'm',
    prix: 19.99,
    etat: 'tres-bon-etat',
    fournisseur:'Nike',
    nombre:5,
  },];

  getProduits(): Produit[] {
    return this.produits;
  }

  getProduitById(id: number): Produit | undefined {
    return this.produits.find(produit => produit.id === id);
  }

  createProduit(nouveauProduit: Produit) {
    this.produits.push(nouveauProduit);
  }

  updateProduit(id: number, produitModifie: Produit) {
    const index = this.produits.findIndex(produit => produit.id === id);
    if (index !== -1) {
      this.produits[index] = produitModifie;
    }
  }

  deleteProduit(id: number) {
    const index = this.produits.findIndex(produits => produits.id === id);
    if (index !== -1) {
      this.produits.splice(index, 1);
    }
  }

  setSelectedProduitId(id: number) {
    this.selectedProduitId = id;
  }

  getSelectedProduitId() {
    return this.selectedProduitId;
  }
}
