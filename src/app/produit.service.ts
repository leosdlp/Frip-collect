import { Injectable } from '@angular/core';
import { Produit } from './produit.model';
import { Classroom } from './classroom.model';

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  selectedProduitId: number = -1;
  newProduit: any = [];
  classroomsTemp: any = [];
  private classrooms: Classroom[] = [];

  getProduits(): Classroom[] {
    this.setApiProduits();
    return this.classrooms;
  }

  getProduitById(id: number): Classroom | undefined {
    return this.classrooms.find(classroom => classroom.id_salle === id);
  }


  createProduit(nouveauProduit: Classroom) {
    this.classrooms.push(nouveauProduit);
  }

  updateProduit(id: number, produitModifie: Classroom) {
    const index = this.classrooms.findIndex(classroom => classroom.id_salle === id);
    if (index !== -1) {
      this.classrooms[index] = produitModifie;
    }
  }

  deleteProduit(id: number) {
    const index = this.classrooms.findIndex(classrooms => classrooms.id_salle === id);
    if (index !== -1) {
      this.classrooms.splice(index, 1);
    }
  }

  setSelectedProduitId(id: number) {
    this.selectedProduitId = id;
  }

  getSelectedProduitId() {
    return this.selectedProduitId;
  }

  async setApiProduits() {
    const newClassrooms = [];
    for (const classroom of this.classroomsTemp) {
      newClassrooms.push({ id_salle: classroom.id_salle, nom_salle: classroom.nom_salle, capacite: classroom.capacite, equipements: classroom.equipements, localisation: classroom.localisation, libre: classroom.libre});
    }
    this.classrooms = newClassrooms;
  }
}
