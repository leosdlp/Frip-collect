import { Component, OnInit } from '@angular/core';
import { Produit } from '../../../produit.model';
import { Classroom } from '../../../classroom.model';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../../../produit.service';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FournisseurService } from '../../../fournisseur.service';
import { Fournisseur } from '../../../fournisseur.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { PanierService } from '../../../panier.service';
import { AdminAuthService } from '../../../admin-auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-produit-commander-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule, HttpClientModule],
  templateUrl: './produit-commander-list.component.html',
  styleUrl: './produit-commander-list.component.css'
})
export class ProduitCommanderListComponent implements OnInit {
  produitId: number = 0;
  produits: Produit[] = [];
  fournisseurs : Fournisseur [] = [];
  classroom: Classroom | undefined;
  panierList: { [key: string]: Produit } = {};
  classrooms: Classroom[] = [];
  produitsTemp: any = [];
  dureeReservation!: "";
  readonly APIUrl = 'http://localhost:5038/api/fripandcollect/';

  constructor(private fb: FormBuilder, private produitService: ProduitService, private fournisseurService: FournisseurService, private router: Router, private panierService: PanierService, private authService: AdminAuthService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.refreshProduits().then(() => {
        this.tempo();
    });
  }

  refreshProduits(): Promise<void> {
    return new Promise((resolve) => {
      this.http.get(this.APIUrl + 'GetClassrooms').subscribe(data => {
        this.produitService.classroomsTemp = data;
        this.produitsTemp = data;
        resolve();
      });
      this.produitService.setApiProduits();
      this.produitService.getProduits();
    });
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  async tempo() {
    const url: string = window.location.href;
    const segments: string[] = url.split('/');
    const lastSegment: string = segments[segments.length - 1];
    const produitIdd: number = parseInt(lastSegment, 10);

    if (this.produitService.classroomsTemp && this.produitService.classroomsTemp.length > 0) {
        this.classroom = this.produitService.classroomsTemp[produitIdd-1];
    } else {
        console.error("Les classrooms ne sont pas encore chargées.");
    }
  }

  async claimClassroom(classroom: any){
    await this.updateProduit(classroom);
    await this.addClassrooms(classroom);
  }

  updateProduit(classroom: any) {
    const id_salle = classroom.id_salle;
    const nom_salle = classroom.nom_salle;
    const capacite = classroom.capacite;
    const equipements = classroom.equipements;
    const localisation = classroom.localisation;
    const duree = this.dureeReservation;
    const test = classroom.libre;
    const libre = "false";

    if (!nom_salle || !capacite || !equipements || !localisation || !duree) {
      alert("Current username is required");
      return;
    }

    // if (test) {
    //   alert("Impossible de réserver cette salle");
    //   return;
    // }

    const formData = new FormData();
    formData.append("id_salle", id_salle.toString());
    if (nom_salle) formData.append("nom_salle", nom_salle);
    if (capacite) formData.append("capacite", capacite);
    if (equipements) formData.append("equipements", equipements);
    if (localisation) formData.append("localisation", localisation);
    if (libre !== undefined) formData.append("libre", libre);

    this.http.post(this.APIUrl + 'UpdateClassrooms', formData).subscribe(
      data => {
        alert('Classroom updated successfully');
        this.router.navigate(['/produit-list']);
      },
      error => {
        console.error('Error updating user:', error);
      }
    );
    this.refreshProduits();
  }

  addClassrooms(classroom: any) {
    const nom_salle = classroom.nom_salle;
    const capacite = classroom.capacite;
    const equipements = classroom.equipements;
    const localisation = classroom.localisation;
    const libre = classroom.libre;
    const username = this.authService.getUsername();
    const duree = this.dureeReservation;

    if (!nom_salle || !capacite || !equipements || !localisation || !username || !duree) {
      alert("id_salle, nom_salle, capacite, equipementsand localisation are required");
      return;
    }

    // if (libre) {
    //   alert("Impossible de réserver cette salle");
    //   return;
    // }

    const formData = new FormData();
    formData.append("nom_salle", nom_salle);
    formData.append("capacite", capacite);
    formData.append("equipements", equipements);
    formData.append("localisation", localisation);
    formData.append("username", username);
    formData.append("duree", duree);

    this.http.post(this.APIUrl + 'AddReservations', formData).subscribe(data => {
      alert(data);
    }, error => {
      console.error('Error adding produit:', error);
      alert(`Error adding produit: ${error.message || error}`);
    });

    this.refreshProduits();
  }
}
