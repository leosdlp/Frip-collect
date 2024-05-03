import { Injectable } from '@angular/core';
import { Fournisseur } from './fournisseur.model';

@Injectable({
  providedIn: 'root',
})
export class FournisseurService {
  selectedFournisseurId: number = -1;
  private fournisseurs: Fournisseur[] = [{
    id: 1,
    nom: 'Nike',
  },
  {
    id: 2,
    nom: 'Puma',
  },
  {
    id: 3,
    nom: 'Addidas',
  },
  {
    id: 4,
    nom: 'Zara',
  },
  {
    id: 5,
    nom: 'H&M',
  },
  {
    id: 6,
    nom: 'Pull & Bear',
  },
  {
    id: 7,
    nom: 'Jack & Jones',
  },
  {
    id: 8,
    nom: 'Bershka',
  },
  {
    id: 9,
    nom: 'Tommy Hilfiger',
  },
  {
    id: 10,
    nom: 'Celio',
  },
  {
    id: 11,
    nom: 'Levi\'s',
  },
  {
    id: 12,
    nom: 'Jules',
  },
  {
    id: 13,
    nom: 'Ralph Lauren',
  },
  {
    id: 14,
    nom: 'Kiabi',
  },
  {
    id: 15,
    nom: 'Lacoste',
  },
  {
    id: 16,
    nom: 'Primark',
  },
  {
    id: 17,
    nom: 'Hollister',
  },
  {
    id: 18,
    nom: 'Springfield',
  },
  {
    id: 19,
    nom: 'Shein',
  },
  {
    id: 20,
    nom: 'Champion',
  },
  {
    id: 21,
    nom: 'Calvin Klein',
  },
  {
    id: 22,
    nom: 'Carhartt',
  },
  {
    id: 23,
    nom: 'Sonstiges',
  },
  {
    id: 24,
    nom: 'Superdry',
  },
  {
    id: 25,
    nom: 'Devred',
  },
  {
    id: 26,
    nom: 'Mango',
  },
  {
    id: 27,
    nom: 'Fila',
  },
  {
    id: 28,
    nom: 'C&A',
  },
  {
    id: 29,
    nom: 'ASOS',
  },
  {
    id: 30,
    nom: 'Decathlon',
  },
  {
    id: 31,
    nom: 'Hugo Boss',
  },
  {
    id: 32,
    nom: 'GUESS',
  },
  {
    id: 33,
    nom: 'The North Face',
  },
  {
    id: 34,
    nom: 'Kaporal',
  },
  {
    id: 35,
    nom: 'Local',
  },
  {
    id: 36,
    nom: 'Abercrombie & Fitch',
  },
  {
    id: 37,
    nom: 'Massimo Dutti',
  },
  {
    id: 38,
    nom: 'Diesel',
  },
  {
    id: 39,
    nom: 'Ellesse',
  },
  {
    id: 40,
    nom: 'Lefties',
  },
  {
    id: 41,
    nom: 'Brice',
  },
  {
    id: 42,
    nom: 'Teddy Smith',
  },
  {
    id: 43,
    nom: 'G-Star',
  },
  {
    id: 44,
    nom: 'Bizzbee',
  },
  {
    id: 45,
    nom: 'Napapijri',
  },
  {
    id: 46,
    nom: 'Bonobo',
  },
  {
    id: 47,
    nom: 'Scotch & Soda',
  },
  {
    id: 48,
    nom: 'Kappa',
  },
  {
    id: 49,
    nom: 'Quicksilver',
  },
  {
    id: 50,
    nom: 'Vans',}];


  getFournisseurs(): Fournisseur[] {
    return this.fournisseurs;
  }

  getFournisseurById(id: number): Fournisseur | undefined {
    return this.fournisseurs.find(fournisseur => fournisseur.id === id);
  }

  createFournisseur(nouveauFournisseur: Fournisseur) {
    this.fournisseurs.push(nouveauFournisseur);
  }

  updateFournisseur(id: number, fournisseurModifie: Fournisseur) {
    const index = this.fournisseurs.findIndex(fournisseur => fournisseur.id === id);
    if (index !== 0) {
      this.fournisseurs[index] = fournisseurModifie;
    }
  }

  deleteFournisseur(id: number) {
    const index = this.fournisseurs.findIndex(fournisseur => fournisseur.id === id);
    if (index !== -1) {
      this.fournisseurs.splice(index, 1);
    }
  }

  setSelectedFournisseurId(id: number) {
    this.selectedFournisseurId = id;
  }

  getSelectedFournisseurId() {
    return this.selectedFournisseurId;
  }
}
