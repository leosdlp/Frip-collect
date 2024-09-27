import { Component, OnInit } from '@angular/core';
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
    selector: 'app-produit-list',
    standalone:true,
    templateUrl: './produit-list.component.html',
    styleUrls: ['./produit-list.component.css'],
    imports: [CommonModule, FormsModule, RouterOutlet, RouterModule, HttpClientModule],

})
export class ProduitListComponent implements OnInit {
  constructor(private produitService: ProduitService, private fournisseurService: FournisseurService, private router: Router, private http: HttpClient) {
  }
  classrooms: Classroom[] = [];
  fournisseurs: Fournisseur[] = [];
  rechercheProduit = '';
  filtreLocalisation!: number;
  filtreLibre!: string;
  filtreRecherche!: string;
  readonly APIUrl = 'http://localhost:5038/api/fripandcollect/';
  produitsTemp: any = [];



  ngOnInit(): void {
    this.refreshProduits();
    this.classrooms = this.produitService.getProduits();
    this.filtrerClassrooms()
  }

  refreshProduits() {
    this.http.get(this.APIUrl + 'GetClassrooms').subscribe(data => {
      this.produitService.classroomsTemp = data;
      this.produitsTemp = data;
    });
    this.produitService.setApiProduits();
    this.produitService.getProduits();
  }

  filtrerClassrooms() {
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


  modifierProduit(id: number) {
    this.produitService.setSelectedProduitId(id);
    this.router.navigate(['/produit-modifier', id]);
  }

  supprimerProduit(id: number) {
    this.produitService.deleteProduit(id);
    this.deleteProduits(id);
    this.refreshProduits();
  }

  deleteProduits(id:any){
    this.http.delete(this.APIUrl+'DeleteClassrooms?id='+id).subscribe(data=>{
      alert(data);
      this.refreshProduits();
    })
  }
}
