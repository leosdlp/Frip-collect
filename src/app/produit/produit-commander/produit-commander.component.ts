import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from '../../admin-auth.service';
import { Produit } from '../../produit.model';
import { Classroom } from '../../classroom.model';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../../produit.service';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FournisseurService } from '../../fournisseur.service';
import { Fournisseur } from '../../fournisseur.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-produit-commander',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule, HttpClientModule],
  templateUrl: './produit-commander.component.html',
  styleUrl: './produit-commander.component.css'
})
export class ProduitCommanderComponent implements OnInit{
  constructor(private produitService: ProduitService, private fournisseurService: FournisseurService, private router: Router, private http: HttpClient, private authService: AdminAuthService) {
  }
  classrooms: Classroom[] = [];
  fournisseurs: Fournisseur[] = [];
  rechercheProduit = '';
  filtreLocalisation!: number;
  filtreLibre!: string;
  filtreRecherche!: string;
  classroomsTemp: any = [];
  readonly APIUrl = 'http://localhost:5038/api/fripandcollect/';
  dureeReservation!: "";

  ngOnInit(): void {
    this.classrooms = this.produitService.getProduits();
    // this.fournisseurs = this.fournisseurService.getFournisseurs();
  }

  filtrerProduits() {
    // Récupérer les produits (classrooms)
    let classrooms = this.produitService.getProduits();

    // Filtrer par étage (localisation)
    if (this.filtreLocalisation && (String(this.filtreLocalisation) === "1" || String(this.filtreLocalisation) === "2" || String(this.filtreLocalisation) === "3")) {
      classrooms = classrooms.filter(classroom => classroom.localisation === this.filtreLocalisation);
    }

    // Filtrer par occupation (libre)
    if (this.filtreLibre !== "" && this.filtreLibre !== undefined) {
      classrooms = classrooms.filter(classroom => String(classroom.libre) === this.filtreLibre);
    }

    // Filtrer par recherche (nom_salle)
    if (this.filtreRecherche !== "" && this.filtreRecherche !== undefined) {
      classrooms = classrooms.filter(classroom =>
        classroom.nom_salle.toLowerCase().includes(this.filtreRecherche.toLowerCase())
      );
    }


    // Assigner les résultats filtrés à la variable classrooms de la classe
    this.classrooms = classrooms;
  }

  enSavoirPlus(id: number) {
    this.produitService.setSelectedProduitId(id);
    this.router.navigate(['/produit-commander-list', id]);
  }

  tempoTest(id: any) {
    const maDiv = document.querySelector('.prefix-' + id); // Élément à afficher/masquer
    const monBtn = document.querySelector('.suffix-' + id); // Bouton ou autre élément à inverser

    if (maDiv instanceof HTMLElement && monBtn instanceof HTMLElement) {
      // Inverser la classe pour maDiv
      if (maDiv instanceof HTMLElement) {
        // Affiche maDiv (le contenu) en enlevant 'hidden' et en ajoutant 'visible'
        maDiv.classList.remove('visible');
        maDiv.classList.add('hidden');
        maDiv.style.display = 'none';
      }

      if (monBtn instanceof HTMLElement) {
        // Cache monBtn en enlevant 'visible' et en ajoutant 'hidden'
        monBtn.classList.remove('hidden');
        monBtn.classList.add('visible');
        monBtn.style.display = 'block';
      }
    }
  }

  reverseTempoTest(id: any) {
    // Sélection des éléments avec le préfixe et suffixe
    const maDiv = document.querySelector('.prefix-' + id);
    const monBtn = document.querySelector('.suffix-' + id);

    // Vérifie si les éléments existent
    if (maDiv instanceof HTMLElement) {
      // Affiche maDiv (le contenu) en enlevant 'hidden' et en ajoutant 'visible'
      maDiv.classList.remove('hidden');
      maDiv.classList.add('visible');
      maDiv.style.display = 'block';
    }

    if (monBtn instanceof HTMLElement) {
      // Cache monBtn en enlevant 'visible' et en ajoutant 'hidden'
      monBtn.classList.remove('visible');
      monBtn.classList.add('hidden');
      monBtn.style.display = 'none';
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
    const username = this.authService.getUsername();
    const test = classroom.libre;
    const libre = "false";

    if (!nom_salle || !capacite || !equipements || !localisation || !duree) {
      alert("nom_salle capacite equipements localisation dureee are required");
      return;
    }

    if (!username) {
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
      alert("id_salle, nom_salle, capacite, equipements, localisation and duree are required");
      return;
    }

    if (!username) {
      alert("Current username is required");
      return;
    }

    if (duree == 0) {
      alert("La réservation ne peut pas duree 0");
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

  refreshProduits() {
    this.http.get(this.APIUrl + 'GetClassrooms').subscribe(data => {
      this.produitService.classroomsTemp = data;
      this.classroomsTemp = data;
    });
    this.produitService.setApiProduits();
    this.produitService.getProduits();
  }
}
